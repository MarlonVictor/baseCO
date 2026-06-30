import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const homepage = defineCollection({
  loader: glob({
    base: 'src/content/homepage',
    pattern: '**/*.json',
    generateId: ({ entry }) => entry.replace(/\.json$/u, '').replaceAll('/', '-'),
  }),
  schema: z.object({
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
    }),
    services: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
      }),
    ),
    contact: z.object({
      whatsapp: z.string(),
      email: z.string(),
      address: z.string(),
    }),
  }),
});

export const collections = { homepage };
