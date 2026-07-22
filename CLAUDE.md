# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Savelle McThias's personal portfolio site (savellem.com) — an Astro 6 + Tailwind CSS 4 static site. Product design case studies plus standard portfolio pages (home, work, about, contact). There is no blog collection despite what `README.md` implies — only `case-studies` exists as a content collection.

## Commands

```bash
npm run dev       # astro dev — http://localhost:4321
npm run build     # astro check (typecheck) && astro build — must pass before shipping
npm run preview   # serve the production build locally
```

There is no test suite and no linter configured. `npm run build` (which runs `astro check`) is the only automated correctness gate — always run it after non-trivial changes, especially anything touching `.astro` component props/types or `src/content.config.ts`.

No dev server should be left running across turns — kill any background `astro dev` process before finishing.

## Architecture

**Content collection (`src/content.config.ts`)**: a single `case-studies` collection (glob loader over `src/content/case-studies/*.mdx`), Zod-validated. Key schema fields: `details` (label/value pairs rendered as a spec sheet — `Role`/`Team`/`Timeline` show beside the hero headline, everything else becomes keyword pills), `outcomes` (stat/label pairs for `NumbersBlock`), `homepageOrder` (controls ordering on `/work` and prev/next navigation), `featured`/`homepageFeatured` (surfacing flags).

**Excluded case studies** (`src/lib/caseStudies.ts`): `EXCLUDED_SLUGS` is a set of legacy/orphaned MDX entries that stay in the collection (so old URLs still resolve) but are filtered out of `/work` and prev/next nav. When adding a new case study, no action needed here; when retiring one, add its slug instead of deleting the file.

**Case study rendering** (`src/pages/case-studies/[...slug].astro`): `getStaticPaths` computes a `visible` (non-excluded, ordered) list once and derives prev/next by wrapping around it — excluded studies get no prev/next nav. MDX body content imports and composes components from `src/components/case-study/` directly (`CopySection`, `CopySectionPair`, `ImagePlaceholder`, `NumbersBlock`, `ReflectionSection`, `DetailsGrid`) — new case studies are authored by writing MDX that arranges these, not by writing custom markup per page.

**`ImagePlaceholder`**: dual-mode — renders a dashed "REPLACE:" placeholder box (with caption/dimensions) when `src` is unset, or an optimized `<Image>` (astro:assets, `format="webp"`) once `src`/`alt` are supplied. `src` takes `ImageMetadata` (an ESM import), not a string path. This lets case study structure/copy be drafted before final imagery exists; when adding real images, keep the same `width`/`height` aspect ratio (those props only drive the CSS aspect-ratio/placeholder box — they're independent of the image's real intrinsic size).

**`ProjectCard.astro`**: the shared full-width project listing row (index number, client/year, thumbnail, role/scope/media details) used on both `/` (featured) and `/work` (full list) — supersedes the old `FeaturedCaseStudy`/`CaseStudyCard` components, which were deleted. Thumbnail also renders via `<Image>` (webp, responsive `widths`). `LogoMarquee.astro` is the shared infinite-scroll brand-logo strip, used on `/` and `/about` — logos stay SVG (`<img>`), not run through the raster image pipeline.

**Image pipeline**: only images imported from `src/assets/` (ESM imports) get Astro's build-time optimization (webp re-encode, hashed `/_astro/...` output, responsive `widths`) — anything in `public/` is served byte-for-byte, untouched. Case study screenshots live in `src/assets/case-studies/` for this reason. The `thumbnail` field in `content.config.ts` uses the `image()` schema helper (so frontmatter takes a path *relative to the MDX file*, e.g. `"../../assets/case-studies/cs-gs-001.png"`, resolving to `ImageMetadata` — not a public/ URL string) and in-body images are ES-imported at the top of each MDX file (`import gcImg1 from '../../assets/case-studies/cs-gs-001.png'`) and passed to `<ImagePlaceholder src={gcImg1} .../>`. Anywhere a plain URL string is required instead (BaseLayout's `image` prop for OG/Twitter meta, `creativeWorkSchema`'s `image` field) — since those go into HTML attributes/JSON-LD, not another `<Image>` — pull `.src` off the resolved `ImageMetadata` (see `[...slug].astro`'s `thumbnailSrc`). `public/images/case-studies/` still holds ~20 legacy/orphaned screenshots (old `card-ritual-*`, `green-compass-*`, `thumb-*`, `work-*` filenames) not referenced by any current MDX — safe to ignore or clean up, just don't assume they're wired to anything. `public/og-image.jpg` and the header/logo assets intentionally stay plain `public/` files: OG images need a stable non-hashed URL for social crawlers, and SVG logos don't benefit from raster optimization.

**Design system (v2, dark-first)**: near-black `ink` base with a white reading "sheet" (rounded-top section) for case study bodies and the about-page timeline; `paper`/`fog`/`ember` color tokens in `global.css` `@theme`. Display font is Bricolage Grotesque, body is Instrument Sans, with Instrument Serif italic for accent words. Dark sections use `border-white/10` explicitly; light sheets keep the gray-* palette.

**Motion system**: Astro `<ClientRouter />` (view transitions) is enabled in `BaseLayout`, so every `<script>` module runs once per visit — all per-page element bindings must re-run inside a `document.addEventListener('astro:page-load', ...)` handler (fires on initial load too). Motion primitives live in `global.css` + a BaseLayout script: `data-reveal` (fade-up, `--reveal-delay` var), `data-reveal-lines` + `.reveal-line` (masked headline reveals, `--line-delay`), `data-parallax="N"` (px parallax on child img, which keeps a persistent 1.12 overscale), `.marquee`/`.marquee-track`, `.glow-orb`, `.text-outline`. All hiding is gated behind a `js` class on `<html>` so no-JS visitors see full content, and everything respects `prefers-reduced-motion`.

**Film grain**: lives as `body`'s own `background-image` (`/images/noise.png`, `background-attachment: fixed`, tiled) — deliberately *not* a `position: fixed` `::after` overlay. An element's background always paints behind its own descendants structurally, so this can't wash out foreground content (case study images, cards, text) the way a z-indexed overlay did, and it needs no z-index tuning against nested stacking contexts. The tile is grayscale+alpha with alpha baked in per-pixel (~4.5%, regenerate via `node scripts/generate-noise.mjs`) rather than relying on CSS `opacity`, since `opacity` isn't usable on `body` itself without fading the whole page. Separately: a live SVG `feTurbulence` filter for grain (an earlier approach) stalls Chrome's compositor (black frames, frozen screenshots) — always use the pre-rendered PNG tile, never inline SVG turbulence.

**SEO/structured data** (`src/lib/schema.ts`): `BaseLayout` always emits `Person` + `WebSite` JSON-LD; pages pass additional graphs via the `schema` prop (array or single object). Case studies emit `CreativeWork` + `BreadcrumbList`. `sameAs` on the Person graph intentionally lists only verified/live profiles — don't add social links speculatively.

**`BaseLayout.astro`**: single layout for every page (title/description/OG/Twitter meta, canonical URL, JSON-LD injection, GA4 script). GA4 (`PUBLIC_GA_MEASUREMENT_ID`, fallback ID committed since it's public) only loads in production builds. A second inline script does click-based conversion tracking (Stripe links, `/contact`, `mailto:`, `tel:`) by matching `href`, not per-element markup — new CTAs pointing at those destinations are tracked automatically.

**Styling**: Tailwind CSS 4, wired through PostCSS (`postcss.config.mjs`), *not* the Vite plugin — the Vite plugin is incompatible with Astro 6's rolldown-vite (see comment in `astro.config.mjs`). There is no `tailwind.config.mjs`; all theme tokens (fonts, the larger `lg:`-and-up type scale, base/component styles like `.btn-primary`, `.container-custom`, `.prose-custom`) live in `src/styles/global.css` using v4's `@theme`/`@layer` CSS-native config. When adding class strings built from JS logic, keep the literal class names present in source (as `NumbersBlock.astro` does) rather than fully dynamic template interpolation, so Tailwind's scanner can pick them up.

**Path aliases** (`tsconfig.json`): `@/*` → `src/*`, `@components/*`, `@layouts/*`, `@utils/*`.

**Lead capture**: contact and (formerly) UX-health-check forms post to a Google Apps Script Web App endpoint (owned by the site owner's Google account), documented in `docs/savelle-lead-capture-setup.md`. The script (`docs/google-apps-script-leads.gs`) is deployed manually through the Google Apps Script UI, not part of the build/deploy pipeline.

**Deployment**: GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `master`. Static output (`output: 'static'` in `astro.config.mjs`), site URL is `https://savellem.com` (custom domain via `public/CNAME`).

## Positioning

The site's value proposition is intentionally vertical-agnostic: **enrollment flows, dashboards, and the high-stakes moments where trust turns into a decision** — framed around high-stakes user moments and trust/conversion psychology, not a named industry. (This replaced narrower "health and wellness" positioning language that previously ran through the hero, meta descriptions, `src/lib/schema.ts` JSON-LD, and `public/llms.txt`, as of 2026-07-21.) When editing hero copy, meta descriptions/keywords, structured data, or `llms.txt`, keep this vertical-agnostic framing — don't reintroduce "health and wellness," "patient-facing," or similar named-vertical language as the site's core specialization claim. The hero's opening line ("There's a moment right before someone becomes a customer, a patient, a member...") is exempt — it's an illustrative list of relationship types, not a vertical claim, and stays as-is.

**Case study content is off-limits for positioning edits.** MDX files in `src/content/case-studies/` (Green Compass, Yoli, Card Ritual) are accurate descriptions of specific past projects and legitimately use industry-specific language ("patient," "wellness," etc.) where the underlying work actually was in that space — never edit case study titles/blurbs/descriptions for sitewide positioning consistency. The same applies to factual, non-positioning mentions elsewhere (e.g. the About page's "CBD wellness company" description of the actual Green Compass employer) — those describe real work history, not a specialization claim, and stay as-is.

## Content notes

- `docs/` contains planning/audit documents (SEO audit summary, case study rebuild prompts, lead-capture setup) — useful for background but may describe pages or plans (e.g. `/services`, `/ux-audit`, `/ux-health-check`) that don't currently exist in `src/pages/`. Verify against actual routes before assuming a doc reflects current state.
- Testimonials (`src/data/testimonials.ts`) have an `isPlaceholder` flag for FPO (placeholder) entries; `realTestimonials` filters them out. Only real, non-placeholder testimonials should be shown in production UI.
