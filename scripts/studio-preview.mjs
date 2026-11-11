import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("test-results/studio-redesign", { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(process.env.TEST_URL ?? "http://localhost:3002", {
  waitUntil: "networkidle",
});
await page.waitForTimeout(4000);
await page.screenshot({ path: "test-results/studio-redesign/hero-motion.png" });
console.log(
  "hands",
  await page
    .locator(".connection-hands")
    .evaluate((e) => ({
      ready: e.dataset.ready,
      motion: e.dataset.motion,
      canvas: e.querySelector("canvas").width,
    })),
);
await page.emulateMedia({ reducedMotion: "reduce" });
for (const id of [
  "studio",
  "services",
  "work",
  "integrations",
  "process",
  "perspectives",
  "faq",
  "contact",
]) {
  await page.locator("#" + id).scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await page
    .locator("#" + id)
    .screenshot({ path: `test-results/studio-redesign/${id}.png` });
}
for (const width of [375, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(process.env.TEST_URL ?? "http://localhost:3002", {
    waitUntil: "networkidle",
  });
  await page.screenshot({
    path: `test-results/studio-redesign/full-${width}.png`,
    fullPage: true,
  });
}
await page.setViewportSize({ width: 1440, height: 1000 });
const axe = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
const report = {
  errors,
  violations: axe.violations.map((v) => ({
    id: v.id,
    nodes: v.nodes.map((n) => ({ html: n.html, summary: n.failureSummary })),
  })),
};
await writeFile(
  "test-results/studio-redesign/preview-report.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
await browser.close();
