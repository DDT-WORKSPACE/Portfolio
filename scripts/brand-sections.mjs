// Screenshots individual homepage sections for visual review.
//   TEST_URL=http://localhost:3210 node scripts/brand-sections.mjs <outDir> [width]
//   THEME=emerald captures the Emerald & gold theme.
import { chromium } from "@playwright/test";
const base = process.env.TEST_URL ?? "http://localhost:3000";
const out = process.argv[2] ?? "test-results/brand-sections";
const width = Number(process.argv[3] ?? 1440);
const route = process.env.ROUTE ?? "/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 } });
if (process.env.THEME) await page.addInitScript((t) => localStorage.setItem("dd-theme", t), process.env.THEME);
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 200)));
await page.goto(base + route, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const h = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 400) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(140);
}
await page.waitForTimeout(1500);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1500);
await page.screenshot({ path: `${out}/viewport-${width}.png` });
const sections = await page.$$("main > * > section, main > section, footer");
let i = 0;
for (const s of sections) {
  const id = (await s.getAttribute("id")) || (await s.getAttribute("class"))?.split(" ")[0] || "s";
  const height = await s.evaluate((el) => Math.min(Math.ceil(el.getBoundingClientRect().height), 2400));
  await page.setViewportSize({ width, height: Math.max(300, height) });
  await s.evaluate((el) => el.scrollIntoView({ block: "start" }));
  await page.waitForTimeout(1100);
  const name = `${out}/${String(i++).padStart(2, "0")}-${id}-${width}.png`;
  await page.screenshot({ path: name });
}
console.log("sections:", i);
console.log(errors.length ? errors.join("\n") : "no page errors");
await browser.close();
