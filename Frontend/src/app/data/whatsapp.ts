/** Número comercial (somente dígitos, com DDI). */
export const WHATSAPP_PHONE = '5575988110732';

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
