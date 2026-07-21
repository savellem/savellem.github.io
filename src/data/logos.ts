export interface Logo {
  src: string;
  alt: string;
  h: string;
  width: number;
  height: number;
}

// width/height are each SVG's own viewBox — used to size the masked span
// in LogoMarquee to the correct aspect ratio, since a mask (unlike an
// <img>) has no intrinsic size of its own to derive `w-auto` from.
// Also used by BaseLayout to preload these as low-priority `mask-image`
// sources ahead of scroll (see the `preloadLogos` prop).
export const logos: Logo[] = [
  { src: '/images/logos/logo-bareminerals.svg',   alt: 'bareMinerals',    h: 'h-[20px]', width: 430, height: 49  },
  { src: '/images/logos/logo-capitolrecords.svg', alt: 'Capitol Records', h: 'h-[56px]', width: 500, height: 231 },
  { src: '/images/logos/logo-gm.svg',             alt: 'GM',              h: 'h-[56px]', width: 209, height: 209 },
  { src: '/images/logos/logo-petsmart.svg',       alt: 'PetSmart',        h: 'h-[42px]', width: 482, height: 122 },
  { src: '/images/logos/logo-richdad.svg',        alt: 'Rich Dad',        h: 'h-[20px]', width: 597, height: 79  },
  { src: '/images/logos/logo-sanity.svg',         alt: 'Sanity',          h: 'h-7',      width: 280, height: 102 },
  { src: '/images/logos/logo-sothebys.svg',       alt: "Sotheby's",       h: 'h-7',      width: 522, height: 114 },
  { src: '/images/logos/logo-thebeachboys.svg',   alt: 'The Beach Boys',  h: 'h-[56px]', width: 662, height: 319 },
  { src: '/images/logos/logo-universal.svg',      alt: 'Universal',       h: 'h-[56px]', width: 460, height: 243 },
];
