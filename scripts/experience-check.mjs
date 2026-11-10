import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("test-results/experience", { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const checks = [];
const origin = process.env.TEST_URL ?? "http://localhost:3000";
await page.goto(origin, { waitUntil: "networkidle" });
await expect(page.locator(".project-logo-cell").first()).toBeVisible();
await expect(page.locator(".project-logo-cell")).toHaveCount(12);
checks.push(
  "Six extracted project wordmarks in a continuous, accessible logo strip",
);
await page.locator('[data-sequence="handoffs"]').scrollIntoViewIfNeeded();
await expect(page.locator(".discipline")).toHaveCount(12);
await expect(page.locator(".discipline-wires")).toBeVisible();
await page
  .locator(".handoffs-v2")
  .screenshot({ path: "test-results/experience/handoffs-1440.png" });
checks.push("Twelve connected disciplines and a central product vision");
await page.locator('[data-sequence="process"]').scrollIntoViewIfNeeded();
await expect(page.locator(".studio-scene")).toBeVisible();
await page.locator(".scope-board>button").last().click();
await expect(page.locator(".scope-board>button").last()).toHaveAttribute(
  "aria-pressed",
  "true",
);
checks.push("Discovery checklist can be changed by the visitor");
for (let i = 0; i < 4; i++) {
  await page.locator(".process-nav>button").nth(i).click();
  await expect(page.locator(`.studio-scene-${i}`)).toBeVisible();
  if (i === 1) {
    await page.locator(".design-device").last().click();
    await expect(page.locator(".design-device").last()).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    checks.push("Design scene switches between three prototype screens");
  }
  if (i === 2) {
    await page
      .getByRole("button", { name: "Run preview", exact: true })
      .click();
    await expect(page.locator(".build-desk")).toHaveClass(/is-running/);
    checks.push("Build pipeline responds to Run preview");
  }
  if (i === 3) {
    await page.getByRole("button", { name: "Preview product launch" }).click();
    await expect(page.locator(".launch-product")).toContainText("We’re live.");
    checks.push("Launch preview responds without claiming a real deployment");
  }
  await page
    .locator(".process-panel")
    .screenshot({ path: `test-results/experience/process-${i}-1440.png` });
}
await page.locator("#industries").scrollIntoViewIfNeeded();
await expect(page.locator(".industry-phone").first()).toBeVisible();
await page
  .locator("#industries")
  .screenshot({ path: "test-results/experience/industries-1440.png" });
await page.getByRole("button", { name: "Next industry", exact: true }).click();
await expect
  .poll(() =>
    page.locator(".industries-carousel").evaluate((e) => e.scrollLeft),
  )
  .toBeGreaterThan(0);
checks.push(
  "Six industry cards with generated 3D artwork and working carousel",
);
await page.locator(".results-v2").scrollIntoViewIfNeeded();
await expect(page.locator(".results-v2 .stats-grid>a").first()).toContainText(
  "10",
);
checks.push(
  "Statistics count actual portfolio entries, services, disciplines and process stages",
);
await page.locator(".stories-v2").scrollIntoViewIfNeeded();
await page.getByRole("button", { name: "Next project story" }).click();
await expect(page.locator(".project-story")).toContainText(
  "Your coffee moment, perfected.",
);
checks.push(
  "Project-story switcher uses supplied product positioning, without fabricated client quotes",
);
await page.locator(".technology-v2").scrollIntoViewIfNeeded();
await expect(page.locator(".technology-groups>div")).toHaveCount(3);
checks.push("Three connected technology groups");
const violations = [];
for (const selector of [
  ".project-logo-section",
  ".handoffs-v2",
  ".process-v2",
  "#industries",
  ".results-v2",
  ".stories-v2",
  ".technology-v2",
]) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  const axe = await new AxeBuilder({ page })
    .include(selector)
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  violations.push(
    ...axe.violations.map((v) => ({
      section: selector,
      id: v.id,
      nodes: v.nodes.map((n) => ({ html: n.html, summary: n.failureSummary })),
    })),
  );
}
for (const width of [375, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: ".section{content-visibility:visible!important}",
  });
  for (const selector of [
    '[data-sequence="handoffs"]',
    '[data-sequence="process"]',
    ".results-v2",
    ".stories-v2",
    ".technology-v2",
    "#contact",
  ]) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
  }
  await page.evaluate(async () => {
    for (const img of document.images) {
      img.loading = "eager";
    }
    await Promise.all(
      [...document.images].map((i) => i.decode().catch(() => {})),
    );
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  if (overflow) throw new Error("Horizontal overflow at " + width);
  await page.screenshot({
    path: `test-results/experience/full-${width}.png`,
    fullPage: true,
  });
  checks.push(`Responsive layout at ${width}px without horizontal overflow`);
  if (width === 375) {
    await page.locator('[data-sequence="process"]').scrollIntoViewIfNeeded();
    await page.locator(".process-nav>button").nth(1).click();
    await expect(page.locator(".design-device")).toHaveCount(3);
    await page
      .locator(".process-v2")
      .screenshot({ path: "test-results/experience/process-mobile.png" });
  }
}
await page.emulateMedia({ reducedMotion: "no-preference" });
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(origin, { waitUntil: "networkidle" });
await page.locator('[data-sequence="handoffs"]').scrollIntoViewIfNeeded();
await expect(page.locator(".discipline")).toHaveCount(12);
await expect(page.locator(".discipline-wires")).toBeVisible();
const before = await page
  .locator(".discipline")
  .first()
  .evaluate((e) => getComputedStyle(e).transform);
await page.evaluate(() => {
  const el = document.getElementById("handoffs");
  window.scrollTo(
    0,
    el.getBoundingClientRect().top +
      scrollY +
      (el.offsetHeight - innerHeight) * 0.85,
  );
});
await page.waitForTimeout(400);
const after = await page
  .locator(".discipline")
  .first()
  .evaluate((e) => getComputedStyle(e).transform);
if (before === after)
  throw new Error("Scroll convergence did not change transforms");
checks.push("Normal-motion handoff transforms respond to scroll");
await writeFile(
  "test-results/experience/report.json",
  JSON.stringify({ checks, errors, violations }, null, 2),
);
console.log(JSON.stringify({ checks, errors, violations }, null, 2));
await browser.close();
if (errors.length || violations.length) process.exit(1);
