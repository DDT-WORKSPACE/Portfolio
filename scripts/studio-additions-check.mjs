import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 1000 } });
const p = await c.newPage();
const origin = process.env.TEST_URL || "http://localhost:3002";
const errors = [],
  checks = [];
p.on("pageerror", (e) => errors.push(e.message));
await mkdir("test-results/studio-final", { recursive: true });
await p.goto(origin, { waitUntil: "networkidle" });
await p.screenshot({ path: "test-results/studio-final/hero.png" });
for (const id of [
  "studio",
  "services",
  "integrations",
  "approach",
  "contact",
]) {
  await p.locator("#" + id).scrollIntoViewIfNeeded();
  await p.waitForTimeout(800);
  await p
    .locator("#" + id)
    .screenshot({ path: `test-results/studio-final/${id}.png` });
}
for (let i = 0; i < 4; i++) {
  await p.locator(`#approach-trigger-${i}`).click();
  await expect(p.locator(`#approach-trigger-${i}`)).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await p.waitForTimeout(800);
  const active = await p.locator(".sa-panel.is-open").boundingBox(),
    closed = await p.locator(".sa-panel:not(.is-open)").first().boundingBox();
  if (active.width < closed.width * 3)
    throw Error("Approach panel failed to expand");
}
checks.push("All four Approach panels expand with their corresponding details");
await p.locator("#features").scrollIntoViewIfNeeded();
await p.waitForTimeout(800);
const node = p.locator(".sn-node").nth(2);
await node.hover();
await expect(p.locator(".sn-detail")).toBeVisible();
const n = await node.boundingBox(),
  card = await p.locator(".sn-detail").boundingBox();
if (Math.abs(card.x - n.x) > 360 || card.x < 0 || card.x + card.width > 1440)
  throw Error("Preview is not beside its node or inside viewport");
await p.locator(".sn-detail").hover();
await p.waitForTimeout(250);
await expect(p.locator(".sn-detail")).toBeVisible();
const href = await p.locator(".sn-detail>a").getAttribute("href");
await p.locator(".sn-detail>a").click();
await expect(p).toHaveURL(origin + href);
checks.push(
  "Mouse-adjacent hub preview remains open while entering it and links to service details",
);
await p.goto(origin, { waitUntil: "networkidle" });
await p.locator("#contact").scrollIntoViewIfNeeded();
const copy = await p.locator(".contact-embedded .contact-copy").boundingBox(),
  form = await p.locator(".contact-embedded .contact-form-panel").boundingBox();
if (!(copy.x < form.x && Math.abs(copy.y - form.y) < 100))
  throw Error("Desktop contact is not split into two columns");
checks.push(
  "Desktop contact has explanatory copy left and the real form right",
);
for (const link of await p.locator(".si-tool").all()) {
  const url = await link.getAttribute("href");
  const response = await c.request.get(origin + url);
  if (
    !response.ok() ||
    !(await response.text()).includes("Access and boundaries")
  )
    throw Error("Missing substantive integration page " + url);
}
await expect(p.locator(".si-tool")).toHaveCount(10);
await p.goto(origin + "/integrations", { waitUntil: "networkidle" });
await expect(p.locator(".integration-directory>a")).toHaveCount(10);
checks.push(
  "Ten integration logos each link to substantive workflow/access detail pages and directory",
);
for (const slug of [
  "talentbadger",
  "renbite",
  "ffp-vault",
  "besttrip",
  "crypto-wallet",
]) {
  await p.goto(origin + "/work/" + slug, { waitUntil: "networkidle" });
  await expect(p.locator(".pe-journey>div")).toHaveCount(3);
  await expect(p.locator(".pe-details article")).toHaveCount(2);
}
checks.push(
  "Selected project detail pages include a product journey and two deeper design explanations",
);
await p.emulateMedia({ reducedMotion: "reduce" });
await p.goto(origin, { waitUntil: "networkidle" });
const a = await new AxeBuilder({ page: p })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
const violations = a.violations.map((v) => ({
  id: v.id,
  nodes: v.nodes.map((n) => ({ html: n.html, summary: n.failureSummary })),
}));
await p
  .locator(".footer-next-studio")
  .screenshot({ path: "test-results/studio-final/footer.png" });
await p.setViewportSize({ width: 375, height: 812 });
await p.goto(origin, { waitUntil: "networkidle" });
await p.locator("#approach").scrollIntoViewIfNeeded();
for (let i = 0; i < 4; i++) {
  await p.locator(`#approach-trigger-${i}`).click();
  await expect(p.locator(`#approach-trigger-${i}`)).toHaveAttribute(
    "aria-expanded",
    "true",
  );
}
await p
  .locator("#approach")
  .screenshot({ path: "test-results/studio-final/mobile-approach.png" });
const mobileCopy = await p
    .locator(".contact-embedded .contact-copy")
    .boundingBox(),
  mobileForm = await p
    .locator(".contact-embedded .contact-form-panel")
    .boundingBox();
if (!(mobileCopy.y < mobileForm.y)) throw Error("Mobile form order");
checks.push("Approach and split contact adapt to a single mobile column");
await writeFile(
  "test-results/studio-final/additions-report.json",
  JSON.stringify({ checks, errors, violations }, null, 2),
);
console.log(JSON.stringify({ checks, errors, violations }, null, 2));
await b.close();
if (errors.length || violations.length) process.exit(1);
