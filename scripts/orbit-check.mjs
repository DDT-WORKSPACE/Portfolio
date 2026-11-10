import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("test-results/orbits", { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const errors = [];
const checks = [];
const samples = [];
page.on("pageerror", (e) => errors.push(e.message));
const origin = process.env.TEST_URL ?? "http://localhost:3002";
await page.goto(origin, { waitUntil: "networkidle" });
await expect(page.locator(".insights-section")).toHaveCount(0);
await expect(page.locator("body")).not.toContainText(/notes from the studio/i);
checks.push("Studio notes section removed from homepage and footer");
await page.locator('[data-sequence="services"]').scrollIntoViewIfNeeded();
await expect(page.locator(".service-constellation")).toBeVisible();
const pose = async (top, label) => {
  await page
    .locator(".services-stage")
    .evaluate(
      (el, top) =>
        scrollTo({
          top: scrollY + el.getBoundingClientRect().top - top,
          behavior: "instant",
        }),
      top,
    );
  await page.waitForTimeout(350);
  const result = await page
    .locator(".service-constellation")
    .evaluate((el) => ({
      scale: new DOMMatrix(getComputedStyle(el).transform).a,
      inert: el.inert,
    }));
  samples.push({ label, ...result });
  return result;
};
const entering = await pose(760, "entering");
const expanded = await pose(30, "expanded");
if (expanded.scale < 0.99 || expanded.inert)
  throw Error("Services did not fully expand into usable nodes");
await expect(page.locator(".service-node")).toHaveCount(11);
await page.locator('[data-tile="0"]').hover();
await expect(page.locator("#detail-0")).toBeVisible();
await page.mouse.move(5, 5);
await expect(page.locator("#detail-0")).toHaveCount(0);
await page
  .locator("#services")
  .screenshot({ path: "test-results/orbits/services-expanded.png" });
const leaving = await pose(-720, "leaving");
if (
  entering.scale >= expanded.scale ||
  leaving.scale >= expanded.scale ||
  !leaving.inert
)
  throw Error("Services do not fold on entry/exit");
await pose(30, "returned");
await page.locator('[data-tile="0"]').focus();
await page.keyboard.press("ArrowRight");
await expect(page.locator('[data-tile="1"]')).toBeFocused();
await expect(page.locator("#detail-1")).toBeVisible();
await page.keyboard.press("Escape");
checks.push(
  "All eleven services expand from the centre, retract on exit, replay on return and retain hover/keyboard details",
);
await page.locator(".technology-v2").scrollIntoViewIfNeeded();
await expect(page.locator(".tech-planetary")).toHaveAttribute(
  "data-orbit",
  "running",
);
const first = await page.locator(".planet-marker").first().boundingBox();
await page.waitForTimeout(900);
const second = await page.locator(".planet-marker").first().boundingBox();
if (Math.hypot(first.x - second.x, first.y - second.y) < 5)
  throw Error("Tools are not orbiting");
const angle = await page
  .locator(".planet-face")
  .first()
  .evaluate((el) => {
    const a = new DOMMatrix(getComputedStyle(el).transform);
    const b = new DOMMatrix(
      getComputedStyle(el.closest(".planet-track")).transform,
    );
    const product = b.multiply(a);
    return Math.abs(product.b);
  });
if (angle > 0.02) throw Error("Orbiting icon does not stay upright");
await page
  .locator(".technology-v2")
  .screenshot({ path: "test-results/orbits/tools-desktop.png" });
checks.push("Four tool icons follow two circular orbits and remain upright");
await page.locator("#hero").scrollIntoViewIfNeeded();
await expect(page.locator(".tech-planetary")).toHaveAttribute(
  "data-orbit",
  "paused",
);
checks.push("Tool animation pauses offscreen");
await page.emulateMedia({ reducedMotion: "reduce" });
await page.locator("#services").scrollIntoViewIfNeeded();
await expect(page.locator(".service-constellation")).not.toHaveAttribute(
  "inert",
);
await page.locator('[data-tile="0"]').focus();
await expect(page.locator("#detail-0")).toBeVisible();
await page.keyboard.press("Escape");
const violations = [];
for (const selector of ["#services", ".technology-v2"]) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  const axe = await new AxeBuilder({ page })
    .include(selector)
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  violations.push(
    ...axe.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.failureSummary),
    })),
  );
}
const animations = await page
  .locator(".planet-track")
  .first()
  .evaluate((el) => el.getAnimations().length);
if (animations !== 0)
  throw Error("Reduced motion leaves orbital animation active");
checks.push(
  "Reduced motion retains readable, usable services and static tool positions",
);
for (const width of [375, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.locator(".technology-v2").scrollIntoViewIfNeeded();
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw Error("Overflow at " + width);
  if (width === 375)
    await page
      .locator(".technology-v2")
      .screenshot({ path: "test-results/orbits/tools-mobile.png" });
}
checks.push("No horizontal overflow at five responsive widths");
await writeFile(
  "test-results/orbits/report.json",
  JSON.stringify({ checks, samples, errors, violations }, null, 2),
);
console.log(JSON.stringify({ checks, samples, errors, violations }, null, 2));
await browser.close();
if (errors.length || violations.length) process.exit(1);
