# Backend de envio de e-mail

## Como rodar

1. Instale as dependências:
   ```
   npm install
   ```
2. Crie um arquivo `.env` na raiz do backend com:
   ```
   EMAIL_USER=seu_email@gmail.com
   EMAIL_PASS=sua_senha_de_app
   ```
3. Inicie o servidor:
   ```
   npm start
   ```

## Estrutura
- `src/config/mailer.js`: configuração do Nodemailer
- `src/controllers/mail.controller.js`: lógica de envio de e-mail
- `src/routes/mail.routes.js`: rotas de e-mail
- `src/app.js`: configuração do Express
- `src/server.js`: inicialização do servidor 