# SEO / Marketing Audit — Implementation Summary

This branch implements the buildable fixes from the website, AI-search & marketing
audit, on an upgraded Astro 6 + Tailwind 4 stack.

## Done

### Technical / crawlability
- **Sitemap** via `@astrojs/sitemap` — generates `sitemap-index.xml` from real
  routes only. The 21 dead blog URLs from the old sitemap are gone (there is no
  blog in this codebase).
- **robots.txt** (was missing) referencing the sitemap.
- **llms.txt** guiding AI crawlers to the key pages.
- **Branded OG image** (`/og-image.jpg`, 1200×630) — the layout referenced a
  missing file, so every social/AI share was loading a 404. Case studies use
  their own thumbnail as the per-page OG image.

### Structured data (the audit's "open lane" — was zero)
- **Person + WebSite** on every page (`src/lib/schema.ts`, emitted by BaseLayout).
- **Service + FAQPage** on `/services` and `/ux-audit` (FAQ schema derived from
  the existing on-page Q&As; the audit Service carries the real $997 Offer).
- **ProfilePage** on `/about`.
- **CreativeWork + BreadcrumbList** on case studies; visible breadcrumbs too.

### Content / conversion
- **Homepage H1 + positioning copy** below the showreel, with a point-of-view
  line and a low-commitment "Free UX Health Check" CTA (the audit's "second
  speed" CTA). Tighter title + meta description.
- **Title/meta** rewrite on `/services`.
- **Privacy + Terms** pages (were 404 sitewide), linked from the footer. Plain-
  language starters — **have these reviewed by counsel before relying on them.**

### Lead generation
- **Interactive UX Health Check** at `/ux-health-check` — the lead magnet the
  audit recommended. 10 questions across 5 UX dimensions → 0–100 score, per-
  dimension bars, 3 prioritized recommendations, cross-sell to the paid audit.
  Email-gated; fires a GA4 `ux_health_check_completed` event. Linked from the
  homepage hero and footer. Verified end-to-end.
  - **To start capturing leads,** set `FORM_ENDPOINT` in the page — see
    `docs/ux-health-check-runbook.md`.

## Needs Savelle's input (not buildable without decisions)
- **Pricing for `/services`** — FPO (placeholder) prices are now in place so the
  page reads as complete. Update the `fpo` map at the top of
  `src/pages/services.astro` (single source of truth) with real numbers. These
  are intentionally kept out of the JSON-LD. `/ux-audit` already has the real $997.
- **Real testimonials / client logos** for proof (only one testimonial exists).
- **Positioning wedge** — the one defensible differentiator to lead with.
- **Ideal Customer Profile** — enterprise vs. mid-market vs. referred SMB.
- **Email service provider** for the UX Health Check nurture sequence.
- **Google Business Profile + LocalBusiness** for the Scottsdale local angle.
- **Blog** — decide whether to build long-tail answer content (no blog today).
- Confirm Google Search Console / GA4 access and the 90-day success metric.

## Notes
- Placeholders intentionally left for review: legal pages (counsel), the email
  endpoint (`FORM_ENDPOINT`), and `sameAs` in the Person schema (LinkedIn only
  until other profiles are confirmed live and on-brand).
