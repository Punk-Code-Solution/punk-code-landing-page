# Backend de e-mail + blog radar

## Como rodar

1. Instale as dependências:
   ```
   npm install
   ```
2. Copie `.env.example` para `.env` e preencha:
   ```
   CLIENT_EMAIL=...
   CLIENT_PASS=...          # senha de app do Gmail
   GEMINI_API_KEY=...       # Google AI Studio
   BLOG_CRON_SECRET=...     # segredo para disparar o radar
   ```
   Opcional em produção (Vercel): `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN` para persistir posts sem redeploy.
3. Inicie o servidor:
   ```
   npm start
   ```

## Blog radar (RSS + IA)

O robô lê feeds oficiais (Angular, Node.js, web.dev, GitHub Engineering, Cloudflare), gera **comentário curto da Punk Code** com Gemini e **não republica** o texto da fonte.

### Rodar localmente

```bash
npm run blog:radar
# ou limitar quantidade:
node src/scripts/run-radar.js --max=2
```

Os posts ficam em `data/blog-posts.json` (e no Turso, se configurado).

### Via API

```bash
# listar
GET /api/blog/posts
GET /api/blog/posts/:slug

# gerar novos radars (protegido)
POST /api/blog/radar/run
Header: x-blog-secret: <BLOG_CRON_SECRET>
```

### Deploy na Vercel

No projeto `punk-code-api`, configure:

- `CLIENT_EMAIL`, `CLIENT_PASS`
- `GEMINI_API_KEY`, `BLOG_CRON_SECRET`
- Recomendado: `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`

Sem Turso, novos posts gerados na Vercel **não persistem** entre invocações — use `npm run blog:radar` local, commit do JSON e redeploy, ou configure Turso.

Health check:

```
GET https://punk-code-api.vercel.app/health
```

## Estrutura

- `src/config/mailer.js` — Nodemailer
- `src/controllers/mail.controller.js` — envio de e-mail
- `src/routes/mail.routes.js`
- `src/blog/` — feeds, Gemini, store, radar
- `src/routes/blog.routes.js`
- `data/blog-posts.json` — seed + posts gerados
- `src/app.js` — Express
