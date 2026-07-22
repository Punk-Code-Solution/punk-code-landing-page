const { GEMINI_MODELS } = require('./feeds');
const { buildPrompt } = require('./prompt');
const { extractJsonObject } = require('./utils');

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

function getApiKey() {
  const key = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '').trim();
  if (!key) {
    throw new Error('GEMINI_API_KEY (ou GOOGLE_API_KEY) não configurada');
  }
  return key;
}

function isQuotaOrRateError(error) {
  const message = String(error.message || '');
  const status = error.status;
  return (
    status === 429 ||
    status === 503 ||
    /quota|rate|exhausted|resource.?exhausted|too many requests|unavailable/i.test(message)
  );
}

function isModelUnavailableError(error) {
  const message = String(error.message || '');
  const status = error.status;
  return (
    status === 404 ||
    /not found|is not found|not supported|not available for/i.test(message)
  );
}

async function listAvailableModels(apiKey) {
  try {
    const response = await fetch(`${GEMINI_API_BASE}/models?key=${apiKey}`);
    const data = await response.json();
    if (!response.ok) {
      return [];
    }

    return (data.models || [])
      .filter(model => Array.isArray(model.supportedGenerationMethods)
        && model.supportedGenerationMethods.includes('generateContent'))
      .map(model => String(model.name || '').replace(/^models\//, ''))
      .filter(Boolean);
  } catch {
    return [];
  }
}

function buildModelQueue(availableModels) {
  const fromEnv = (process.env.GEMINI_MODELOS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const preferred = fromEnv.length ? fromEnv : GEMINI_MODELS;
  const preferredSet = new Set(preferred);

  // Preferidos primeiro; depois outros flash/lite disponíveis na conta
  const extras = availableModels
    .filter(name => !preferredSet.has(name))
    .filter(name => /flash|lite/i.test(name) && !/embed|tts|image|vision/i.test(name))
    .sort((a, b) => a.localeCompare(b));

  return [...preferred, ...extras];
}

async function callGemini(model, prompt, apiKey) {
  const url = `${GEMINI_API_BASE}/models/${model}:generateContent?key=${apiKey}`;
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

  const data = await response.json().catch(() => ({}));
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
  const apiKey = getApiKey();
  const prompt = buildPrompt(item);
  const available = await listAvailableModels(apiKey);
  const queue = buildModelQueue(available);

  if (!queue.length) {
    throw new Error('Nenhum modelo Gemini disponível para generateContent');
  }

  const attempts = [];
  let lastError;

  for (const model of queue) {
    try {
      const raw = await callGemini(model, prompt, apiKey);
      const json = extractJsonObject(raw);
      return {
        draft: json,
        model,
        attempts,
        availableModels: available.slice(0, 20),
      };
    } catch (error) {
      lastError = error;
      attempts.push({
        model,
        status: error.status || null,
        error: error.message,
        skipped: isQuotaOrRateError(error) || isModelUnavailableError(error),
      });

      // Sem cota / modelo indisponível → tenta o próximo
      if (isQuotaOrRateError(error) || isModelUnavailableError(error)) {
        continue;
      }

      // Chave inválida: não adianta tentar outros modelos
      if (/API key not valid|API_KEY_INVALID|invalid api key|permission denied/i.test(error.message || '')) {
        throw error;
      }

      // Outros erros: ainda tenta próximo modelo
      continue;
    }
  }

  const summary = attempts
    .map(a => `${a.model}: ${a.error}`)
    .join(' | ');

  throw lastError || new Error(`Falha ao gerar radar com Gemini (${summary})`);
}

module.exports = {
  generateRadarDraft,
  listAvailableModels,
};
