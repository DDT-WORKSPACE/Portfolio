import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("test-results/process-scroll", { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const checks = [],
  errors = [],
  violations = [];
page.on("pageerror", (e) => errors.push(e.message));
const origin = process.env.TEST_URL ?? "http://localhost:3002";
await page.goto(origin, { waitUntil: "networkidle" });
await expect(page.locator(".hero-alignment-frame")).toHaveCount(1);
await expect(page.locator(".hero-edge-guide")).toHaveCount(2);
const alignment = await page.locator("#hero").evaluate((el) => {
  const frame = el
      .querySelector(".hero-alignment-frame")
      .getBoundingClientRect(),
    left = el.querySelector(".city-base").getBoundingClientRect(),
    right = el.querySelector(".city-right-base").getBoundingClientRect(),
    guide = el.querySelector(".edge-guide-left").getBoundingClientRect();
  return {
    left: Math.abs(frame.left - left.left),
    right: Math.abs(frame.right - right.right),
    guide: Math.abs(guide.left - left.right),
    baseline: Math.abs(left.bottom - right.bottom),
    curve: Math.abs(
      left.bottom -
        (() => {
          const r = el
            .querySelector(".hero-connection-line")
            .getBoundingClientRect();
          return r.bottom - r.height * 0.25;
        })(),
    ),
  };
});
if (Object.values(alignment).some((x) => x > 2))
  throw Error("Shapes not aligned to guides: " + JSON.stringify(alignment));
checks.push(
  "Hero stacks align to the side frame, inner guide and shared baseline",
);
await page.locator('[data-sequence="process"]').scrollIntoViewIfNeeded();
await expect(page.locator(".process-scroll-shell")).toHaveAttribute(
  "data-scroll-follow",
  "true",
);
const jump = async (i) => {
  await page.locator(".process-scroll-shell").evaluate(
    (el, i) =>
      scrollTo({
        top:
          scrollY +
          el.getBoundingClientRect().top +
          (el.offsetHeight - innerHeight) * ((i + 0.5) / 4),
        behavior: "instant",
      }),
    i,
  );
  await expect(page.locator(`#chapter-tab-${i}`)).toHaveAttribute(
    "aria-selected",
    "true",
  );
  const box = await page.locator(".chapter-tabs").boundingBox();
  if (box.y < 60 || box.y + box.height > 1000)
    throw Error("Stage index is not visible");
};
for (const width of [1440, 375]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.waitForTimeout(100);
  for (const i of [0, 1, 2, 3, 2, 1, 0]) await jump(i);
  const layoutHeights = [],
    tabPositions = [];
  for (const i of [0, 1, 2, 3]) {
    await jump(i);
    await page.evaluate(() => document.activeElement?.blur());
    await page.waitForTimeout(600);
    layoutHeights.push(
      (await page.locator(".chapter-detail").boundingBox()).height,
    );
    tabPositions.push((await page.locator(".chapter-tabs").boundingBox()).y);
    await page.locator("#process").screenshot({
      path: `test-results/process-scroll/stage-${width}-${i}.png`,
    });
  }
  if (
    Math.max(...layoutHeights) - Math.min(...layoutHeights) > 1 ||
    Math.max(...tabPositions) - Math.min(...tabPositions) > 1
  )
    throw Error("Process layout shifts between chapters");
  await page.locator("#chapter-tab-1").click();
  await expect(page.locator("#chapter-tab-1")).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.locator("#chapter-tab-1").press("End");
  await expect(page.locator("#chapter-tab-3")).toHaveAttribute(
    "aria-selected",
    "true",
  );
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw Error("Process overflows at " + width);
}
checks.push(
  "Discover, Design, Build and Launch auto-select in both scroll directions on desktop and mobile",
);
checks.push(
  "Click and keyboard selection remain synchronized with the scroll position",
);
await page.setViewportSize({ width: 1440, height: 800 });
await page.waitForTimeout(100);
await jump(2);
const bottom = await page
  .locator(".chapter-scene.is-current .chapter-outputs")
  .boundingBox();
if (bottom.y + bottom.height > 800)
  throw Error("Process content clipped on 800px-tall desktop");
await page.setViewportSize({ width: 375, height: 812 });
await page.waitForTimeout(100);
await jump(1);
const mobile = await page
  .locator(".chapter-scene.is-current .chapter-outputs")
  .boundingBox();
if (mobile.y + mobile.height > 812)
  throw Error("Process content clipped on mobile");
await expect(page.locator(".mobile-booking")).not.toHaveClass(/show/);
checks.push("Pinned content fits shorter desktop and phone viewports");
checks.push(
  "Chapter height and tab position stay fixed through all four transitions",
);
await page.emulateMedia({ reducedMotion: "reduce" });
await page.waitForTimeout(150);
await page.locator("#process").scrollIntoViewIfNeeded();
await page.locator("#chapter-tab-2").click();
await expect(page.locator("#chapter-tab-2")).toHaveAttribute(
  "aria-selected",
  "true",
);
await page.keyboard.press("Home");
await expect(page.locator("#chapter-tab-0")).toHaveAttribute(
  "aria-selected",
  "true",
);
checks.push("Reduced motion preserves the readable manual process layout");
for (const selector of ["#hero", "#process"]) {
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
const tilted = await page.locator(".hero-piece").evaluateAll((pieces) =>
  pieces.flatMap((el) => {
    const a = el.getAnimations()[0];
    if (!a) return [];
    a.pause();
    return [1000, 5000, 10000, 15000]
      .filter((time) => {
        a.currentTime = time;
        const m = new DOMMatrix(getComputedStyle(el).transform);
        return (
          Math.abs(m.b) > 0.001 ||
          Math.abs(m.c) > 0.001 ||
          Math.abs(Math.hypot(m.a, m.b) - 1) > 0.001
        );
      })
      .map((time) => ({ className: el.className, time }));
  }),
);
if (tilted.length)
  throw Error(
    "Animated hero blocks tilt out of alignment: " + JSON.stringify(tilted),
  );
checks.push(
  "Hero shapes rest on the curved-line baseline and retain alignment throughout animation",
);
await writeFile(
  "test-results/process-scroll/report.json",
  JSON.stringify({ checks, alignment, errors, violations }, null, 2),
);
console.log(JSON.stringify({ checks, alignment, errors, violations }, null, 2));
await browser.close();
if (errors.length || violations.length) process.exit(1);
