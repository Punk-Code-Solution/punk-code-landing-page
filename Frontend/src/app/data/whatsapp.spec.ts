import { WHATSAPP_PHONE, whatsappUrl } from './whatsapp';

describe('whatsapp helpers', () => {
  it('uses the commercial phone with DDI', () => {
    expect(WHATSAPP_PHONE).toBe('5575988110732');
  });

  it('builds a wa.me URL with encoded message', () => {
    const href = whatsappUrl('Olá! Quero demonstração');
    expect(href.startsWith(`https://wa.me/${WHATSAPP_PHONE}?text=`)).toBeTrue();
    expect(href).toContain(encodeURIComponent('Olá! Quero demonstração'));
  });

  it('encodes special characters in the message', () => {
    const href = whatsappUrl('A & B = C?');
    expect(href).toContain(encodeURIComponent('A & B = C?'));
  });
});
