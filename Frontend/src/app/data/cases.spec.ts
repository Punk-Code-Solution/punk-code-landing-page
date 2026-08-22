import { FINANCAS_NEWS_CASE } from './cases';

describe('FINANCAS_NEWS_CASE', () => {
  it('is marked as a case, not a SaaS product', () => {
    expect(FINANCAS_NEWS_CASE.id).toBe('financas-news');
    expect(FINANCAS_NEWS_CASE.badge.toLowerCase()).toContain('punk code');
  });

  it('lists outcomes and a WhatsApp CTA', () => {
    expect(FINANCAS_NEWS_CASE.outcomes.length).toBeGreaterThanOrEqual(3);
    expect(FINANCAS_NEWS_CASE.ctaHref).toContain('wa.me/5575988110732');
    expect(FINANCAS_NEWS_CASE.imageSrc).toContain('financas-news');
  });
});
