const {
  GEMINI_MODELS,
  RSS_SNIPPET_MAX_CHARS,
} = require('./feeds');
const { extractJsonObject } = require('./utils');

function buildPrompt({ title, fonte, link, snippet, tagHint }) {
  return `Você é editor da Punk Code Solution (empresa de software no Brasil).
Gere um post do tipo RADAR para o blog da empresa.

REGRAS OBRIGATÓRIAS:
- NÃO republicar nem parafrasear longamente o artigo original.
- Use no máximo o fato público (título + trecho curto do RSS).
- Escreva comentário ORIGINAL da Punk Code sobre impacto para PME / sites / sistemas.
- Tom profissional, direto, em português do Brasil.
- Foque em conversão de visitantes para contato (sem ser agressivo).
- Responda SOMENTE com JSON válido (sem markdown).

Contexto da fonte:
- Fonte: ${fonte}
- Título original: ${title}
- Link: ${link}
- Tag sugerida: ${tagHint}
- Trecho do feed (pode estar incompleto): ${snippet.slice(0, RSS_SNIPPET_MAX_CHARS)}

Formato JSON:
{
  "title": "Radar: ... (título próprio, não cópia literal)",
  "excerpt": "1-2 frases",
  "radarComment": "2-4 frases com opinião Punk Code",
  "body": ["parágrafo 1", "parágrafo 2"],
  "takeaways": ["item 1", "item 2", "item 3"],
  "tags": ["Radar", "${tagHint}", "opcional"]
}`;
}

async function callGemini(model, prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 1200,
      },
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    const message = data?.error?.message || `Gemini HTTP ${response.status}`;
    const err = new Error(message);
    err.status = response.status;
    err.model = model;
    throw err;
  }

  const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('\n') || '';
  if (!text.trim()) {
    throw new Error(`Resposta vazia do modelo ${model}`);
  }
  return text;
}

async function generateRadarDraft(item) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY (ou GOOGLE_API_KEY) não configurada');
  }

  const prompt = buildPrompt(item);
  const models = (process.env.GEMINI_MODELOS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  const queue = models.length ? models : GEMINI_MODELS;

  let lastError;
  for (const model of queue) {
    try {
      const raw = await callGemini(model, prompt, apiKey);
      const json = extractJsonObject(raw);
      return { draft: json, model };
    } catch (error) {
      lastError = error;
      // quota / not found → tenta próximo
      if (error.status === 404 || error.status === 429) {
        continue;
      }
      if (/quota|rate|exhausted|not found/i.test(error.message || '')) {
        continue;
      }
      throw error;
    }
  }

  throw lastError || new Error('Falha ao gerar radar com Gemini');
}

module.exports = {
  generateRadarDraft,
};
