const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhook.controller');

// Resend Inbound — use na URL do painel Resend:
// https://punk-code-api.vercel.app/webhook/email?token=<RESEND_WEBHOOK_TOKEN>
// ou (após rewrite no Frontend):
// https://www.punkcodesolution.com.br/webhook/email?token=<RESEND_WEBHOOK_TOKEN>
router.post('/webhook/email', webhookController.handleResendInbound);

module.exports = router;
