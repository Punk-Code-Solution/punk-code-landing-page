import { SAAS_PRODUCTS } from './products';

describe('SAAS_PRODUCTS', () => {
  it('lists the four ready-to-subscribe products', () => {
    expect(SAAS_PRODUCTS.map(p => p.id)).toEqual([
      'igreja-40',
      'studio-style',
      'app-pronto',
      'gamers-league',
    ]);
  });

  it('exposes features and WhatsApp CTAs for every product', () => {
    for (const product of SAAS_PRODUCTS) {
      expect(product.features.length).toBeGreaterThanOrEqual(5);
      expect(product.primaryCta.href).toContain('wa.me/5575988110732');
      expect(product.primaryCta.label.trim().length).toBeGreaterThan(0);
      expect(product.imageSrc).toContain('images/projects/');
      expect(product.anchor).toBeTruthy();
    }
  });

  it('does not include pricing plans on any product', () => {
    for (const product of SAAS_PRODUCTS) {
      expect((product as { plans?: unknown }).plans).toBeUndefined();
    }
  });
});
