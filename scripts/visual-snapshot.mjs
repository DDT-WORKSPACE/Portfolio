// Full-page screenshots of the main routes (reduced motion, so pages are still) for before/after
// comparisons. Compare two folders with: node scripts/visual-snapshot.mjs --compare <dirA> <dirB>
//   TEST_URL=http://localhost:3220 node scripts/visual-snapshot.mjs <outDir> [theme]
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";

const routes = [
  "/", "/work", "/work/renbite", "/services", "/services/web-development", "/services/ai-automation",
  "/industries/healthcare", "/about", "/integrations", "/integrations/slack", "/blog",
  "/blog/signs-your-crm-needs-automation", "/contact", "/starting-points/mvp-launch", "/legal/privacy", "/missing-page",
];

if (process.argv[2] === "--compare") {
  const [a, b] = [process.argv[3], process.argv[4]];
  for (const f of (await readdir(a)).filter((x) => x.endsWith(".png"))) {
    try {
      const A = await sharp(`${a}/${f}`).raw().toBuffer({ resolveWithObject: true });
      const B = await sharp(`${b}/${f}`).raw().toBuffer({ resolveWithObject: true });
      if (A.info.width !== B.info.width || A.info.height !== B.info.height) {
        console.log(`${f}: SIZE ${A.info.width}x${A.info.height} -> ${B.info.width}x${B.info.height}`);
        continue;
      }
      let diff = 0;
      for (let i = 0; i < A.data.length; i += A.info.channels)
        if (Math.abs(A.data[i] - B.data[i]) + Math.abs(A.data[i + 1] - B.data[i + 1]) + Math.abs(A.data[i + 2] - B.data[i + 2]) > 30) diff++;
      const pct = (diff / (A.info.width * A.info.height)) * 100;
      console.log(`${f}: ${pct.toFixed(3)}% different${pct > 0.3 ? "  <-- check" : ""}`);
    } catch (e) {
      console.log(`${f}: ${e.message}`);
    }
  }
  process.exit(0);
}

const base = process.env.TEST_URL ?? "http://localhost:3000";
const out = process.argv[2];
const theme = process.argv[3] ?? "brand";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || undefined });
for (const width of [1440, 390]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  await context.addInitScript((t) => {
    localStorage.setItem("dd-theme", t);
    localStorage.setItem("dd-no-track", "1");
  }, theme);
  const page = await context.newPage();
  for (const r of routes) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base + r, { waitUntil: "networkidle" });
    const h = await page.evaluate(() => Math.min(document.documentElement.scrollHeight, 16000));
    await page.setViewportSize({ width, height: h });
    await page.waitForTimeout(1500);
    await page.evaluate(() => document.querySelectorAll(".dd-theme-switch, nextjs-portal").forEach((e) => e.remove()));
    const name = `${r === "/" ? "home" : r.slice(1).replace(/\//g, "_")}-${width}.png`;
    await page.screenshot({ path: `${out}/${name}`, animations: "disabled" });
  }
  await context.close();
}
console.log("saved", out);
await browser.close();
