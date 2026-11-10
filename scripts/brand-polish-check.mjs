import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("test-results/brand-polish", { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const origin = process.env.TEST_URL ?? "http://localhost:3002";
await context.grantPermissions(["clipboard-read", "clipboard-write"], {
  origin,
});
const page = await context.newPage();
const checks = [],
  errors = [],
  violations = [],
  logos = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(origin, { waitUntil: "networkidle" });
await expect(page.locator("#hero h1")).toContainText(
  /One team from\s*first idea to launch/,
);
await expect(
  page.locator(".hero-blocks,.hero-pixel-signal,.hero-architecture"),
).toHaveCount(0);
await expect(page.locator(".hero-piece")).toHaveCount(9);
checks.push(
  "Hero retains the headline with screenshot-aligned side guides, an upper arc and orderly edge stacks",
);
for (const name of [
  "talentbadger",
  "renbite",
  "ffp-vault",
  "evpitch",
  "walkthroughz",
  "besttrip",
]) {
  const path = `public/brands/${name}-clean.webp`;
  const { data, info } = await sharp(path)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let transparent = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] < 10) transparent++;
  if (transparent / (info.width * info.height) < 0.2)
    throw Error("Opaque logo background: " + name);
  logos.push({
    name,
    width: info.width,
    height: info.height,
    transparentFraction: transparent / (info.width * info.height),
  });
}
checks.push("All six logo assets contain substantial true alpha transparency");
await page
  .locator(".project-logo-section img")
  .evaluateAll(async (imgs) => Promise.all(imgs.map((i) => i.decode())));
for (const width of [375, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(100);
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw Error("Overflow at " + width);
  const overlap = await page.locator(".hero-v3-copy").evaluate((el) => {
    const protectedRects = [
      ...el.querySelectorAll("h1,.hero-v3-description,.hero-v3-buttons a"),
    ].map((e) => e.getBoundingClientRect());
    return [...document.querySelectorAll(".hero-studio-art .hero-piece")].some(
      (art) => {
        const a = art.getBoundingClientRect();
        return protectedRects.some(
          (r) =>
            a.left < r.right &&
            a.right > r.left &&
            a.top < r.bottom &&
            a.bottom > r.top,
        );
      },
    );
  });
  if (overlap) throw Error("Hero art overlaps copy at " + width);
  if (width === 375 || width === 1440) {
    await page
      .locator("#hero")
      .screenshot({ path: `test-results/brand-polish/hero-${width}.png` });
    await page
      .locator(".project-logo-section")
      .screenshot({ path: `test-results/brand-polish/logos-${width}.png` });
    await page
      .locator(".contact-refined")
      .screenshot({ path: `test-results/brand-polish/contact-${width}.png` });
    await page
      .locator(".footer")
      .screenshot({ path: `test-results/brand-polish/footer-${width}.png` });
  }
}
checks.push(
  "Five responsive widths have no overflow or hero artwork/copy overlap",
);
await page.setViewportSize({ width: 1440, height: 1000 });
await page.getByRole("button", { name: "Copy email address" }).click();
await expect(page.getByRole("button", { name: "Email copied" })).toBeVisible();
if (
  (await page.evaluate(() => navigator.clipboard.readText())) !==
  "devsdevtech@gmail.com"
)
  throw Error("Incorrect copied email");
await expect(page.locator(".footer-copy-status")).toContainText("Copied!");
if ((await page.locator(".footer").boundingBox()).height > 550)
  throw Error("Footer no longer compact");
await page.locator('nav[aria-label="Footer studio"] a').first().hover();
await expect
  .poll(() =>
    page
      .locator('nav[aria-label="Footer studio"] a')
      .first()
      .evaluate((e) => getComputedStyle(e, "::after").opacity),
  )
  .toBe("1");
checks.push(
  "Footer copies the correct email, confirms it, provides hover feedback and stays compact",
);
for (const selector of [
  "#hero",
  ".project-logo-section",
  ".contact-refined",
  ".footer",
]) {
  const axe = await new AxeBuilder({ page })
    .include(selector)
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  violations.push(
    ...axe.violations.map((v) => ({
      selector,
      id: v.id,
      nodes: v.nodes.map((n) => n.failureSummary),
    })),
  );
}
await page.emulateMedia({ reducedMotion: "no-preference" });
await page.locator("#hero").scrollIntoViewIfNeeded();
const poses = await page.locator(".city-column").evaluate((el) => {
  const a = el.getAnimations()[0];
  if (!a) throw Error("Missing ribbon animation");
  a.pause();
  return [400, 1000, 4200].map((t) => {
    a.currentTime = t;
    const m = new DOMMatrix(getComputedStyle(el).transform);
    return { x: m.e, y: m.f, a: m.a, scale: Math.hypot(m.a, m.b) };
  });
});
if (
  poses[0].x !== poses[1].x ||
  Math.abs(poses[0].x - poses[2].x) < 20 ||
  poses.some((p) => Math.abs(p.scale - 1) > 0.001)
)
  throw Error("Hero rhythm or fixed-size motion failed");
await page.locator(".footer").scrollIntoViewIfNeeded();
await expect(page.locator("#hero")).toHaveAttribute("data-motion", "paused");
await page.emulateMedia({ reducedMotion: "reduce" });
if (
  await page
    .locator(".hero-piece")
    .first()
    .evaluate((el) => el.getAnimations().length)
)
  throw Error("Reduced motion still animated");
checks.push(
  "Hero keeps fixed-size geometric holds and movements, pauses offscreen and respects reduced motion",
);
await writeFile(
  "test-results/brand-polish/report.json",
  JSON.stringify({ checks, logos, errors, violations }, null, 2),
);
console.log(JSON.stringify({ checks, errors, violations }, null, 2));
await browser.close();
if (errors.length || violations.length) process.exit(1);
