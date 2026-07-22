require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mailRoutes = require('./routes/mail.routes');
const blogRoutes = require('./routes/blog.routes');
const webhookRoutes = require('./routes/webhook.routes');
const { assertMailConfigured } = require('./config/mailer');

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

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
    inbound: {
      resendConfigured: Boolean(process.env.RESEND_API_KEY),
      webhookTokenConfigured: Boolean(process.env.RESEND_WEBHOOK_TOKEN),
      forwardConfigured: Boolean(
        process.env.INBOUND_FORWARD_TO || process.env.CLIENT_EMAIL,
      ),
    },
    blog: {
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
      cronSecretConfigured: Boolean(process.env.BLOG_CRON_SECRET || process.env.CRON_SECRET),
      tursoConfigured: Boolean(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN),
    },
  });
});

app.use('/', mailRoutes);
app.use('/', webhookRoutes);
app.use('/api/blog', blogRoutes);

if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
