const { createClient } = require('@libsql/client');
const { readJsonStore, writeJsonStore, sortPosts } = require('./jsonStore');

function hasTurso() {
  return Boolean(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN);
}

function getTursoClient() {
  let url = process.env.TURSO_DATABASE_URL || '';
  if (url.startsWith('wss://')) {
    url = url.replace('wss://', 'libsql://');
  }
  return createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
}

async function ensureTursoSchema(client) {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      type TEXT NOT NULL,
      published_at TEXT NOT NULL,
      updated_at TEXT,
      tags_json TEXT NOT NULL,
      reading_minutes INTEGER NOT NULL,
      body_json TEXT NOT NULL,
      takeaways_json TEXT,
      source_name TEXT,
      source_url TEXT,
      radar_comment TEXT,
      ai_assisted INTEGER DEFAULT 0,
      related_project_ids_json TEXT
    )
  `);
}

function rowToPost(row) {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    type: row.type,
    publishedAt: row.published_at,
    updatedAt: row.updated_at || undefined,
    tags: JSON.parse(row.tags_json || '[]'),
    readingMinutes: row.reading_minutes,
    body: JSON.parse(row.body_json || '[]'),
    takeaways: row.takeaways_json ? JSON.parse(row.takeaways_json) : undefined,
    source:
      row.source_name && row.source_url
        ? { name: row.source_name, url: row.source_url }
        : undefined,
    radarComment: row.radar_comment || undefined,
    aiAssisted: Boolean(row.ai_assisted),
    relatedProjectIds: row.related_project_ids_json
      ? JSON.parse(row.related_project_ids_json)
      : undefined,
  };
}

function postToParams(post) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    type: post.type,
    published_at: post.publishedAt,
    updated_at: post.updatedAt || null,
    tags_json: JSON.stringify(post.tags || []),
    reading_minutes: post.readingMinutes || 3,
    body_json: JSON.stringify(post.body || []),
    takeaways_json: post.takeaways ? JSON.stringify(post.takeaways) : null,
    source_name: post.source?.name || null,
    source_url: post.source?.url || null,
    radar_comment: post.radarComment || null,
    ai_assisted: post.aiAssisted ? 1 : 0,
    related_project_ids_json: post.relatedProjectIds
      ? JSON.stringify(post.relatedProjectIds)
      : null,
  };
}

async function listPosts() {
  if (hasTurso()) {
    const client = getTursoClient();
    try {
      await ensureTursoSchema(client);
      const result = await client.execute(
        'SELECT * FROM blog_posts ORDER BY published_at DESC'
      );
      const posts = result.rows.map(rowToPost);
      if (posts.length > 0) {
        return posts;
      }
      // Se Turso vazio, hidrata com JSON seed
      const seed = readJsonStore();
      for (const post of seed) {
        await upsertTurso(client, post);
      }
      return sortPosts(seed);
    } finally {
      client.close();
    }
  }

  return sortPosts(readJsonStore());
}

async function getPostBySlug(slug) {
  const posts = await listPosts();
  return posts.find(p => p.slug === slug) || null;
}

async function upsertTurso(client, post) {
  const p = postToParams(post);
  await client.execute({
    sql: `
      INSERT INTO blog_posts (
        slug, title, excerpt, type, published_at, updated_at,
        tags_json, reading_minutes, body_json, takeaways_json,
        source_name, source_url, radar_comment, ai_assisted, related_project_ids_json
      ) VALUES (
        :slug, :title, :excerpt, :type, :published_at, :updated_at,
        :tags_json, :reading_minutes, :body_json, :takeaways_json,
        :source_name, :source_url, :radar_comment, :ai_assisted, :related_project_ids_json
      )
      ON CONFLICT(slug) DO UPDATE SET
        title=excluded.title,
        excerpt=excluded.excerpt,
        type=excluded.type,
        published_at=excluded.published_at,
        updated_at=excluded.updated_at,
        tags_json=excluded.tags_json,
        reading_minutes=excluded.reading_minutes,
        body_json=excluded.body_json,
        takeaways_json=excluded.takeaways_json,
        source_name=excluded.source_name,
        source_url=excluded.source_url,
        radar_comment=excluded.radar_comment,
        ai_assisted=excluded.ai_assisted,
        related_project_ids_json=excluded.related_project_ids_json
    `,
    args: p,
  });
}

async function savePosts(posts) {
  if (hasTurso()) {
    const client = getTursoClient();
    try {
      await ensureTursoSchema(client);
      for (const post of posts) {
        await upsertTurso(client, post);
      }
    } finally {
      client.close();
    }
  }

  // Sempre espelha no JSON (útil em local / commit / fallback)
  writeJsonStore(sortPosts(posts));
  return sortPosts(posts);
}

async function addPosts(newPosts) {
  const current = await listPosts();
  const bySlug = new Map(current.map(p => [p.slug, p]));
  for (const post of newPosts) {
    bySlug.set(post.slug, post);
  }
  return savePosts([...bySlug.values()]);
}

function sourceUrlExists(posts, url) {
  return posts.some(p => p.source?.url === url);
}

module.exports = {
  hasTurso,
  listPosts,
  getPostBySlug,
  savePosts,
  addPosts,
  sourceUrlExists,
};
