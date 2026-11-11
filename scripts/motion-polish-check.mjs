import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const errors = [],
  checks = [];
page.on("pageerror", (e) => errors.push(e.message));
const origin = process.env.TEST_URL || "http://localhost:3002";
await mkdir("test-results/mint-studio", { recursive: true });
await page.goto(origin, { waitUntil: "networkidle" });
await expect(
  page.locator(
    ".st-hero-eyebrow,.st-logo-heading,.st-about-ring,.process-scroll-shell",
  ),
).toHaveCount(0);
const text = await page.locator(".st-type-line").innerText();
await page.waitForTimeout(4000);
if (text === (await page.locator(".st-type-line").innerText()))
  throw Error("Typed statement did not change");
checks.push("Hero copy cycles, old labels and old process are removed");
await page
  .getByRole("button", { name: "Services", exact: true })
  .first()
  .click();
await expect(page.locator(".simple-service-menu a")).toHaveCount(4);
await page.keyboard.press("Escape");
await page.mouse.move(10, 100);
await expect(page.locator("#services-menu")).toHaveCount(0);
checks.push("Simple four-link service menu opens and closes with Escape");
const at = async (selector, p) => {
  await page
    .locator(selector)
    .evaluate(
      (el, p) =>
        scrollTo({
          top:
            scrollY +
            el.getBoundingClientRect().top -
            innerHeight +
            p * (innerHeight + el.offsetHeight),
          behavior: "instant",
        }),
      p,
    );
  await page.waitForTimeout(180);
  return page
    .locator(selector)
    .evaluate((e) => ({
      spread: +e.dataset.spread,
      scale: +getComputedStyle(e).getPropertyValue("--panel-scale"),
      progress: +e.dataset.progress,
    }));
};
const detail = [];
for (const n of [0.12, 0.43, 0.91])
  detail.push(await at(".st-detail-scroll", n));
if (!(
  detail[1].spread > detail[0].spread &&
  detail[1].spread > detail[2].spread &&
  detail[1].scale > detail[0].scale
))
  throw Error(
    "Details do not expand, scatter and regroup " + JSON.stringify(detail),
  );
checks.push("Details panel grows on entry, cards scatter and regroup on exit");
await at(".st-detail-scroll", 0.43);
await page.screenshot({ path: "test-results/mint-studio/details.png" });
const tools = [];
for (const n of [0.12, 0.5, 0.91])
  tools.push(await at(".st-integration-scatter", n));
if (!(tools[1].spread > tools[0].spread && tools[1].spread > tools[2].spread))
  throw Error("Tools do not scatter/regroup");
await at(".st-integration-scatter", 0.5);
await expect(page.locator(".st-integration-core")).toContainText(
  "AI & automation",
);
await expect(page.locator("#integration-tab-1")).toHaveAttribute(
  "aria-selected",
  "true",
);
await page.screenshot({ path: "test-results/mint-studio/integrations.png" });
checks.push(
  "Integration tools scatter and regroup, with Automate active at the center",
);
for (const [selector, name] of [
  ["#studio", "about"],
  ["#services", "services"],
  ["#process", "process"],
]) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.screenshot({ path: `test-results/mint-studio/${name}.png` });
}
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(origin, { waitUntil: "networkidle" });
await expect(page.locator(".hero-glaze")).toHaveAttribute(
  "data-motion",
  "paused",
);
await expect(page.locator(".hero-glaze-haze")).toHaveCSS(
  "animation-name",
  "none",
);
checks.push("Reduced motion stops light, typewriter and illustration loops");
const a = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
const violations = a.violations.map((v) => ({
  id: v.id,
  nodes: v.nodes.map((n) => ({ html: n.html, summary: n.failureSummary })),
}));
for (const width of [375, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(origin, { waitUntil: "networkidle" });
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw Error("Overflow " + width);
  await page.screenshot({
    path: `test-results/mint-studio/full-${width}.png`,
    fullPage: true,
  });
}
checks.push("Five responsive widths fit without horizontal overflow");
await writeFile(
  "test-results/mint-studio/report.json",
  JSON.stringify({ checks, errors, violations, detail, tools }, null, 2),
);
console.log(
  JSON.stringify({ checks, errors, violations, detail, tools }, null, 2),
);
await browser.close();
if (errors.length || violations.length) process.exit(1);
