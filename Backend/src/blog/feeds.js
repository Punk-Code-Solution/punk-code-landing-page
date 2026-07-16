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

const GEMINI_MODELS = [
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
  'gemini-2.5-flash',
];

module.exports = {
  RSS_FEEDS,
  GEMINI_MODELS,
  MAX_ITEMS_PER_FEED: 2,
  MAX_NEW_POSTS_PER_RUN: 3,
  RSS_SNIPPET_MAX_CHARS: 1200,
};
