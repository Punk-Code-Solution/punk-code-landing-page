const { listPosts, getPostBySlug } = require('../blog/store');
const { runRadar } = require('../blog/radar');

async function getPosts(req, res) {
  try {
    const type = req.query.type;
    let posts = await listPosts();
    if (type === 'original' || type === 'radar') {
      posts = posts.filter(p => p.type === type);
    }
    res.json({ posts });
  } catch (error) {
    console.error('[blog] getPosts', error);
    res.status(500).json({ error: 'Falha ao listar posts do blog' });
  }
}

async function getPost(req, res) {
  try {
    const post = await getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }
    res.json({ post });
  } catch (error) {
    console.error('[blog] getPost', error);
    res.status(500).json({ error: 'Falha ao buscar post' });
  }
}

async function runRadarJob(req, res) {
  try {
    const secret = process.env.BLOG_CRON_SECRET;
    const provided = req.header('x-blog-secret') || req.query.secret;
    if (!secret || provided !== secret) {
      return res.status(401).json({ error: 'Não autorizado' });
    }

    const maxNew = Number(req.query.max || req.body?.max || 3);
    const result = await runRadar({ maxNew: Number.isFinite(maxNew) ? maxNew : 3 });
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
