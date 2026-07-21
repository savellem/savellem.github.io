// Regenerates public/images/noise.png — the tiled film-grain texture used
// as body's background-image in src/styles/global.css. Grayscale+alpha PNG
// with alpha baked in per-pixel so the tile itself carries the ~4.5%
// visibility (no CSS opacity needed, which would otherwise apply to
// whatever element the background sits on).
//
// Run with: node scripts/generate-noise.mjs
import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';

const W = 128;
const H = 128;
const ALPHA = Math.round(255 * 0.045);

const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  crcTable[n] = c >>> 0;
}
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 4; // color type: grayscale + alpha

const raw = Buffer.alloc(H * (W * 2 + 1));
for (let y = 0; y < H; y++) {
  const rowStart = y * (W * 2 + 1);
  raw[rowStart] = 0; // filter: none
  for (let x = 0; x < W; x++) {
    const px = rowStart + 1 + x * 2;
    raw[px] = Math.floor(Math.random() * 256);
    raw[px + 1] = ALPHA;
  }
}

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);

writeFileSync(new URL('../public/images/noise.png', import.meta.url), png);
console.log(`wrote public/images/noise.png (${png.length} bytes, alpha=${ALPHA})`);
