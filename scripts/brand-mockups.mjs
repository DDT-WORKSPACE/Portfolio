// Recolors the supplied portfolio mockups into the DevsDen brand palette.
// Originals in public/Projects stay untouched; branded copies are written to
// public/Projects/brand/<slug>.webp. Only saturated accent hue bands are moved,
// so product photography, skin tones, greys and type keep their structure.
//
//   node scripts/brand-mockups.mjs
//   PALETTE=emerald node scripts/brand-mockups.mjs   (green and gold copies in public/Projects/emerald)
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { GREEN_HUE, GOLD_HUE, greenL, goldL } from "./emerald-palette.mjs";

const EMERALD = process.env.PALETTE === "emerald";
const OUT = EMERALD ? "public/Projects/emerald" : "public/Projects/brand";

const BLUE = EMERALD ? GREEN_HUE : 216; // #035FE8 (or Figma teal-green)
const ORANGE = EMERALD ? GOLD_HUE : 26; // #FF6F00 (or Figma gold)

// band: { from: hue centre, width: half-width in degrees, to: target hue,
//         compress: how much of the original hue spread is kept (0..1),
//         sat: saturation multiplier at full weight }
const jobs = [
  { file: "talentbadger.jpg", slug: "talentbadger", bands: [{ from: 182, width: 38, to: BLUE, compress: 0.35, sat: 1.05 }] },
  { file: "renbite.jpg", slug: "renbite", bands: [{ from: 78, width: 34, to: BLUE, compress: 0.3, sat: 1.0 }] },
  { file: "crypto-wallet.png", slug: "crypto-wallet", bands: [{ from: 150, width: 34, to: BLUE, compress: 0.35, sat: 1.1 }] },
  {
    file: "ffp_vault.jpg",
    slug: "ffp-vault",
    bands: [
      { from: 262, width: 36, to: BLUE, compress: 0.35, sat: 1.1 },
      { from: 352, width: 20, to: ORANGE, compress: 0.3, sat: 1.05 },
    ],
  },
  {
    file: "besttrip.png",
    slug: "besttrip",
    bands: [
      { from: 194, width: 26, to: BLUE, compress: 0.4, sat: 1.05 },
      { from: 356, width: 22, to: ORANGE, compress: 0.35, sat: 1.05 },
    ],
  },
  {
    file: "gcl-storefront.webp",
    slug: "gcl-storefront",
    bands: [
      { from: 212, width: 26, to: BLUE, compress: 0.5, sat: 1.05 },
      { from: 2, width: 18, to: ORANGE, compress: 0.35, sat: 1.0 },
    ],
  },
  { file: "evpitch.jpg", slug: "evpitch", bands: [{ from: 202, width: 26, to: BLUE, compress: 0.45, sat: 1.1 }] },
  {
    file: "walkthroughz.jpg",
    slug: "walkthroughz",
    bands: [{ from: 200, width: 24, to: BLUE, compress: 0.4, sat: 1.1 }],
    tintDark: { hue: 222, strength: 0.32, below: 0.32 },
  },
  {
    file: "beardfriends.jpg",
    slug: "beardfriends",
    bands: [
      { from: 268, width: 32, to: BLUE, compress: 0.35, sat: 1.05 },
      { from: 322, width: 22, to: ORANGE, compress: 0.35, sat: 1.0 },
    ],
  },
  {
    file: "shopmart.jpg",
    slug: "shopmart",
    chroma: [0.012, 0.06],
    bands: [
      { from: 88, width: 48, to: BLUE, compress: 0.3, sat: 1.15 },
      { from: 160, width: 28, to: BLUE, compress: 0.3, sat: 1.1 },
      { from: 352, width: 16, to: ORANGE, compress: 0.35, sat: 1.0 },
    ],
  },
];

const wrap = (h) => ((h % 360) + 360) % 360;
const diff = (a, b) => {
  let d = wrap(a - b);
  return d > 180 ? d - 360 : d;
};
const smooth = (e0, e1, x) => {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};
function toHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  let h = 0, s = 0;
  if (d > 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (mx === r) h = ((g - b) / d) % 6;
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = wrap(h * 60);
  }
  return [h, Math.min(1, s), l, d];
}
function toRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

await mkdir(OUT, { recursive: true });
for (const job of jobs) {
  const img = sharp(`public/Projects/${job.file}`).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    let [h, s, l, chroma] = toHsl(data[i], data[i + 1], data[i + 2]);
    let changed = false;
    // Near-grey pixels have an unstable hue; fade the effect in with chroma.
    const [c0, c1] = job.chroma ?? [0.04, 0.16];
    const chromaWeight = smooth(c0, c1, chroma);
    for (const band of job.bands) {
      const d = Math.abs(diff(h, band.from));
      const w = (1 - smooth(band.width * 0.55, band.width, d)) * chromaWeight;
      if (w <= 0.001) continue;
      const target = wrap(band.to + diff(h, band.from) * band.compress);
      h = wrap(h + diff(target, h) * w);
      s = Math.min(1, s * (1 + (band.sat - 1) * w));
      if (EMERALD) {
        const green = band.to === BLUE;
        s *= 1 - (green ? 0.4 : 0.22) * w;
        l += ((green ? greenL(l) : goldL(l)) - l) * w;
      }
      changed = true;
      break;
    }
    if (job.tintDark && l < job.tintDark.below && chroma < 0.12) {
      const k = job.tintDark.strength * (1 - l / job.tintDark.below);
      h = EMERALD ? GREEN_HUE : job.tintDark.hue;
      s = Math.max(s, k);
      changed = true;
    }
    if (!changed) continue;
    const [r, g, b] = toRgb(h, s, l);
    data[i] = Math.round(r);
    data[i + 1] = Math.round(g);
    data[i + 2] = Math.round(b);
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .webp({ quality: 90, alphaQuality: 100, smartSubsample: true })
    .toFile(`${OUT}/${job.slug}.webp`);
  console.log(`${job.file} -> ${OUT}/${job.slug}.webp (${info.width}x${info.height})`);
}
