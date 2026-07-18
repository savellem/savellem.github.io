Rebuild the three case study pages (Green Compass, Yoli, Card Ritual) using the content in docs/casestudy/green-compass-case-study.md, docs/casestudy/yoli-case-study.md, and docs/casestudy/card-ritual-case-study.md as the source copy. Do not rewrite or paraphrase the copy in these files, use it as-is. Match the site's existing design system (typography, spacing, color tokens) already established on the homepage and about page.

## STRUCTURE FOR EACH CASE STUDY PAGE

1. **Header** — Project title, one-line description, back link to Work
2. **Details block** — Render the "## Details" section from the markdown as a clean label/value grid (Model, Role, Team, Scope, Timeline), similar to a spec sheet. Small caps or muted labels, clear values. Four to five items in a row on desktop, stacking on mobile.
3. **Numbers block — HIGH PRIORITY** — Render the "## The Numbers" section as large, bold statistics, the dominant visual element on the page after the title. These numbers need to be readable in under 3 seconds by someone scanning quickly. Use large numeral type (60px+ desktop), muted label text underneath each stat, laid out in a row of 3-4 stat cards. This section should appear near the top of the page, directly after the Details block, before the Problem narrative begins. Do not bury these numbers at the bottom of the page.
4. **Problem** — Standard body copy section from "## The Problem"
5. **Role and Constraints** (Green Compass and Yoli only, titled per the markdown headers) — Standard body copy
6. **What I Built / The Build** — Standard body copy, this is the longest narrative section
7. **Results** — Standard body copy, can visually echo the Numbers block styling with lighter weight, since the big numbers already appeared above
8. **Reflection section** (titled per the markdown: "What I'd Push Further" / "What I'd Build Next" / "What I'd Do Differently") — Standard body copy, slightly set apart visually (subtle background tint or top border) to signal it's a closing, reflective tone shift from the rest of the page

## IMAGES — 4 per case study, placeholder only

Insert 4 placeholder image blocks per case study at the positions below. Each placeholder should render as a gray box with a dashed border, showing: the exact pixel dimensions, an alt-text style caption describing what should go there, and a small label like "REPLACE: [description]". Do not attempt to generate or source real images, these are for the user to manually replace later.

### Green Compass (4 placeholders)
1. **Hero image** — 1600x900px, wide format. Caption: "Full enrollment flow overview, could be a composite of 2-3 key screens (kit selection, pricing review, confirmation) shown together, or a single wide screenshot of the main enrollment landing screen."
2. **Kit selection / product pairing screen** — 750x1334px, mobile portrait. Caption: "The step where a distributor picks their first and second product, showing the disabled-with-explanation state for products that can't legally pair together."
3. **Pricing review screen** — 750x1334px, mobile portrait. Caption: "The review step showing all three pricing paths side by side, retail, subscription, and distributor enrollment."
4. **Results/confirmation screen or dashboard** — 1600x900px, wide format. Caption: "Final confirmation screen or an internal view showing the completed enrollment, positioned near the Results section as the closing visual."

### Yoli (4 placeholders)
1. **Hero image** — 1600x900px, wide format. Caption: "Split or composite view showing both the patient dashboard and practitioner dashboard side by side, communicating the multi-role system at a glance."
2. **Patient results view** — 750x1334px, mobile or tablet portrait. Caption: "The Omega-3 gradient scale with the desirable range marker, this is the signature visual of the case study, make sure it's featured clearly and large enough to read the gradient detail."
3. **Practitioner dashboard** — 1600x900px, wide format (desktop view, since practitioners likely use this on larger screens). Caption: "Overview screen showing patient counts, test statuses, and flagged actions (overdue retests, incomplete subscriptions)."
4. **Intake flow** — 750x1334px, mobile portrait. Caption: "The registration and kit-scanning intake flow, showing the prefilled form and barcode scan step."

### Card Ritual (4 placeholders)
1. **Hero image** — 1600x900px, wide format. Caption: "App screenshot or composite showing the daily card pull screen, this should feel like the emotional entry point to the product."
2. **Card pull / journaling screen** — 750x1334px, mobile portrait. Caption: "The core daily loop, pulling a card and writing a journal entry, ideally showing the card art and the reflection prompt together."
3. **Journal history / entries view** — 750x1334px, mobile portrait. Caption: "The list or calendar view of past entries, showing how a user looks back on patterns over time."
4. **Brand/marketing moment** — 1600x900px, wide format. Caption: "Marketing site screenshot or app icon/branding moment, shows the product as a finished, polished whole rather than just UI screens."

## GENERAL RULES

- No em dashes anywhere in any rendered text (check the source markdown copy as well, since it should already comply, but verify)
- Keep body copy width constrained for readability (roughly 65-75 characters per line), don't let paragraphs stretch full page width
- The Numbers block styling should be reusable as a shared component across all three case studies, not custom-built three separate times
- Maintain consistent spacing and section order across all three pages so a reader who views more than one case study gets a predictable rhythm
- After building, do a pass to confirm the Numbers block is visually the strongest element on the page after the hero title, that's the primary goal of this rebuild
