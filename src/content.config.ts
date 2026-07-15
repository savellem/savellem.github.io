import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    project: z.string(),
    year: z.number(),
    objectives: z.string(),
    description: z.string(),
    result: z.string(),
    thumbnail: z.string(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    publishDate: z.coerce.date(),
    projectUrl: z.string().optional(),
    role: z.string().optional(),
    scope: z.string().optional(),
    yearEnd: z.number().optional(),
    media: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
    homepageFeatured: z.boolean().default(false),
    homepageOrder: z.number().optional(),
    outcomes: z.array(z.object({ stat: z.string(), label: z.string() })).optional(),
  }),
});

export const collections = {
  'case-studies': caseStudies,
};
