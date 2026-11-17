// Emerald & gold copies of the brand raster assets (logo, 3D service icons, industry art).
//   node scripts/emerald-assets.mjs
import sharp from "sharp";
import { mapRgb } from "./emerald-palette.mjs";

const jobs = [
  ["public/Logo/logo.png", "public/Logo/logo-emerald.png", "png"],
  ["public/Logo/logo.png", "public/Logo/favicon-emerald.png", "png", 64],
  ["public/service-atlas.webp", "public/service-atlas-emerald.webp", "webp"],
  // Industry illustrations (homepage Industries cards and /industries pages).
  ...["industry-phone", "healthcare-v2", "commerce-v2", "logistics-v2", "education-v2", "saas-v2"].map((n) => [
    `public/artwork/${n}.webp`,
    `public/artwork/${n}-emerald.webp`,
    "webp",
    0,
    { warmWide: true },
  ]),
];
for (const [src, dest, fmt, size = 0, opts] of jobs) {
  let input = sharp(src).ensureAlpha();
  if (size) input = input.resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });
  const { data, info } = await input.raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue;
    const [r, g, b] = mapRgb(data[i], data[i + 1], data[i + 2], opts);
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }
  const img = sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
  await (fmt === "png" ? img.png() : img.webp({ quality: 92, alphaQuality: 100 })).toFile(dest);
  console.log(dest, info.width, info.height);
}
