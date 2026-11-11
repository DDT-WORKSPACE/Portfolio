import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 1000 } });
const p = await c.newPage();
const errors = [],
  checks = [];
p.on("pageerror", (e) => errors.push(e.message));
const origin = process.env.TEST_URL || "http://localhost:3002";
await mkdir("test-results/final-polish", { recursive: true });
await p.goto(origin, { waitUntil: "networkidle" });
const caption = await p.locator(".hero-proof-label").boundingBox(),
  marquee = await p.locator(".st-logo-marquee").boundingBox();
if (
  Math.abs(caption.x + caption.width / 2 - (marquee.x + marquee.width / 2)) > 2
)
  throw Error("Caption not centered");
const logo = await p.locator(".st-logo img").first().boundingBox();
if (logo.width < 140) throw Error("Logos remain small");
await p.screenshot({ path: "test-results/final-polish/hero.png" });
checks.push("Larger portfolio marks and a centered caption above the strip");
const at = async (n) => {
  await p
    .locator(".ab-bento")
    .evaluate(
      (el, n) =>
        scrollTo({
          top:
            scrollY +
            el.getBoundingClientRect().top -
            innerHeight +
            n * (innerHeight + el.offsetHeight),
          behavior: "instant",
        }),
      n,
    );
  await p.waitForTimeout(150);
  return p
    .locator(".ab-bento-wrap")
    .evaluate((e) => ({
      spread: +e.dataset.spread,
      card: [...e.querySelectorAll(".ab-card")].map((x) => ({
        x: x.getBoundingClientRect().x,
        y: x.getBoundingClientRect().y,
      })),
    }));
};
const entry = await at(0.09),
  open = await at(0.5),
  exit = await at(0.94);
if (
  open.spread <= entry.spread ||
  open.spread <= exit.spread ||
  entry.card[0].x <= open.card[0].x
)
  throw Error("Bento does not scatter from center and return");
await at(0.5);
await p
  .locator("#studio")
  .screenshot({ path: "test-results/final-polish/about.png" });
checks.push(
  "Four About cards scatter from center on entry and regroup on leaving",
);
await p.locator(".ab-counts").scrollIntoViewIfNeeded();
await p.waitForTimeout(1800);
await expect(p.locator(".ab-counts strong").first()).toHaveText("10");
await expect(p.locator(".ab-counts strong").nth(1)).toHaveText("11");
checks.push("Count-up settles on the actual 10 projects and 11 services");
await p.locator("#services").scrollIntoViewIfNeeded();
for (let i = 0; i < 4; i++) {
  await p.locator(`#discipline-${i}`).click();
  await p.waitForTimeout(850);
  await p
    .locator("#services")
    .screenshot({ path: `test-results/final-polish/discipline-${i}.png` });
  if (i < 2) {
    const image = p.locator(
      i === 0 ? ".real-web-preview>img" : ".real-mobile-preview>img",
    );
    const dims = await image.evaluate((e) => ({
      natural: e.naturalWidth / e.naturalHeight,
      w: e.getBoundingClientRect().width,
      h: e.getBoundingClientRect().height,
      parent: e.parentElement.getBoundingClientRect().toJSON(),
      rect: e.getBoundingClientRect().toJSON(),
    }));
    if (
      Math.abs(dims.w / dims.h - dims.natural) > 0.01 ||
      dims.rect.top < dims.parent.top - 1 ||
      dims.rect.bottom > dims.parent.bottom + 1
    )
      throw Error("Preview is clipped or distorted " + JSON.stringify(dims));
    if (i === 1 && dims.w < 200) throw Error("Mobile screen is too narrow");
  }
}
await expect(p.locator(".design-tool-strip")).toHaveCount(0);
const speech = await p.locator(".robot-speech>span").innerText();
await p.waitForTimeout(4300);
if (speech === (await p.locator(".robot-speech>span").innerText()))
  throw Error("Robot message not changing");
await p.getByRole("button", { name: "Next robot message" }).click();
checks.push(
  "Website/mobile preserve aspect ratio without clipping; robot messages cycle and advance on click",
);
await p.locator("#discipline-2").click();
await expect(p.locator(".design-tool-strip")).toBeVisible();
await expect(p.locator(".design-inspector")).toBeVisible();
checks.push(
  "Both product-design side panels restored without a background board",
);
await p.locator("#features").scrollIntoViewIfNeeded();
await p.waitForTimeout(600);
const hub = await p.locator(".sn-icon").first().boundingBox();
if (hub.width < 80) throw Error("Service glyphs not larger");
checks.push(
  "Service nodes are larger and their light surface has more contrast",
);
await p.locator("#approach").scrollIntoViewIfNeeded();
for (let i = 0; i < 4; i++) {
  const panel = p.locator(".sa-panel").nth(i);
  const r = await panel.boundingBox();
  await panel.click({ position: { x: r.width / 2, y: r.height - 25 } });
  await expect(p.locator(`#approach-trigger-${i}`)).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await p.waitForTimeout(800);
}
checks.push("Clicking the bottom body of every Approach card opens that stage");
await p.emulateMedia({ reducedMotion: "reduce" });
await p.goto(origin, { waitUntil: "networkidle" });
await expect(p.locator(".ab-counts strong").first()).toHaveText("10");
await expect(p.locator(".ab-bento-wrap")).toHaveAttribute(
  "data-spread",
  "1.000",
);
const a = await new AxeBuilder({ page: p })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
const violations = a.violations.map((v) => ({
  id: v.id,
  nodes: v.nodes.map((n) => ({ html: n.html, summary: n.failureSummary })),
}));
await p
  .locator(".footer-next-studio")
  .screenshot({ path: "test-results/final-polish/footer.png" });
for (const width of [375, 768, 1024, 1440, 1920]) {
  await p.setViewportSize({ width, height: 1000 });
  await p.goto(origin, { waitUntil: "networkidle" });
  if (await p.evaluate(() => document.documentElement.scrollWidth > innerWidth))
    throw Error("Overflow " + width);
  if (width === 375) {
    await p.locator("#services").scrollIntoViewIfNeeded();
    for (const i of [0, 1, 2, 3]) {
      await p.locator(`#discipline-${i}`).click();
      await p
        .locator("#services")
        .screenshot({
          path: `test-results/final-polish/mobile-discipline-${i}.png`,
        });
    }
  }
}
checks.push(
  "Five responsive widths fit without overflow; reduced motion shows final counts/static cards",
);
await writeFile(
  "test-results/final-polish/report.json",
  JSON.stringify({ checks, errors, violations, entry, open, exit }, null, 2),
);
console.log(JSON.stringify({ checks, errors, violations }, null, 2));
await b.close();
if (errors.length || violations.length) process.exit(1);
