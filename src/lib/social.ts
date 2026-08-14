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

export const CONTACT_EMAIL = 'hello@blacksheep.design';
