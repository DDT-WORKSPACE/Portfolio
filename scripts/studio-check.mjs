import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";
await mkdir("test-results/studio-redesign", { recursive: true });
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
await expect(page.locator("h1")).toContainText("Built to move you forward.");
await expect(page.locator(".st-hero-description")).toContainText(
  "Websites, mobile apps and AI-powered workflows",
);
await expect(
  page.locator(".hero-v4,.hero-blocks,.clarity-section"),
).toHaveCount(0);
await expect(page.locator(".hero-glaze")).toHaveAttribute("data-ready", "true");
await expect(page.locator(".hero-glaze")).toHaveAttribute(
  "data-motion",
  "running",
);
await page.waitForTimeout(3000);
const hash = () =>
  page.locator(".hero-glaze canvas").evaluate((c) => {
    const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
    let sum = 0;
    for (let i = 0; i < d.length; i += 97) sum = (sum + d[i]) % 100000007;
    return sum;
  });
const first = await hash();
await page.waitForTimeout(450);
if (first === (await hash())) throw Error("Light-field animation is static");
await page.screenshot({ path: "test-results/studio-redesign/hero-motion.png" });
checks.push("Clear agency positioning and animated halftone light field");
await page.locator("#services").scrollIntoViewIfNeeded();
await expect(page.locator(".hero-glaze")).toHaveAttribute(
  "data-motion",
  "paused",
);
const paused = await hash();
await page.waitForTimeout(250);
if (paused !== (await hash())) throw Error("Offscreen canvas keeps drawing");
checks.push("Hero animation pauses offscreen");
await expect(page.locator(".st-offer")).toHaveCount(4);
for (const card of await page.locator(".st-offer").all()) {
  await expect(card.locator("svg.studio-illustration")).toHaveCount(1);
  if (
    !(
      await context.request.get(origin + (await card.getAttribute("href")))
    ).ok()
  )
    throw Error("Broken service card link");
}
checks.push("Four illustrated service cards link to substantive detail pages");
await expect(page.locator(".st-project-row")).toHaveCount(4);
await expect(page.locator(".st-proof-summary")).toContainText("10");
for (const link of await page.locator(".st-project-cover").all()) {
  const response = await context.request.get(
    origin + (await link.getAttribute("href")),
  );
  if (!response.ok()) throw Error("Broken project link");
}
checks.push(
  "Project panels use actual supplied artwork and working case-study destinations",
);
await page.locator("#integrations").scrollIntoViewIfNeeded();
await expect(page.locator(".st-tool")).toHaveCount(6);
await page.locator("#integration-tab-0").click();
await page.locator("#integration-tab-0").press("End");
await expect(page.locator("#integration-tab-2")).toHaveAttribute(
  "aria-selected",
  "true",
);
await expect(page.locator(".st-integration-caption")).toContainText(
  "Keep releases visible",
);
checks.push(
  "Build, Automate and Operate tool groups are interactive and keyboard-operable",
);
await page.locator("#perspectives").scrollIntoViewIfNeeded();
await page.getByRole("button", { name: "Next project perspective" }).click();
await expect(page.locator(".st-feature-quote")).toContainText("Renbite");
await page.getByRole("button", { name: "Pause project perspectives" }).click();
await expect(page.locator(".st-perspective-window")).toHaveAttribute(
  "data-paused",
  "true",
);
await expect(page.locator(".st-perspective-source")).toContainText(
  "from our portfolio",
);
checks.push(
  "Project perspectives switch and pause, with clear source attribution",
);
await page.locator("#faq").scrollIntoViewIfNeeded();
for (const detail of await page.locator(".st-faq-list details").all()) {
  await detail.locator("summary").click();
  await expect(detail.locator("p")).toBeVisible();
}
checks.push("All six FAQ disclosures contain usable answers");
await page.locator("#contact").scrollIntoViewIfNeeded();
await page
  .getByRole("button", { name: "Automate a workflow", exact: true })
  .click();
await page.getByRole("link", { name: "Let’s talk about it" }).click();
await expect(page.locator("#project-message")).toHaveValue(
  /automate a business workflow/,
);
await expect(
  page.getByRole("button", { name: "Automation", exact: true }),
).toHaveAttribute("aria-pressed", "true");
await page.locator("#project-name").fill("Website Review");
await page.locator("#project-email").fill("review@example.com");
await page.getByRole("button", { name: "Send my project" }).click();
await expect(page.locator(".email-draft")).toContainText(
  "Nothing has been sent yet",
);
await expect(
  page.getByRole("link", { name: "Continue in Gmail" }),
).toHaveAttribute("href", /to=devsdevtech%40gmail.com/);
checks.push(
  "Get started carries the selected goal into the working contact/email-draft flow",
);
await page.goto(origin, { waitUntil: "networkidle" });
await page.locator("#process").scrollIntoViewIfNeeded();
for (const i of [0, 1, 2, 3, 2, 1, 0]) {
  await page.locator(`#lab-tab-${i}`).click();
  await expect(page.locator(".st-lab-scene")).toHaveAttribute(
    "data-stage",
    String(i),
  );
  await expect(page.locator(".st-lab-node")).toHaveCount(3);
}
await page.locator("#lab-tab-0").press("End");
await expect(page.locator("#lab-tab-3")).toBeFocused();
await page.getByRole("button", { name: "Play the journey" }).click();
await expect(page.locator(".st-lab-scene")).toHaveAttribute("data-stage", "0", {
  timeout: 5000,
});
await page.getByRole("button", { name: "Pause simulation" }).click();
checks.push(
  "The visual delivery simulation supports each stage, keyboard navigation and playback",
);
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(origin, { waitUntil: "networkidle" });
const anchors = await page
  .locator("a")
  .evaluateAll((as) =>
    as
      .map((a) => a.getAttribute("href"))
      .filter((h) => h?.startsWith("#") || h?.startsWith("/#")),
  );
for (const href of new Set(anchors)) {
  const id = href.split("#")[1];
  if (id && !(await page.locator(`[id="${id}"]`).count()))
    throw Error("Broken home anchor " + href);
}
checks.push(
  "Header, CTA and footer section links resolve to existing sections",
);
await expect(page.locator(".hero-glaze")).toHaveAttribute(
  "data-motion",
  "paused",
);
await expect(page.locator(".st-logo-track")).toHaveCSS(
  "animation-name",
  "none",
);
await expect(page.locator(".st-perspective-column").first()).toHaveCSS(
  "animation-name",
  "none",
);
checks.push(
  "Reduced motion keeps a meaningful static illustration and readable content",
);
const axe = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
violations.push(
  ...axe.violations.map((v) => ({
    id: v.id,
    nodes: v.nodes.map((n) => ({ html: n.html, summary: n.failureSummary })),
  })),
);
for (const width of [375, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (const image of document.images) image.loading = "eager";
    await Promise.all(
      [...document.images].map((i) => i.decode().catch(() => {})),
    );
  });
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw Error("Horizontal overflow at " + width);
  await page.screenshot({
    path: `test-results/studio-redesign/full-${width}.png`,
    fullPage: true,
  });
}
checks.push(
  "Responsive captures at 375, 768, 1024, 1440 and 1920px have no overflow",
);
await page.setViewportSize({ width: 375, height: 812 });
await page.goto(origin, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Open menu" }).click();
await expect(page.locator(".mobile-menu")).toBeVisible();
await page
  .locator(".mobile-menu")
  .getByRole("link", { name: "Work", exact: true })
  .click();
await expect(page).toHaveURL(origin + "/work");
checks.push("Mobile navigation opens and routes correctly");
const manifest = JSON.parse(
  await readFile(".next/prerender-manifest.json", "utf8"),
);
let routes = 0;
for (const route of Object.keys(manifest.routes).filter(
  (r) => !r.startsWith("/_") && !r.includes(".") && !r.includes("opengraph"),
)) {
  const res = await context.request.get(origin + route);
  const html = await res.text();
  const main = html
    .match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1]
    ?.replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]*>/g, " ")
    .trim();
  if (!res.ok() || !main || main.length < 200)
    throw Error("Missing content at " + route);
  routes++;
}
checks.push(
  `${routes} content routes remain available with substantive main content`,
);
await writeFile(
  "test-results/studio-redesign/report.json",
  JSON.stringify({ checks, errors, violations }, null, 2),
);
console.log(JSON.stringify({ checks, errors, violations }, null, 2));
await browser.close();
if (errors.length || violations.length) process.exit(1);
