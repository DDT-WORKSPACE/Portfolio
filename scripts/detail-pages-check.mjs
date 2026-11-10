import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";
await mkdir("test-results/detail-pages", { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [],
  checks = [],
  violations = [];
page.on("pageerror", (e) => errors.push(e.message));
const origin = process.env.TEST_URL ?? "http://localhost:3002";
const services = [
  ...(await readFile("content/services.ts", "utf8")).matchAll(
    /slug: "([^"]+)"/g,
  ),
].map((m) => m[1]);
const starts = [
  "ai-agent-starter",
  "document-search",
  "mvp-launch",
  "commerce-launch",
];
for (const route of [
  ...services.map((s) => "/services/" + s),
  ...starts.map((s) => "/starting-points/" + s),
]) {
  const response = await page.goto(origin + route, {
    waitUntil: "networkidle",
  });
  if (response.status() !== 200) throw Error("Missing page " + route);
  await expect(page.locator("main")).not.toContainText(/\{\{[^}]+\}\}/);
  const text = await page.locator("main").innerText();
  if (text.split(/\s+/).length < 220) throw Error("Thin content on " + route);
  const tabs = page.getByRole("tab");
  await expect(tabs).toHaveCount(3);
  const first = await page.getByRole("tabpanel").innerText();
  await tabs.nth(2).click();
  if ((await page.getByRole("tabpanel").innerText()) === first)
    throw Error("Unchanging plan " + route);
  await tabs.nth(2).press("Home");
  await expect(tabs.nth(0)).toBeFocused();
  const checkbox = page.locator(".scope-options input").nth(2);
  await checkbox.check();
  await expect(page.locator(".scope-summary")).toContainText("3 priorities");
  const href = await page
    .getByRole("link", { name: "Discuss this scope" })
    .getAttribute("href");
  if (!new URL(href, origin).searchParams.get("brief")?.includes("- "))
    throw Error("Scope not passed to enquiry");
  await page.locator(".detail-faqs summary").first().click();
  await expect(page.locator(".detail-faqs details").first()).toHaveAttribute(
    "open",
    "",
  );
  await expect(
    page.locator(".detail-faqs details").first().locator("p"),
  ).toBeVisible();
  checks.push("Substantive content, interactive plan, scope and FAQ: " + route);
}
await page.goto(origin + "/services/web-development", {
  waitUntil: "networkidle",
});
await page.getByRole("link", { name: "Discuss this scope" }).click();
await expect(page.locator("#project-message")).toHaveValue(/Web development/);
await expect(
  page.getByRole("button", { name: "Web", exact: true }),
).toHaveAttribute("aria-pressed", "true");
await page.locator("#project-name").fill("Review Tester");
await page.locator("#project-email").fill("review@example.com");
await page.getByRole("button", { name: "Send my project" }).click();
await expect(page.locator(".email-draft")).toContainText(
  "Nothing has been sent yet",
);
const gmail = new URL(
  await page
    .getByRole("link", { name: "Continue in Gmail" })
    .getAttribute("href"),
);
if (
  gmail.searchParams.get("to") !== "devsdevtech@gmail.com" ||
  !gmail.searchParams.get("body").includes("Review Tester")
)
  throw Error("Invalid email handoff");
await expect(page.locator(".form-success")).toHaveCount(0);
checks.push(
  "Selected scope prefills the contact form and creates an honest Gmail draft with the correct recipient",
);
await page
  .locator(".contact-section")
  .screenshot({ path: "test-results/detail-pages/contact-desktop.png" });
await page
  .locator(".footer")
  .screenshot({ path: "test-results/detail-pages/footer-desktop.png" });
if ((await page.locator(".footer").boundingBox()).height > 550)
  throw Error("Footer still oversized");
checks.push("Desktop footer height is below 550px");
for (const route of [
  "/contact",
  "/services/ai-automation",
  "/starting-points/ai-agent-starter",
]) {
  await page.goto(origin + route, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: ".section{content-visibility:visible!important}",
  });
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  violations.push(
    ...axe.violations.map((v) => ({
      route,
      id: v.id,
      nodes: v.nodes.map((n) => n.failureSummary),
    })),
  );
  if (route.includes("services"))
    await page
      .locator("main")
      .screenshot({ path: "test-results/detail-pages/service-desktop.png" });
  if (route.includes("starting-points"))
    await page
      .locator("main")
      .screenshot({
        path: "test-results/detail-pages/starting-point-desktop.png",
      });
}
for (const width of [375, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  for (const route of [
    "/contact",
    "/services/web-development",
    "/starting-points/mvp-launch",
  ]) {
    await page.goto(origin + route, { waitUntil: "networkidle" });
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      )
    )
      throw Error("Overflow at " + width + " " + route);
    if (width === 375)
      await page.addStyleTag({
        content: ".section{content-visibility:visible!important}",
      });
    if (width === 375)
      await page.screenshot({
        path: `test-results/detail-pages/mobile-${route.split("/").at(-1)}.png`,
        fullPage: true,
      });
  }
}
checks.push("Contact and detail pages have no overflow at five widths");
const manifest = JSON.parse(
  await readFile(".next/prerender-manifest.json", "utf8"),
);
let audited = 0;
for (const route of Object.keys(manifest.routes).filter(
  (r) => !r.includes(".") && !r.includes("opengraph") && !r.startsWith("/_"),
)) {
  const response = await context.request.get(origin + route);
  const html = await response.text();
  const main = html
    .match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1]
    ?.replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!response.ok() || !main || main.length < 200)
    throw Error("Empty or failing route " + route);
  audited++;
}
checks.push(
  `${audited} generated content routes respond with substantive main content`,
);
await writeFile(
  "test-results/detail-pages/report.json",
  JSON.stringify({ checks, errors, violations }, null, 2),
);
console.log(JSON.stringify({ checks, errors, violations }, null, 2));
await browser.close();
if (errors.length || violations.length) process.exit(1);
