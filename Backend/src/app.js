require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mailRoutes = require('./routes/mail.routes');
const blogRoutes = require('./routes/blog.routes');
const { assertMailConfigured } = require('./config/mailer');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  let mailConfigured = false;

  try {
    assertMailConfigured();
    mailConfigured = true;
  } catch {
    mailConfigured = false;
  }

  res.json({
    ok: true,
    mailConfigured,
    blog: {
      cursorConfigured: Boolean(process.env.CURSOR_API_KEY || process.env.GEMINI_API_KEY),
      cronSecretConfigured: Boolean(process.env.BLOG_CRON_SECRET || process.env.CRON_SECRET),
      tursoConfigured: Boolean(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN),
    },
  });
});

app.use('/', mailRoutes);
app.use('/api/blog', blogRoutes);

if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
