const fs = require('fs');
const path = require('path');

const { sortByNewest } = require('./utils');

const DATA_PATH = path.join(__dirname, '../../data/blog-posts.json');

function readJsonStore() {
  if (!fs.existsSync(DATA_PATH)) {
    return [];
  }
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

function writeJsonStore(posts) {
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2), 'utf8');
}

function sortPosts(posts) {
  return [...posts].sort(sortByNewest);
}

module.exports = {
  DATA_PATH,
  readJsonStore,
  writeJsonStore,
  sortPosts,
};
