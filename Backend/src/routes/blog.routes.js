const express = require('express');
const { getPosts, getPost, runRadarJob } = require('../controllers/blog.controller');

const router = express.Router();

router.get('/posts', getPosts);
router.get('/posts/:slug', getPost);
router.get('/radar/run', runRadarJob);
router.post('/radar/run', runRadarJob);

module.exports = router;
