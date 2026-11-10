import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
const names = [
  "talentbadger",
  "renbite",
  "ffp-vault",
  "evpitch",
  "walkthroughz",
  "besttrip",
];
let source = await readFile("content/experience.ts", "utf8");
for (const name of names) {
  const dest = `public/brands/${name}-clean.webp`;
  await sharp(`public/brands/${name}-clean.png`)
    .trim({ threshold: 15 })
    .resize({ width: 640 })
    .webp({ quality: 94 })
    .toFile(dest);
  const m = await sharp(dest).metadata();
  source = source.replace(
    new RegExp(
      `logo: "/brands/${name}(?:-clean)?\\.webp",\\s*width: \\d+,\\s*height: \\d+,`,
    ),
    `logo: "/brands/${name}-clean.webp",\n    width: ${m.width},\n    height: ${m.height},`,
  );
}
await writeFile("content/experience.ts", source);
console.log("Optimized six transparent logo assets from workspace originals.");
