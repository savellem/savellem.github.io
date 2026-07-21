import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/case-studies' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    client: z.string(),
    project: z.string(),
    year: z.number(),
    objectives: z.string().optional(),
    description: z.string(),
    result: z.string().optional(),
    /** Relative path into src/assets/ — resolved to build-time-optimized
     *  ImageMetadata, not a public/ URL string. Paths under public/ are
     *  never processed by Astro's image pipeline. */
    thumbnail: image().optional(),
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
    /** Label/value spec-sheet block (Model, Role, Team, Scope, Timeline). */
    details: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  }),
});

export const collections = {
  'case-studies': caseStudies,
};
