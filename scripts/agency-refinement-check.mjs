import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";
const origin = process.env.TEST_URL || "http://localhost:3000";
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 1000 } });
const p = await c.newPage();
const errors = [],
  checks = [];
p.on("pageerror", (e) => errors.push(e.message));
await mkdir("test-results/studio-final", { recursive: true });
await p.goto(origin, { waitUntil: "networkidle" });
await expect(
  p.locator(
    ".st-zoom-section,.st-integrations-section,.st-testimonials-section",
  ),
).toHaveCount(0);
await expect(p.locator("#studio")).toContainText("About DevsDen Tech");
checks.push("Requested sections removed; existing About and FAQ retained");
await expect(p.locator(".hero-glaze")).toHaveAttribute(
  "data-motion",
  "running",
);
const sample = () =>
  p.locator(".hero-glaze canvas").evaluate((e) => {
    const a = e.getContext("2d").getImageData(0, 0, e.width, e.height).data;
    let sum = 0;
    for (let i = 3; i < a.length; i += 97) sum = (sum + a[i]) % 100000007;
    return sum;
  });
const first = await sample();
await p.waitForTimeout(600);
if (first === (await sample())) throw Error("Hero canvas is static");
await p.screenshot({ path: "test-results/studio-final/hero.png" });
checks.push("Colorful hero light changes actual canvas pixels");
const seam = await p.locator(".st-logo-track").evaluate((e) => ({
  track: e.getBoundingClientRect().width,
  groups: [...e.children].map((e) => e.getBoundingClientRect().width),
  gap: getComputedStyle(e).gap,
}));
if (
  seam.groups.length !== 4 ||
  seam.groups.some((w) => Math.abs(w - seam.groups[0]) > 0.5) ||
  Math.abs(seam.track - seam.groups[0] * 4) > 1
)
  throw Error("Logo repeat seam mismatch " + JSON.stringify(seam));
checks.push("Four equal logo groups have no inter-group gap");
await expect(p.locator(".ab-card")).toHaveCount(4);
await expect(p.locator(".ab-counts>div")).toHaveCount(4);
checks.push(
  "Four illustrated About cards and four real catalog/team counts are displayed",
);
await p.locator("#services").scrollIntoViewIfNeeded();
for (let i = 0; i < 4; i++) {
  await p.locator(`#discipline-${i}`).click();
  await expect(p.locator("#discipline-panel")).toHaveAttribute(
    "aria-labelledby",
    `discipline-${i}`,
  );
}
await expect(p.locator(".robot-figure")).toBeVisible();
await expect(p.locator(".ag-preview-chrome")).toHaveCount(0);
await p.locator("#discipline-3").press("Home");
await expect(p.locator("#discipline-0")).toBeFocused();
await p.screenshot({ path: "test-results/studio-final/disciplines.png" });
checks.push(
  "All four discipline tabs, keyboard selection and workflow preview work",
);
await expect(p.locator(".ag-project")).toHaveCount(5);
const cards = p.locator(".ag-project");
const positions = [];
for (let i = 0; i < 5; i++) {
  const card = cards.nth(i);
  await card.evaluate((el) =>
    scrollTo({
      top: scrollY + el.getBoundingClientRect().top - 125,
      behavior: "instant",
    }),
  );
  await p.waitForTimeout(150);
  positions.push(
    await card.evaluate((e) => ({
      top: e.getBoundingClientRect().top,
      sticky: getComputedStyle(e).position,
    })),
  );
}
if (positions.some((x) => x.sticky !== "sticky"))
  throw Error("Project cards do not stick");
await p.locator(".ag-project-stack").evaluate((e) =>
  scrollTo({
    top:
      scrollY +
      e.getBoundingClientRect().top +
      e.children[0].getBoundingClientRect().height * 0.65,
    behavior: "instant",
  }),
);
await p.waitForTimeout(150);
const a = await cards.first().boundingBox(),
  d = await cards.nth(1).boundingBox();
if (a.y > 160 || d.y >= a.y + a.height)
  throw Error("Project cards did not overlap " + JSON.stringify({ a, d }));
await p.screenshot({ path: "test-results/studio-final/projects.png" });
checks.push("Five project cards stick and overlap as the next card rises");
for (const link of await p.locator(".ag-project-visual,.sn-node").all()) {
  const res = await c.request.get(origin + (await link.getAttribute("href")));
  if (!res.ok()) throw Error("Broken content link");
}
checks.push("Project and service cards link to substantive existing pages");
const scaleAt = async (n) => {
  await p.locator("#features").evaluate(
    (e, n) =>
      scrollTo({
        top: scrollY + e.getBoundingClientRect().top - innerHeight * n,
        behavior: "instant",
      }),
    n,
  );
  await p.waitForTimeout(150);
  return p
    .locator("#features")
    .evaluate((e) => +getComputedStyle(e).getPropertyValue("--service-scale"));
};
const small = await scaleAt(0.92),
  large = await scaleAt(0.25);
if (large <= small) throw Error("Service panel does not expand");
await expect(p.locator(".sn-node")).toHaveCount(11);
await p.screenshot({ path: "test-results/studio-final/services.png" });
checks.push("Eleven connected service nodes appear as the panel expands");
await expect(p.locator("#process")).toHaveCount(0);
await expect(p.locator("#services-menu")).toHaveCount(0);
await expect(p.locator(".st-hero .st-badge")).toHaveCount(0);
const marquee = await p.locator(".st-logo-marquee").boundingBox();
if (marquee.width > 1200 || marquee.x < 50)
  throw Error("Logo strip is not centered with side breathing room");
for (let i = 0; i < 11; i++) {
  await p.locator(".sn-node").nth(i).focus();
  await expect(p.locator(".sn-detail h3")).toHaveText(
    await p.locator(".sn-node strong").nth(i).innerText(),
  );
  await expect(p.locator(".sn-detail a")).toHaveAttribute(
    "href",
    await p.locator(".sn-node").nth(i).getAttribute("href"),
  );
}
await p.locator(".sn-node").first().press("Escape");
await expect(p.locator(".sn-detail")).toHaveCount(0);
checks.push(
  "Hub previews match all eleven service destinations and close with Escape",
);
await p.locator("#faq").scrollIntoViewIfNeeded();
const question = p.locator(".st-faq-question").nth(1);
const questionBox = await question.boundingBox();
await question.click({
  position: { x: questionBox.width - 15, y: questionBox.height / 2 },
});
await expect(p.locator(".st-faq-icon")).toHaveCount(0);
await expect(p.locator(".st-faq-question").nth(1)).toHaveAttribute(
  "aria-expanded",
  "true",
);
checks.push(
  "FAQ opens from the far edge of the full row, with plus icons removed",
);
await p.locator("#contact").scrollIntoViewIfNeeded();
await p.getByRole("button", { name: "Automation", exact: true }).click();
await p
  .locator("#project-message")
  .fill("I would like to automate a business workflow for our enquiries.");
await expect(p).toHaveURL(origin + "/");
await p.screenshot({ path: "test-results/studio-final/inline-form.png" });
await p.locator("#project-name").fill("Preview Tester");
await p.locator("#project-email").fill("test@example.com");
await p.getByRole("button", { name: "Send my project" }).click();
await expect(p.locator(".email-draft")).toContainText(
  "Nothing has been sent yet",
);
checks.push("Homepage form validates the brief in place without a redirect");
await p.emulateMedia({ reducedMotion: "reduce" });
await p.goto(origin, { waitUntil: "networkidle" });
await expect(p.locator(".hero-glaze")).toHaveAttribute("data-motion", "paused");
await expect(p.locator(".st-logo-track")).toHaveCSS("animation-name", "none");
await expect(cards.first()).toHaveCSS("position", "relative");
checks.push(
  "Reduced motion presents static light, logos and a readable project list",
);
const axe = await new AxeBuilder({ page: p })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
const violations = axe.violations.map((v) => ({
  id: v.id,
  nodes: v.nodes.map((n) => ({ html: n.html, summary: n.failureSummary })),
}));
for (const width of [375, 768, 1024, 1440, 1920]) {
  await p.setViewportSize({ width, height: 1000 });
  await p.goto(origin, { waitUntil: "networkidle" });
  if (await p.evaluate(() => document.documentElement.scrollWidth > innerWidth))
    throw Error("Overflow " + width);
  await p.screenshot({
    path: `test-results/studio-final/full-${width}.png`,
    fullPage: true,
  });
}
checks.push("No horizontal overflow at five responsive widths");
const manifest = JSON.parse(
  await readFile(".next/prerender-manifest.json", "utf8"),
);
let routes = 0;
for (const route of Object.keys(manifest.routes).filter(
  (r) => !r.startsWith("/_") && !r.includes(".") && !r.includes("opengraph"),
)) {
  const res = await c.request.get(origin + route);
  if (!res.ok()) throw Error("Bad route " + route);
  routes++;
}
checks.push(`${routes} content routes return successfully`);
await writeFile(
  "test-results/studio-final/report.json",
  JSON.stringify(
    { checks, errors, violations, seam, scale: { small, large }, positions },
    null,
    2,
  ),
);
console.log(
  JSON.stringify(
    { checks, errors, violations, seam, scale: { small, large }, positions },
    null,
    2,
  ),
);
await b.close();
if (errors.length || violations.length) process.exit(1);
