const Parser = require('rss-parser');
const { RSS_FEEDS, MAX_ITEMS_PER_FEED, MAX_NEW_POSTS_PER_RUN } = require('./feeds');
const { stripHtml, slugify, uniqueSlug, nowIso } = require('./utils');
const { generateRadarDraft } = require('./gemini');
const { listPosts, addPosts, sourceUrlExists } = require('./store');

const parser = new Parser({
  timeout: 15000,
  headers: {
    'User-Agent': 'PunkCodeBlogBot/1.0 (+https://www.punkcodesolution.com.br)',
    Accept: 'application/rss+xml, application/xml, text/xml, */*',
  },
});

async function fetchFeedItems(feed) {
  const parsed = await parser.parseURL(feed.url);
  const items = (parsed.items || []).slice(0, MAX_ITEMS_PER_FEED);

  return items
    .map(entry => {
      const link = entry.link || entry.guid;
      if (!link) {
        return null;
      }
      const snippet = stripHtml(entry.contentSnippet || entry.content || entry.summary || '');
      return {
        title: stripHtml(entry.title || 'Sem título'),
        link,
        snippet,
        fonte: feed.fonte,
        tagHint: feed.tagHint,
      };
    })
    .filter(Boolean);
}

function normalizeDraft(draft, item, existingSlugs) {
  const title = String(draft.title || `Radar: ${item.title}`).trim();
  const baseSlug = slugify(title.startsWith('Radar') ? title : `radar-${title}`);
  const slug = uniqueSlug(baseSlug, existingSlugs);
  existingSlugs.add(slug);

  const body = Array.isArray(draft.body)
    ? draft.body.map(p => String(p).trim()).filter(Boolean).slice(0, 4)
    : [];

  while (body.length < 2) {
    body.push(
      'Este post é uma curadoria da Punk Code: não republicamos o texto original. Comentamos o impacto para negócios digitais e linkamos a fonte oficial.'
    );
  }

  const takeaways = Array.isArray(draft.takeaways)
    ? draft.takeaways.map(t => String(t).trim()).filter(Boolean).slice(0, 4)
    : ['Leia a fonte oficial', 'Avalie o impacto no seu produto', 'Fale com a Punk Code se quiser aplicar isso'];

  const tags = Array.isArray(draft.tags)
    ? draft.tags.map(t => String(t).trim()).filter(Boolean)
    : [];
  if (!tags.includes('Radar')) {
    tags.unshift('Radar');
  }
  if (item.tagHint && !tags.includes(item.tagHint)) {
    tags.push(item.tagHint);
  }

  return {
    slug,
    title,
    excerpt: String(draft.excerpt || item.title).trim().slice(0, 220),
    type: 'radar',
    publishedAt: nowIso(),
    updatedAt: nowIso(),
    tags: tags.slice(0, 5),
    readingMinutes: 3,
    body,
    takeaways,
    source: {
      name: item.fonte,
      url: item.link,
    },
    radarComment: String(draft.radarComment || '').trim(),
    aiAssisted: true,
  };
}

async function runRadar({ maxNew = MAX_NEW_POSTS_PER_RUN } = {}) {
  const existing = await listPosts();
  const existingSlugs = new Set(existing.map(p => p.slug));
  const created = [];
  const skipped = [];
  const errors = [];

  for (const feed of RSS_FEEDS) {
    if (created.length >= maxNew) {
      break;
    }

    let items = [];
    try {
      items = await fetchFeedItems(feed);
    } catch (error) {
      errors.push({ feed: feed.fonte, error: error.message });
      continue;
    }

    for (const item of items) {
      if (created.length >= maxNew) {
        break;
      }

      if (sourceUrlExists(existing, item.link) || created.some(p => p.source?.url === item.link)) {
        skipped.push({ reason: 'duplicate', link: item.link, fonte: item.fonte });
        continue;
      }

      try {
        const { draft, model } = await generateRadarDraft(item);
        const post = normalizeDraft(draft, item, existingSlugs);
        if (!post.radarComment) {
          skipped.push({ reason: 'empty-comment', link: item.link });
          continue;
        }
        post._model = model;
        created.push(post);
      } catch (error) {
        errors.push({ link: item.link, fonte: item.fonte, error: error.message });
        if (/API key not valid|API_KEY_INVALID|invalid api key|GEMINI_API_KEY|permission denied/i.test(error.message || '')) {
          break;
        }
      }
    }

    if (errors.some(e => /API key not valid|API_KEY_INVALID|invalid api key|GEMINI_API_KEY|permission denied/i.test(e.error || ''))) {
      break;
    }
  }

  const toSave = created.map(({ _model, ...post }) => post);
  if (toSave.length) {
    await addPosts(toSave);
  }

  return {
    created: toSave,
    createdCount: toSave.length,
    skippedCount: skipped.length,
    skipped,
    errors,
    storage: process.env.TURSO_DATABASE_URL
      ? process.env.VERCEL
        ? 'turso'
        : 'turso+json'
      : 'json',
  };
}

module.exports = {
  runRadar,
};
