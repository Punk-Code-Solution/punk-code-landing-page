# Backend de envio de e-mail

## Como rodar

1. Instale as dependências:
   ```
   npm install
   ```
2. Copie `.env.example` para `.env` e preencha:
   ```
   CLIENT_EMAIL=punkcodesolution@gmail.com
   CLIENT_PASS=senha_de_app_do_gmail
   ```
   Use uma **senha de app** do Gmail (Conta Google → Segurança → Verificação em duas etapas → Senhas de app).
3. Inicie o servidor:
   ```
   npm start
   ```

## Deploy na Vercel

No painel do projeto `punk-code-api`, configure as variáveis de ambiente:

- `CLIENT_EMAIL`
- `CLIENT_PASS`

Depois do deploy, verifique:

```
GET https://punk-code-api.vercel.app/health
```

A resposta deve incluir `"mailConfigured": true`. Se for `false`, o formulário de contato retornará erro 503/500.

## Estrutura
- `src/config/mailer.js`: configuração do Nodemailer
- `src/controllers/mail.controller.js`: lógica de envio de e-mail
- `src/routes/mail.routes.js`: rotas de e-mail
- `src/app.js`: configuração do Express
- `src/server.js`: inicialização do servidor 