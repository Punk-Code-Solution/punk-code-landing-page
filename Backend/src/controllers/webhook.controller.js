const { createTransporter } = require('../config/mailer');

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function assertWebhookAuthorized(req) {
  const expected = (process.env.RESEND_WEBHOOK_TOKEN || '').trim();
  if (!expected) {
    return; // opcional: sem token, aceita (útil no primeiro deploy)
  }
  const provided =
    (typeof req.query.token === 'string' && req.query.token) ||
    (req.get('x-webhook-token') || '');
  if (provided !== expected) {
    const error = new Error('WEBHOOK_UNAUTHORIZED');
    error.code = 'WEBHOOK_UNAUTHORIZED';
    throw error;
  }
}

async function fetchReceivedEmail(emailId) {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  if (!apiKey) {
    const error = new Error('RESEND_API_KEY não configurada.');
    error.code = 'RESEND_NOT_CONFIGURED';
    throw error;
  }

  const response = await fetch(
    `https://api.resend.com/emails/receiving/${encodeURIComponent(emailId)}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    const error = new Error(
      `Resend receiving HTTP ${response.status}: ${body.slice(0, 300)}`,
    );
    error.code = 'RESEND_FETCH_FAILED';
    throw error;
  }

  return response.json();
}

/**
 * Webhook Resend Inbound (email.received).
 * Busca o corpo via API e encaminha para INBOUND_FORWARD_TO (ou CLIENT_EMAIL).
 */
exports.handleResendInbound = async (req, res) => {
  try {
    assertWebhookAuthorized(req);

    const event = req.body || {};
    if (event.type && event.type !== 'email.received') {
      return res.status(200).json({ ok: true, ignored: true, type: event.type });
    }

    const data = event.data || {};
    const emailId = data.email_id;
    if (!emailId) {
      return res.status(400).json({ ok: false, message: 'email_id ausente no payload.' });
    }

    const received = await fetchReceivedEmail(emailId);
    const from = received.from || data.from || '(desconhecido)';
    const to = Array.isArray(received.to)
      ? received.to.join(', ')
      : Array.isArray(data.to)
        ? data.to.join(', ')
        : String(received.to || data.to || '');
    const subject = received.subject || data.subject || '(sem assunto)';
    const text = received.text || '';
    const html = received.html || '';

    const forwardTo =
      (process.env.INBOUND_FORWARD_TO || '').trim() ||
      (process.env.CLIENT_EMAIL || '').trim();

    if (!forwardTo) {
      console.log('[inbound] e-mail recebido (sem forward configurado)', {
        emailId,
        from,
        to,
        subject,
      });
      return res.status(200).json({
        ok: true,
        forwarded: false,
        message: 'Recebido; defina INBOUND_FORWARD_TO ou CLIENT_EMAIL para encaminhar.',
      });
    }

    const transporter = createTransporter();
    const forwardSubject = `[Inbound] ${subject}`;
    const forwardText = [
      'E-mail recebido via Resend Inbound',
      `De: ${from}`,
      `Para: ${to}`,
      `Assunto: ${subject}`,
      `ID: ${emailId}`,
      '',
      text || '(sem texto plano)',
    ].join('\n');

    const forwardHtml =
      html ||
      `<p><b>De:</b> ${escapeHtml(from)}</p>
       <p><b>Para:</b> ${escapeHtml(to)}</p>
       <p><b>Assunto:</b> ${escapeHtml(subject)}</p>
       <pre>${escapeHtml(text || '(sem texto plano)')}</pre>`;

    await transporter.sendMail({
      from: process.env.CLIENT_EMAIL,
      to: forwardTo,
      replyTo: typeof from === 'string' ? from : undefined,
      subject: forwardSubject,
      text: forwardText,
      html: forwardHtml,
    });

    console.log('[inbound] encaminhado', { emailId, to: forwardTo, subject });
    return res.status(200).json({ ok: true, forwarded: true });
  } catch (err) {
    console.error('[inbound] erro', err.message || err);

    if (err.code === 'WEBHOOK_UNAUTHORIZED') {
      return res.status(401).json({ ok: false, message: 'Não autorizado.' });
    }
    if (err.code === 'MAIL_NOT_CONFIGURED') {
      return res.status(503).json({ ok: false, message: 'SMTP não configurado.' });
    }
    if (err.code === 'RESEND_NOT_CONFIGURED') {
      return res.status(503).json({ ok: false, message: 'RESEND_API_KEY não configurada.' });
    }

    return res.status(500).json({ ok: false, message: 'Erro ao processar inbound.' });
  }
};
