const transporter = require('../config/mailer');

exports.sendProposal = async (req, res) => {
  const { nome, email, mensagem, telefone, empresa, servico } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.CLIENT_USER ,
      to: process.env.CLIENT_USER ,
      replyTo: email,
      subject: 'Nova proposta recebida de ' + `${nome}`,
      text: mensagem,
      html: `<p><b>Nome:</b> ${nome}</p>
             <p><b>E-mail:</b> ${email}</p>
             <p><b>Telefone:</b> ${telefone || ''}</p>
             <p><b>Empresa:</b> ${empresa || ''}</p>
             <p><b>Serviço:</b> ${servico || ''}</p>
             <p><b>Mensagem:</b> ${mensagem || ''}</p>`
    });
    res.status(200).json({ ok: true, message: 'E-mail enviado com sucesso!' });
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err);
    res.status(500).json({ ok: false, message: 'Erro ao enviar e-mail.' });
  }
}; 
