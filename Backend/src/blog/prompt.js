const { RSS_SNIPPET_MAX_CHARS } = require('./feeds');

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

module.exports = {
  buildPrompt,
};
