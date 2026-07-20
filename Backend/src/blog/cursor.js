const { CURSOR_MODELS } = require('./feeds');
const { buildPrompt } = require('./prompt');
const { extractJsonObject } = require('./utils');

const CURSOR_API_BASE = 'https://api.cursor.com/v1';
const DEFAULT_POLL_MS = 3000;
const DEFAULT_TIMEOUT_MS = 180000;
const TERMINAL_STATUSES = new Set(['FINISHED', 'ERROR', 'CANCELLED', 'EXPIRED']);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getApiKey() {
  const key = (process.env.CURSOR_API_KEY || process.env.GEMINI_API_KEY)?.trim();
  if (!key) {
    throw new Error('CURSOR_API_KEY não configurada');
  }
  return key;
}

function authHeader(apiKey) {
  return `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`;
}

async function cursorRequest(path, options = {}) {
  const apiKey = getApiKey();
  const response = await fetch(`${CURSOR_API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(apiKey),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.message || data?.error || `Cursor HTTP ${response.status}`;
    const err = new Error(message);
    err.status = response.status;
    throw err;
  }

  return data;
}

async function waitForRun(agentId, runId) {
  const timeoutMs = Number(process.env.CURSOR_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS;
  const pollMs = Number(process.env.CURSOR_POLL_MS) || DEFAULT_POLL_MS;
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const run = await cursorRequest(`/agents/${agentId}/runs/${runId}`);
    if (TERMINAL_STATUSES.has(run.status)) {
      return run;
    }
    await sleep(pollMs);
  }

  throw new Error(`Timeout (${timeoutMs}ms) aguardando resposta do Cursor`);
}

async function callCursor(prompt, modelId) {
  const { agent, run } = await cursorRequest('/agents', {
    method: 'POST',
    body: JSON.stringify({
      prompt: { text: prompt },
      model: { id: modelId },
      name: 'Blog Radar Punk Code',
    }),
  });

  if (!agent?.id || !run?.id) {
    throw new Error('Resposta inválida ao criar agente Cursor');
  }

  const finished = await waitForRun(agent.id, run.id);
  if (finished.status !== 'FINISHED') {
    throw new Error(`Cursor run ${finished.status}: ${finished.result || 'sem detalhes'}`);
  }

  const text = finished.result || '';
  if (!text.trim()) {
    throw new Error(`Resposta vazia do Cursor (${modelId})`);
  }

  return text;
}

async function generateRadarDraft(item) {
  const prompt = buildPrompt(item);
  const models = (process.env.CURSOR_MODELOS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  const queue = models.length ? models : CURSOR_MODELS;

  let lastError;
  for (const model of queue) {
    try {
      const raw = await callCursor(prompt, model);
      const json = extractJsonObject(raw);
      return { draft: json, model };
    } catch (error) {
      lastError = error;
      if (error.status === 404 || error.status === 429) {
        continue;
      }
      if (/quota|rate|exhausted|not found|timeout|unauthorized|invalid api key/i.test(error.message || '')) {
        continue;
      }
      throw error;
    }
  }

  throw lastError || new Error('Falha ao gerar radar com Cursor');
}

module.exports = {
  generateRadarDraft,
};
