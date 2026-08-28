export const CONTACT_PHONE = "+917643081977"; 
export const WHATSAPP_NUMBER = "917643081977";

export function generateWhatsAppLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function openWhatsApp(text: string) {
  window.open(generateWhatsAppLink(text), '_blank');
}
