const { createTransporter } = require('../config/mailer');

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

exports.sendProposal = async (req, res) => {
  const { nome, email, mensagem, telefone, empresa, servico } = req.body;

  if (!nome || !email || !mensagem || !telefone || !servico) {
    return res.status(400).json({ ok: false, message: 'Campos obrigatórios ausentes.' });
  }

  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: process.env.CLIENT_EMAIL,
      to: process.env.CLIENT_EMAIL,
      replyTo: email,
      subject: `Nova proposta recebida de ${nome}`,
      text: [
        `Nome: ${nome}`,
        `E-mail: ${email}`,
        `Telefone: ${telefone}`,
        `Empresa: ${empresa || ''}`,
        `Serviço: ${servico}`,
        `Mensagem: ${mensagem}`,
      ].join('\n'),
      html: `<p><b>Nome:</b> ${escapeHtml(nome)}</p>
             <p><b>E-mail:</b> ${escapeHtml(email)}</p>
             <p><b>Telefone:</b> ${escapeHtml(telefone)}</p>
             <p><b>Empresa:</b> ${escapeHtml(empresa || '')}</p>
             <p><b>Serviço:</b> ${escapeHtml(servico)}</p>
             <p><b>Mensagem:</b> ${escapeHtml(mensagem)}</p>`,
    });

    res.status(200).json({ ok: true, message: 'E-mail enviado com sucesso!' });
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err);

    if (err.code === 'MAIL_NOT_CONFIGURED') {
      return res.status(503).json({ ok: false, message: 'Serviço de e-mail não configurado.' });
    }

    res.status(500).json({ ok: false, message: 'Erro ao enviar e-mail.' });
  }
}; 
