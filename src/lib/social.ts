export interface SocialLink {
  label: string;
  href: string;
  /** true when the URL is a placeholder that still needs the real link */
  todo?: boolean;
}

// TODO: confirm/replace the placeholder hrefs before launch (see README "Before you launch").
export const SOCIALS: SocialLink[] = [
  { label: 'Behance', href: 'https://www.behance.net/BlackSheep_42' },
  { label: 'YouTube', href: 'https://www.youtube.com/@blacksheep_42', todo: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mathieu-maigrot', todo: true },
  { label: 'Instagram', href: 'https://www.instagram.com/blacksheep_42', todo: true },
];

export const CONTACT_EMAIL = 'mathieumaigrot@gmail.com';

export const WHATSAPP_NUMBER = '23058123094';

const DEFAULT_WHATSAPP_MESSAGE = "Hi Mathieu, I found you on BlackSheep and I'd like to talk about a project.";

/**
 * A wa.me link with a short prefilled message. Pass a service name (e.g.
 * "Branding & Identity") to tailor the opener; omit for the generic one.
 */
export function buildWhatsAppLink(serviceName?: string): string {
  const message = serviceName
    ? `Hi Mathieu, I found you on BlackSheep and I'd like to talk about ${serviceName}.`
    : DEFAULT_WHATSAPP_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * A mailto link with a prefilled subject (and, for a named service, a short
 * body opener) so each CTA can point at a specific conversation. Built by
 * hand rather than via URLSearchParams: that encodes spaces as "+", which
 * not every mail client decodes back to a space in a mailto query string.
 */
export function buildMailtoLink(serviceName?: string): string {
  const subject = serviceName ? `Project enquiry: ${serviceName}` : 'Project enquiry';
  const parts = [`subject=${encodeURIComponent(subject)}`];
  if (serviceName) {
    parts.push(
      `body=${encodeURIComponent(`Hi Mathieu, I found you on BlackSheep and I'd like to talk about ${serviceName}.`)}`
    );
  }
  return `mailto:${CONTACT_EMAIL}?${parts.join('&')}`;
}
