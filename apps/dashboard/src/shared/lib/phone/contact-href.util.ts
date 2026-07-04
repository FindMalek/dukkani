/**
 * Returns a URL for phone or WhatsApp, for use with `<Link href={...}>` or `window.location`.
 * `message` prefills the WhatsApp chat text (ignored for `tel:` links).
 */
export function getContactHref(
  phone: string,
  prefersWhatsApp: boolean,
  message?: string,
): string {
  const digits = phone.replace(/\D/g, "");
  if (prefersWhatsApp) {
    const base = `https://wa.me/${digits}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  }
  return `tel:${phone}`;
}
