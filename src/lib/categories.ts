export type CategoryId =
  | 'branding'
  | 'motion'
  | 'digital'
  | 'illustration'
  | 'editorial'
  | 'experiments';

export interface CategoryMeta {
  id: CategoryId;
  index: string;
  label: string;
  short: string;
  verb: string;
  description: string;
  accent: string;
}

export const CATEGORIES: Record<CategoryId, CategoryMeta> = {
  branding: {
    id: 'branding',
    index: '01',
    label: 'Branding & Identity',
    short: 'Branding',
    verb: 'Make it a brand.',
    description: 'Logos, visual identities, brand systems, art direction.',
    accent: '#FF4B6E',
  },
  motion: {
    id: 'motion',
    index: '02',
    label: 'Motion',
    short: 'Motion',
    verb: 'Make it move.',
    description: 'Logo animation, motion graphics, animated identities, video.',
    accent: '#6C4CFF',
  },
  digital: {
    id: 'digital',
    index: '03',
    label: 'Digital',
    short: 'Digital',
    verb: 'Make it digital.',
    description: 'Web, digital brochures, interactive experiences, screens.',
    accent: '#12B7B0',
  },
  illustration: {
    id: 'illustration',
    index: '04',
    label: 'Illustration & Visuals',
    short: 'Illustration',
    verb: 'Make it seen.',
    description: 'Illustration, character design, posters, experimental visuals.',
    accent: '#FFB238',
  },
  editorial: {
    id: 'editorial',
    index: '05',
    label: 'Editorial & Print',
    short: 'Editorial',
    verb: 'Make it read.',
    description: 'Brochures, publications, layouts, campaigns, print pieces.',
    accent: '#2E7DFF',
  },
  experiments: {
    id: 'experiments',
    index: '06',
    label: 'Experiments',
    short: 'Experiments',
    verb: 'Make it weird.',
    description: "Personal work, weird ideas, side projects, things that don't need a client to exist.",
    accent: '#FF7A1A',
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);
