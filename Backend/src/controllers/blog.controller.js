const { listPosts, getPostBySlug, hasTurso } = require('../blog/store');
const { runRadar } = require('../blog/radar');

function setBlogCacheHeaders(res) {
  res.set('Cache-Control', 'no-store, max-age=0');
}

async function getPosts(req, res) {
  try {
    setBlogCacheHeaders(res);
    const type = req.query.type;
    let posts = await listPosts();
    if (type === 'original' || type === 'radar') {
      posts = posts.filter(p => p.type === type);
    }
    res.json({
      posts,
      storage: hasTurso() ? 'turso' : 'json',
    });
  } catch (error) {
    console.error('[blog] getPosts', error);
    res.status(500).json({ error: 'Falha ao listar posts do blog' });
  }
}

async function getPost(req, res) {
  try {
    setBlogCacheHeaders(res);
    const post = await getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }
    res.json({
      post,
      storage: hasTurso() ? 'turso' : 'json',
    });
  } catch (error) {
    console.error('[blog] getPost', error);
    res.status(500).json({ error: 'Falha ao buscar post' });
  }
}

function isRadarAuthorized(req) {
  // Aceita BLOG_CRON_SECRET (manual) e CRON_SECRET (Vercel Cron).
  // Se só um estiver definido, usa esse; se os dois existirem e forem
  // diferentes, qualquer um válido libera o job.
  const secrets = [process.env.BLOG_CRON_SECRET, process.env.CRON_SECRET]
    .map(s => (s || '').trim())
    .filter(Boolean);

  if (!secrets.length) {
    return false;
  }

  const provided = req.header('x-blog-secret') || req.query.secret;
  if (provided && secrets.includes(provided)) {
    return true;
  }

  const auth = req.header('authorization') || '';
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
  if (bearer && secrets.includes(bearer)) {
    return true;
  }

  return false;
}

async function runRadarJob(req, res) {
  try {
    if (!isRadarAuthorized(req)) {
      return res.status(401).json({ error: 'Não autorizado' });
    }

    const maxNew = Number(req.query.max || req.body?.max || 1);
    const result = await runRadar({ maxNew: Number.isFinite(maxNew) ? maxNew : 1 });
    res.json({ ok: true, ...result });
  } catch (error) {
    console.error('[blog] runRadarJob', error);
    res.status(500).json({ error: error.message || 'Falha ao rodar radar' });
  }
}

module.exports = {
  getPosts,
  getPost,
  runRadarJob,
};
