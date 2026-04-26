/**
 * Returns a URL for phone or WhatsApp, for use with `<Link href={...}>` or `window.location`.
 */
export function getContactHref(
  phone: string,
  prefersWhatsApp: boolean,
): string {
  const digits = phone.replace(/\D/g, "");
  return prefersWhatsApp ? `https://wa.me/${digits}` : `tel:${phone}`;
}
