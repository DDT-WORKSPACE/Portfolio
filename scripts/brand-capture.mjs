// Captures the redesigned homepage (and optional routes) at several widths.
//   TEST_URL=http://localhost:3210 node scripts/brand-capture.mjs <outDir> [route...]
import { chromium } from "@playwright/test";
const base = process.env.TEST_URL ?? "http://localhost:3000";
const out = process.argv[2] ?? "test-results/brand";
const routes = process.argv.slice(3).length ? process.argv.slice(3) : ["/"];
const widths = (process.env.WIDTHS ?? "390,768,1440").split(",").map(Number);
const browser = await chromium.launch();
const errors = [];
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: w < 600 ? 844 : 900 } });
  page.on("pageerror", (e) => errors.push(`${w} ${e.message}`));
  page.on("console", (m) => m.type() === "error" && errors.push(`${w} console: ${m.text().slice(0, 160)}`));
  for (const r of routes) {
    await page.goto(base + r, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    // Scroll through so scroll-triggered reveals settle.
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 500) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    const name = (r === "/" ? "home" : r.replace(/\//g, "_").replace(/^_/, "")) + `-${w}.png`;
    await page.screenshot({ path: `${out}/${name}`, fullPage: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log(name, "horizontal overflow:", overflow);
  }
  await page.close();
}
await browser.close();
console.log(errors.length ? errors.join("\n") : "no page errors");
