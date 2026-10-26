import { withBase } from './paths';

export type ServiceTier = 'studio' | 'beyond';

export interface Service {
  id: string;
  tier: ServiceTier;
  index: string;
  label: string;
  /** One-line pitch. */
  pitch: string;
  /** Short "what's included" bullets. */
  included: string[];
  accent: string;
  /** Real case study backing this service, or null when none exists yet. */
  proof: { label: string; href: string } | null;
  ctaLabel: string;
}

export const SERVICES: Service[] = [
  // Studio
  {
    id: 'branding',
    tier: 'studio',
    index: '01',
    label: 'Branding & Identity',
    pitch: 'Make it a brand, not just a logo.',
    included: ['Logo & visual identity', 'Brand systems & guidelines', 'Art direction'],
    accent: 'var(--color-brand-coral)',
    proof: { label: 'Leritaz Maronaz', href: withBase('/work/leritaz-maronaz/') },
    ctaLabel: 'Get a quote',
  },
  {
    id: 'motion',
    tier: 'studio',
    index: '02',
    label: 'Motion',
    pitch: 'Make it move.',
    included: ['Logo animation', 'Motion graphics', 'Animated identities & video'],
    accent: 'var(--color-brand-violet)',
    proof: { label: 'Logo Animations', href: withBase('/work/logo-animations/') },
    ctaLabel: 'Get a quote',
  },
  {
    id: 'digital',
    tier: 'studio',
    index: '03',
    label: 'Digital',
    pitch: 'Make it digital.',
    included: ['Websites & digital brochures', 'Interactive experiences', 'Screen-first design'],
    accent: 'var(--color-brand-teal)',
    proof: { label: 'Airbnb Digital Brochure', href: withBase('/work/airbnb-digital-brochure/') },
    ctaLabel: 'Get a quote',
  },
  {
    id: 'illustration',
    tier: 'studio',
    index: '04',
    label: 'Illustration & Visuals',
    pitch: 'Make it seen.',
    included: ['Illustration & character design', 'Posters & key art', 'Experimental visuals'],
    accent: 'var(--color-brand-gold)',
    proof: { label: 'Tribe War', href: withBase('/work/tribal-war-card-game/') },
    ctaLabel: 'Get a quote',
  },
  {
    id: 'editorial',
    tier: 'studio',
    index: '05',
    label: 'Editorial & Print',
    pitch: 'Make it read.',
    included: ['Brochures & publications', 'Editorial layouts', 'Print campaigns'],
    accent: 'var(--color-brand-blue)',
    proof: { label: 'Mauritius Brochure', href: withBase('/work/mauritius-brochure/') },
    ctaLabel: 'Get a quote',
  },
  {
    id: 'design-support',
    tier: 'studio',
    index: '06',
    label: 'Design Support & Media Management',
    pitch: "The designer your team doesn't have yet.",
    included: ['Ongoing design requests', 'Social & marketing visuals', 'A steady hand, not a one-off'],
    accent: 'var(--color-brand-orange)',
    proof: null,
    ctaLabel: 'Get a quote',
  },

  // Beyond the brief
  {
    id: 'mapmaking',
    tier: 'beyond',
    index: '07',
    label: 'Mapmaking',
    pitch: 'Maps built to actually be used.',
    included: ['Hand-drawn illustrated maps', 'Airbnb welcome-book guides', 'Interactive 3D terrain'],
    accent: '#3F6B35',
    proof: { label: 'Illustrated Maps', href: withBase('/work/illustrated-maps/') },
    ctaLabel: 'Get a quote',
  },
  {
    id: 'game-design',
    tier: 'beyond',
    index: '08',
    label: 'Game Design & Creation',
    pitch: 'From rulebook to shipped build.',
    included: ['Card & tabletop game design', 'Live multiplayer web games', "Beta-testing your game"],
    accent: '#2E6E52',
    proof: { label: 'TCHOMBO!', href: withBase('/work/tchombo/') },
    ctaLabel: 'Start a project',
  },
  {
    id: 'game-nights',
    tier: 'beyond',
    index: '09',
    label: 'Game Nights',
    pitch: 'He runs the table, too.',
    included: ['One-shots & ongoing campaigns', 'Homebrew settings & rules', 'Mauritius in person, remote on request'],
    accent: 'var(--color-brand-violet)',
    proof: null,
    ctaLabel: 'Book a game night',
  },
];

export const STUDIO_SERVICES = SERVICES.filter((s) => s.tier === 'studio');
export const BEYOND_SERVICES = SERVICES.filter((s) => s.tier === 'beyond');
