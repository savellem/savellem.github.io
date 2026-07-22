import bareMinerals from '@/assets/logos/logo-bareminerals.svg?raw';
import capitolRecords from '@/assets/logos/logo-capitolrecords.svg?raw';
import gm from '@/assets/logos/logo-gm.svg?raw';
import petsmart from '@/assets/logos/logo-petsmart.svg?raw';
import richDad from '@/assets/logos/logo-richdad.svg?raw';
import sanity from '@/assets/logos/logo-sanity.svg?raw';
import sothebys from '@/assets/logos/logo-sothebys.svg?raw';
import theBeachBoys from '@/assets/logos/logo-thebeachboys.svg?raw';
import universal from '@/assets/logos/logo-universal.svg?raw';

export interface Logo {
  alt: string;
  h: string;
  width: number;
  height: number;
  /** Raw <svg> markup, recolored to currentColor, for inline rendering. */
  markup: string;
}

// Recolors every fill in a logo to currentColor so it can be inlined
// directly (color driven by the wrapping element's `color`) instead of
// applied via CSS mask-image. WebKit mobile has no async decode path for
// mask-image with an external SVG source — the mask has to be fetched and
// rasterized synchronously on the main thread the first time it's
// painted, which was stalling scroll/paint for multiple seconds. A plain
// inline SVG with fill="currentColor" is just normal vector paint, no
// masking involved. Matches masking's behavior of flattening every shape
// to one color regardless of the source's own fill values (e.g. PetSmart's
// SVG has a #000 accent path alongside its #fff shapes).
// Also swaps the SVG's own fixed width/height for 100% so it fills
// whatever box the wrapping element (h-[Npx] + aspect-ratio) sizes it to.
// Strips <defs>/clip-path entirely: several of these SVGs define a
// same-named clipPath id="a" (just a rect matching their own viewBox, an
// export artifact). Inlining multiple of these logos on one page means
// every clip-path="url(#a)" resolves to whichever id="a" appears *first*
// in the document, clipping unrelated logos to the wrong box — which is
// exactly what was chopping up GM, Rich Dad, Sanity, and Universal. The
// SVG's own viewBox already bounds the content, so the clip was redundant.
function recolor(svg: string): string {
  return svg
    .replace(/<defs>[\s\S]*?<\/defs>/g, '')
    .replace(/\s*clip-path="url\(#[^)]+\)"/g, '')
    .replace(/fill="#(fff|000)"/g, 'fill="currentColor"')
    .replace(/width="\d+" height="\d+"/, 'width="100%" height="100%"');
}

// width/height are each SVG's own viewBox — used to size the wrapping span
// in LogoMarquee to the correct aspect ratio.
export const logos: Logo[] = [
  { alt: 'bareMinerals',    h: 'h-[20px]', width: 430, height: 49,  markup: recolor(bareMinerals) },
  { alt: 'Capitol Records', h: 'h-[56px]', width: 500, height: 231, markup: recolor(capitolRecords) },
  { alt: 'GM',              h: 'h-[56px]', width: 209, height: 209, markup: recolor(gm) },
  { alt: 'PetSmart',        h: 'h-[42px]', width: 482, height: 122, markup: recolor(petsmart) },
  { alt: 'Rich Dad',        h: 'h-[20px]', width: 597, height: 79,  markup: recolor(richDad) },
  { alt: 'Sanity',          h: 'h-7',      width: 280, height: 102, markup: recolor(sanity) },
  { alt: "Sotheby's",       h: 'h-7',      width: 522, height: 114, markup: recolor(sothebys) },
  { alt: 'The Beach Boys',  h: 'h-[56px]', width: 662, height: 319, markup: recolor(theBeachBoys) },
  { alt: 'Universal',       h: 'h-[56px]', width: 460, height: 243, markup: recolor(universal) },
];
