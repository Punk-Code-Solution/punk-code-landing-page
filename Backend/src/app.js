require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mailRoutes = require('./routes/mail.routes');
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

  res.json({ ok: true, mailConfigured });
});

app.use('/', mailRoutes);

if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app; 