const RSS_FEEDS = [
  {
    url: 'https://blog.angular.dev/feed',
    fonte: 'Angular Blog',
    tagHint: 'Angular',
  },
  {
    url: 'https://nodejs.org/en/feed/blog.xml',
    fonte: 'Node.js Blog',
    tagHint: 'Node.js',
  },
  {
    url: 'https://web.dev/feed.xml',
    fonte: 'web.dev',
    tagHint: 'Performance',
  },
  {
    url: 'https://github.blog/engineering/feed/',
    fonte: 'GitHub Engineering',
    tagHint: 'Engenharia',
  },
  {
    url: 'https://blog.cloudflare.com/rss/',
    fonte: 'Cloudflare Blog',
    tagHint: 'Infra',
  },
];

const CURSOR_MODELS = [
  'composer-2.5',
  'gpt-5.6-sol-medium',
];

module.exports = {
  RSS_FEEDS,
  CURSOR_MODELS,
  MAX_ITEMS_PER_FEED: 2,
  MAX_NEW_POSTS_PER_RUN: 3,
  RSS_SNIPPET_MAX_CHARS: 1200,
};
