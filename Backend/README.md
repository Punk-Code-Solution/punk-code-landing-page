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

## Blog radar (RSS + Gemini)

O robô lê feeds oficiais (Angular, Node.js, web.dev, GitHub Engineering, Cloudflare), gera **comentário curto da Punk Code** com **Gemini** e **não republica** o texto da fonte.

Se um modelo esgotar cota (429), o radar tenta automaticamente o próximo da lista (`GEMINI_MODELOS` ou padrão flash/lite).

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
GET|POST /api/blog/radar/run
Header: x-blog-secret: <BLOG_CRON_SECRET>
# ou Authorization: Bearer <BLOG_CRON_SECRET> (Vercel Cron)
```

### Agendamento automático (3 posts/dia)

Horários em horário de Brasília (BRT):

| Período | Horário BRT | UTC |
|---------|-------------|-----|
| Manhã | 09:00 | 12:00 |
| Meio-dia | 12:00 | 15:00 |
| Final da tarde | 18:00 | 21:00 |

Cada execução gera **1 post novo** (até 3 por dia).

- **Vercel Cron**: 3 jobs diários em `Backend/vercel.json`
- **GitHub Actions**: workflow `.github/workflows/blog-radar.yml` (mesmos horários)

Configure `GEMINI_API_KEY` (e Turso) nos secrets da Vercel e do GitHub. Na Vercel, o cron usa `CRON_SECRET` (gerado automaticamente) ou `BLOG_CRON_SECRET`.

### Deploy na Vercel

No projeto `punk-code-api`, configure:

- `CLIENT_EMAIL`, `CLIENT_PASS`
- `GEMINI_API_KEY`, `BLOG_CRON_SECRET`
- Recomendado: `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`

Sem Turso, novos posts gerados na Vercel **não persistem** entre invocações — use o GitHub Actions (commit automático do JSON) ou configure Turso.

Health check:

```
GET https://punk-code-api.vercel.app/health
```

## Resend Inbound (receber e-mail do domínio)

Recebe `email.received` do Resend, busca o corpo na API e encaminha para `INBOUND_FORWARD_TO` (ou `CLIENT_EMAIL`) via Gmail SMTP já usado no contato.

### Variáveis (Vercel do projeto `punk-code-api`)

| Variável | Uso |
|----------|-----|
| `RESEND_API_KEY` | Buscar conteúdo do e-mail recebido |
| `RESEND_WEBHOOK_TOKEN` | Token na query `?token=` (recomendado) |
| `INBOUND_FORWARD_TO` | Destino do forward (ex.: seu Hotmail) |
| `CLIENT_EMAIL` / `CLIENT_PASS` | SMTP Gmail para enviar o forward |

### URL no painel Resend

Preferencial (API direta):

```text
https://punk-code-api.vercel.app/webhook/email?token=<RESEND_WEBHOOK_TOKEN>
```

Ou via rewrite do site (Frontend `vercel.json`):

```text
https://www.punkcodesolution.com.br/webhook/email?token=<RESEND_WEBHOOK_TOKEN>
```

Evento: **`email.received`**.

### Teste

1. Deploy do Backend + Frontend com o rewrite.
2. Envie um e-mail para `teste@inbound.punkcodesolution.com.br`.
3. Confira o forward em `INBOUND_FORWARD_TO`.

## Estrutura

- `src/config/mailer.js` — Nodemailer
- `src/controllers/mail.controller.js` — envio de e-mail
- `src/controllers/webhook.controller.js` — Resend Inbound
- `src/routes/mail.routes.js`
- `src/routes/webhook.routes.js`
- `src/blog/` — feeds, Gemini, store, radar
- `src/routes/blog.routes.js`
- `data/blog-posts.json` — seed + posts gerados
- `src/app.js` — Express
