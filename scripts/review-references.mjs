import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("test-results/references", { recursive: true });
const browser = await chromium.launch();
const results = [];
for (const [name, url] of [
  ["mistral", "https://mistral.ai/"],
  ["bairesdev", "https://www.bairesdev.com/"],
  ["stxnext", "https://www.stxnext.com/"],
  ["gojilabs", "https://gojilabs.com/product-management/"],
]) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `test-results/references/${name}-hero.png` });
    for (let i = 0; i < 8; i++) {
      await page.mouse.wheel(0, 700);
      await page.waitForTimeout(450);
    }
    await page.screenshot({ path: `test-results/references/${name}-body.png` });
    const info = await page.evaluate(() => ({
      title: document.title,
      headings: [...document.querySelectorAll("h1,h2")].map(
        (x) => x.textContent,
      ),
      animations: document
        .getAnimations()
        .slice(0, 30)
        .map((a) => ({ state: a.playState, timing: a.effect?.getTiming() })),
    }));
    results.push({ name, ...info });
  } catch (e) {
    results.push({ name, error: e.message });
  }
  await page.close();
}
await writeFile(
  "test-results/references/review.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));
await browser.close();
