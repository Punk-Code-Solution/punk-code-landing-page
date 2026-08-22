import {
  INTEREST_OPTIONS,
  PROOF_POINTS,
  SERVICE_OFFERS,
  SERVICE_PROCESS,
} from './services-offer';

describe('services-offer data', () => {
  it('keeps three proof points', () => {
    expect(PROOF_POINTS.length).toBe(3);
  });

  it('defines custom service offers and a 4-step process', () => {
    expect(SERVICE_OFFERS.map(o => o.id)).toEqual(['sob-medida', 'qa-pack', 'consultoria']);
    expect(SERVICE_PROCESS.map(s => s.step)).toEqual([1, 2, 3, 4]);
  });

  it('exposes interest options without Finanças News as a product', () => {
    const values = INTEREST_OPTIONS.map(o => o.value) as string[];
    expect(values).toContain('igreja-40');
    expect(values).toContain('gamers-league');
    expect(values).not.toContain('financas-news');
  });
});
