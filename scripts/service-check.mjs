import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
await page.goto(process.env.TEST_URL ?? "http://localhost:3000", { waitUntil: "networkidle" });
await page.locator('[data-sequence="services"]').scrollIntoViewIfNeeded();
const checks = [];
for (const width of [1024, 1440]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.locator('[data-sequence="services"]').scrollIntoViewIfNeeded();
  for (let i = 0; i < 11; i++) {
    await page.locator(`[data-tile="${i}"]`).focus();
    const card = page.locator(`#detail-${i}`);
    await expect(card).toHaveCSS("opacity", "1");
    const result = await card.evaluate((el) => {
      const stage = el.closest(".services-stage").getBoundingClientRect(),
        box = el.getBoundingClientRect();
      return {
        inside:
          box.left >= stage.left &&
          box.right <= stage.right &&
          box.top >= stage.top &&
          box.bottom <= stage.bottom,
        box: {
          left: box.left,
          right: box.right,
          top: box.top,
          bottom: box.bottom,
        },
        stage: {
          left: stage.left,
          right: stage.right,
          top: stage.top,
          bottom: stage.bottom,
        },
      };
    });
    checks.push({ width, tile: i, ...result });
    if (!result.inside)
      throw new Error(
        "Service card overflow: " + JSON.stringify(checks.at(-1)),
      );
  }
}
const axe = await new AxeBuilder({ page })
  .include("#services")
  .withTags(["wcag2a", "wcag2aa"])
  .analyze();
const violations = axe.violations.map((v) => ({
  id: v.id,
  nodes: v.nodes.map((n) => ({ html: n.html, summary: n.failureSummary })),
}));
await writeFile(
  "test-results/service-check.json",
  JSON.stringify({ checks, violations }, null, 2),
);
console.log(
  JSON.stringify(
    {
      cardsChecked: checks.length,
      allInside: checks.every((c) => c.inside),
      violations,
    },
    null,
    2,
  ),
);
await browser.close();
if (violations.length) process.exit(1);
