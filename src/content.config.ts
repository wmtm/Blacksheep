import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categories = [
  'branding',
  'motion',
  'digital',
  'illustration',
  'editorial',
  'experiments',
] as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    year: z.number(),
    category: z.enum(categories),
    secondaryCategories: z.array(z.enum(categories)).default([]),
    role: z.array(z.string()).default([]),
    summary: z.string(),
    excerpt: z.string(),
    accent: z.string(),
    cover: z.object({
      ratio: z.enum(['16:9', '4:5', '1:1', 'full']).default('4:5'),
      kind: z.enum(['image', 'video']).default('image'),
      label: z.string(),
      src: z.string().optional(),
      poster: z.string().optional(),
      transparent: z.boolean().default(false),
      fit: z.enum(['cover', 'contain']).default('cover'),
    }),
    gallery: z
      .array(
        z.object({
          ratio: z.enum(['16:9', '4:5', '1:1', 'full']).default('16:9'),
          kind: z.enum(['image', 'video']).default('image'),
          label: z.string(),
          src: z.string().optional(),
          poster: z.string().optional(),
          transparent: z.boolean().default(false),
          fit: z.enum(['cover', 'contain']).default('cover'),
        })
      )
      .default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    live: z.string().url().optional(),
    beforeAfter: z
      .object({
        before: z.object({
          label: z.string(),
          caption: z.string(),
        }),
        after: z.object({
          label: z.string(),
          caption: z.string(),
        }),
      })
      .optional(),
  }),
});

export const collections = { projects };
export { categories };
