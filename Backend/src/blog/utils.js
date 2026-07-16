function stripHtml(html = '') {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(text) {
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function uniqueSlug(base, existingSlugs) {
  let slug = base || `radar-${Date.now()}`;
  if (!existingSlugs.has(slug)) {
    return slug;
  }
  let i = 2;
  while (existingSlugs.has(`${slug}-${i}`)) {
    i += 1;
  }
  return `${slug}-${i}`;
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function extractJsonObject(text) {
  const trimmed = String(text || '').trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Resposta da IA sem JSON válido');
  }
  return JSON.parse(candidate.slice(start, end + 1));
}

module.exports = {
  stripHtml,
  slugify,
  uniqueSlug,
  todayIso,
  extractJsonObject,
};
