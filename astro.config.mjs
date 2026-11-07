import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Tailwind v4 is wired through PostCSS (postcss.config.mjs) rather than the
// @tailwindcss/vite plugin, which is incompatible with Astro 6's rolldown-vite.
export default defineConfig({
  integrations: [mdx(), sitemap()],
  site: 'https://savellem.com',
  output: 'static',
  // The standalone /work page was removed; old links land on the homepage work section.
  redirects: { '/work': '/#featured-work' },
});
