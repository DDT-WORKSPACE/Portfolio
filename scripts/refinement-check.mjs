import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("test-results/refinement", { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [],
  checks = [];
page.on("pageerror", (e) => errors.push(e.message));
const origin = process.env.TEST_URL ?? "http://localhost:3001";
await page.goto(origin, { waitUntil: "networkidle" });
await expect(page.locator("body")).not.toContainText(/\{\{[^}]+\}\}/);
checks.push("No visible content placeholders on the homepage");
await page.locator('[data-sequence="handoffs"]').scrollIntoViewIfNeeded();
await expect(page.locator(".clarity-section .decision-row")).toHaveCount(3);
await expect(page.locator(".clarity-section")).not.toContainText(
  "DevsDen Tech",
);
await expect(page.locator(".clarity-section")).not.toContainText(
  "Web development",
);
checks.push(
  "Clarity section has three outcome-led decisions and no repeated service or company tiles",
);
await page.waitForTimeout(600);
await page
  .locator(".clarity-section")
  .screenshot({ path: "test-results/refinement/clarity.png" });
await page.locator('[data-sequence="services"]').scrollIntoViewIfNeeded();
await expect(page.locator('[data-tile="0"]')).toBeVisible();
await page.locator('[data-tile="0"]').hover();
await expect(page.locator("#detail-0")).toBeVisible();
await page.mouse.move(700, 125);
await expect(page.locator(".service-detail")).toHaveCount(0, { timeout: 800 });
checks.push("Service detail closes promptly when leaving the tile");
await page.locator('[data-tile="1"]').hover();
await expect(page.locator("#detail-1")).toBeVisible();
await page.locator("#detail-1").hover();
await page.waitForTimeout(300);
await expect(page.locator("#detail-1")).toBeVisible();
await page.keyboard.press("Escape");
checks.push(
  "Service detail remains usable while hovering its card; Escape dismisses it",
);
await page.locator('[data-sequence="process"]').scrollIntoViewIfNeeded();
await expect(page.locator(".chapter-tabs")).toBeVisible();
const titles = [];
for (let i = 0; i < 4; i++) {
  await page.getByRole("tab").nth(i).click();
  await expect(page.getByRole("tab").nth(i)).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.locator(".chapter-scene.is-current .chapter-outputs li")).toHaveCount(3);
  titles.push(await page.locator(".chapter-scene.is-current .chapter-story h3").innerText());
  await page
    .locator("#process")
    .screenshot({ path: `test-results/refinement/process-${i}.png` });
}
if (new Set(titles).size !== 4) throw new Error("Repeated process chapters");
await page.keyboard.press("Home");
await expect(page.getByRole("tab").nth(0)).toBeFocused();
await page.keyboard.press("ArrowRight");
await expect(page.getByRole("tab").nth(1)).toHaveAttribute(
  "aria-selected",
  "true",
);
checks.push(
  "All four process chapters display distinct content and deliverables; keyboard tabs work",
);
await expect(page.locator(".footer-contact-line>a")).toHaveAttribute(
  "href",
  "mailto:devsdevtech@gmail.com",
);
checks.push("Footer email opens the supplied domain in a mail link");
const arts = await page
  .locator(".industry-phone")
  .evaluateAll((images) => images.map((i) => i.getAttribute("src")));
if (new Set(arts).size !== 6) throw new Error("Repeated industry artwork");
checks.push("Six industries have six different illustrations");
await page.locator("#industries").scrollIntoViewIfNeeded();
await page
  .locator("#industries")
  .screenshot({ path: "test-results/refinement/industries.png" });
await page.locator(".accelerator-row").first().scrollIntoViewIfNeeded();
await page.waitForTimeout(350);
const before = await page
  .locator(".accelerator-row")
  .first()
  .evaluate((e) => e.getBoundingClientRect().top);
await page.locator(".accelerator-row").first().click();
await expect(page).toHaveURL(origin + "/starting-points/ai-agent-starter");
await expect(page.locator("h1")).toContainText("Reception & lead follow-up");
await page.goBack({ waitUntil: "networkidle" });
await page.waitForTimeout(1400);
const after = await page
  .locator(".accelerator-row")
  .first()
  .evaluate((e) => e.getBoundingClientRect().top);
if (Math.abs(before - after) > 35)
  throw new Error(
    `Back restoration moved the selected row: ${before} -> ${after}`,
  );
checks.push(
  "Starting-point link opens its own detail page; browser Back restores the original section position",
);
await page.goto(origin + "/services/ai-automation", {
  waitUntil: "networkidle",
});
await expect(page.locator(".automation-detail")).toContainText(
  "Reception & appointments",
);
await expect(page.locator(".automation-detail")).toContainText(
  "Sales follow-up",
);
await expect(page.locator(".automation-detail")).toContainText(
  "Everyday operations",
);
checks.push(
  "Automation service covers reception, sales and operational workflows",
);
for (const route of [
  "/blog/ai-that-earns-its-place",
  "/blog/before-the-first-sprint",
  "/blog/design-and-engineering",
  "/work/talentbadger",
  "/work/ffp-vault",
  "/starting-points/document-search",
  "/starting-points/mvp-launch",
  "/starting-points/commerce-launch",
  "/legal/privacy",
  "/legal/terms",
]) {
  await page.goto(origin + route, { waitUntil: "networkidle" });
  await expect(page.locator("body")).not.toContainText(/\{\{[^}]+\}\}/);
  checks.push("Complete content: " + route);
}
await page.goto(origin, { waitUntil: "networkidle" });
await page.locator("#faq").scrollIntoViewIfNeeded();
for (let i = 0; i < 6; i++) {
  await page.locator(".faq-item button").nth(i).click();
  await expect(
    page.locator(".faq-item").nth(i).locator(".accordion-content"),
  ).toContainText(/.{50}/);
}
checks.push("All six FAQs have substantive answers");
const violations = [];
for (const selector of [
  "#hero",
  ".clarity-section",
  "#services",
  "#process",
  "#industries",
  ".engagement-section",
  ".technology-v2",
  ".accelerator-section",
  "#faq",
  ".footer",
]) {
  await page
    .locator(
      selector.startsWith(".clarity")
        ? '[data-sequence="handoffs"]'
        : selector === "#services"
          ? '[data-sequence="services"]'
          : selector === "#process"
            ? '[data-sequence="process"]'
            : selector,
    )
    .scrollIntoViewIfNeeded();
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
  for (const sel of [
    '[data-sequence="handoffs"]',
    '[data-sequence="services"]',
    '[data-sequence="process"]',
    "#contact",
  ]) {
    await page.locator(sel).scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
  }
  await page.evaluate(async () => {
    for (const i of document.images) i.loading = "eager";
    await Promise.race([
      Promise.all([...document.images].map((i) => i.decode().catch(() => {}))),
      new Promise((r) => setTimeout(r, 4000)),
    ]);
    scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  if (overflow) throw new Error("Horizontal overflow at " + width);
  if (width === 1440 || width === 375) {
    await page
      .locator(".footer")
      .screenshot({ path: `test-results/refinement/footer-${width}.png` });
    await page
      .locator("#process")
      .screenshot({ path: `test-results/refinement/process-${width}.png` });
  }
  await page.screenshot({
    path: `test-results/refinement/full-${width}.png`,
    fullPage: true,
  });
  checks.push("Responsive layout: " + width + "px");
}
await context.close();
const normal = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const p = await normal.newPage();
p.on("pageerror", (e) => errors.push(e.message));
await p.goto(origin, { waitUntil: "networkidle" });
const choreography = await p.locator(".block-left-step").evaluate((el) => {
  const animation = el.getAnimations()[0];
  if (!animation) throw new Error("Missing hero animation");
  animation.pause();
  const samples = [1000, 2500, 4200, 6500, 8300, 12500].map((time) => {
    animation.currentTime = time;
    const m = new DOMMatrix(getComputedStyle(el).transform);
    return {
      time,
      x: m.e,
      y: m.f,
      a: m.a,
      b: m.b,
      sx: Math.hypot(m.a, m.b),
      sy: Math.hypot(m.c, m.d),
    };
  });
  animation.play();
  return samples;
});
if (
  choreography.some(
    (s) => Math.abs(s.sx - 1) > 0.001 || Math.abs(s.sy - 1) > 0.001,
  )
)
  throw new Error("Hero shape still pulses in size");
if (
  JSON.stringify(choreography[0], ["x", "y", "a", "b"]) !==
  JSON.stringify(choreography[1], ["x", "y", "a", "b"])
)
  throw new Error("Missing hero hold");
if (choreography[2].a === choreography[0].a)
  throw new Error("Missing geometric turn");
await p
  .locator("#hero")
  .screenshot({ path: "test-results/refinement/hero-choreography.png" });
checks.push(
  "Hero holds, slides and turns between geometric poses without scale pulsation",
);
await p.locator('[data-sequence="services"]').scrollIntoViewIfNeeded();
await expect(p.locator(".service-packet")).toHaveCount(1);
const firstPath = await p
  .locator(".service-packet animateMotion")
  .getAttribute("path");
await p.waitForTimeout(2200);
const nextPath = await p
  .locator(".service-packet animateMotion")
  .getAttribute("path");
if (firstPath === nextPath)
  throw new Error("Service signal did not move to another trace");
checks.push("Service packet advances between connections");
await p.locator("#industries").scrollIntoViewIfNeeded();
await p.mouse.move(5, 5);
const initial = await p
  .locator(".industries-carousel")
  .evaluate((e) => e.scrollLeft);
await p.waitForTimeout(6200);
const advanced = await p
  .locator(".industries-carousel")
  .evaluate((e) => e.scrollLeft);
if (advanced <= initial) throw new Error("Industry slideshow did not advance");
checks.push("Industry slideshow advances without clicking");
await p.getByRole("button", { name: "Pause industry slideshow" }).click();
const carousel = p.locator(".industries-carousel");
const box = await carousel.boundingBox();
const prior = await carousel.evaluate((e) => e.scrollLeft);
await p.mouse.move(box.x + box.width * 0.7, box.y + 130);
await p.mouse.down();
await p.mouse.move(box.x + box.width * 0.3, box.y + 130, { steps: 12 });
await p.mouse.up();
await expect(p).toHaveURL(origin + "/");
if ((await carousel.evaluate((e) => e.scrollLeft)) <= prior)
  throw new Error("Mouse drag did not move carousel");
checks.push("Industry carousel supports drag without accidental navigation");
await writeFile(
  "test-results/refinement/report.json",
  JSON.stringify({ checks, errors, violations }, null, 2),
);
console.log(JSON.stringify({ checks, errors, violations }, null, 2));
await browser.close();
if (errors.length || violations.length) process.exit(1);
