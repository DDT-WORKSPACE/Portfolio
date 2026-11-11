import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("test-results", { recursive: true });
const browser = await chromium.launch();
const errors = [],
  checks = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on("pageerror", (e) => errors.push(e.message));
const origin = process.env.TEST_URL ?? "http://localhost:3000";
await page.goto(origin, { waitUntil: "networkidle" });
await expect(page.locator("h1")).toHaveText(/Built to move you forward/);
await expect(page.locator(".st-hero-description")).toContainText(
  "Websites, mobile apps and AI-powered workflows",
);
await page.screenshot({ path: "test-results/hero-1440.png" });
await page.locator("#services").scrollIntoViewIfNeeded();
await expect(page.locator(".st-offer")).toHaveCount(4);
await expect(page.locator(".offer-automation")).toHaveAttribute(
  "href",
  "/services/ai-automation",
);
checks.push("Focused hero and four clearly linked illustrated services");
await page.locator("#faq").scrollIntoViewIfNeeded();
await page.locator(".st-faq-list summary").first().click();
await expect(page.locator(".st-faq-list details").first()).toHaveAttribute(
  "open",
  "",
);
checks.push("FAQ disclosure");
await page.goto(origin + "/contact", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Send my project" }).click();
await expect(page.getByText("Please enter your name.")).toBeVisible();
await page.locator("#project-name").fill("Preview Tester");
await page.locator("#project-email").fill("test@example.com");
await page.getByRole("button", { name: "Web", exact: true }).click();
await page
  .locator("#project-message")
  .fill("A real validation check of the studio project form.");
await page.getByRole("button", { name: "Send my project" }).click();
await expect(page.locator(".email-draft")).toContainText(
  "Nothing has been sent yet",
);
await expect(
  page.getByRole("link", { name: "Continue in Gmail" }),
).toHaveAttribute("href", /to=devsdevtech%40gmail.com/);
await expect(page.locator(".form-success")).toHaveCount(0);
checks.push("Form validation and honest email-draft handoff");
await page.goto(origin + "/work", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Fintech", exact: true }).click();
await expect(page.locator(".work-card")).toHaveCount(2);
checks.push("Work industry filter");
for (const route of [
  "/services",
  "/services/ai-automation",
  "/work/talentbadger",
  "/industries/healthcare",
  "/about",
  "/blog",
  "/blog/ai-that-earns-its-place",
  "/legal/privacy",
  "/legal/terms",
  "/not-a-page",
]) {
  const res = await page.goto(origin + route, { waitUntil: "networkidle" });
  if (res.status() !== (route === "/not-a-page" ? 404 : 200))
    throw new Error(`Bad route ${route}: ${res.status()}`);
  checks.push(`Route ${route}`);
}
for (const width of [375, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "networkidle" });
  await page.addStyleTag({
    content: ".section{content-visibility:visible!important}",
  });
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 750) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
  await page.evaluate(async () => {
    await Promise.all(
      [...document.images].map(async (image) => {
        image.loading = "eager";
        try {
          await image.decode();
        } catch {
          throw new Error("Image failed to decode: " + image.currentSrc);
        }
      }),
    );
  });
  const overflow = await page.evaluate(() => ({
    viewport: innerWidth,
    body: document.documentElement.scrollWidth,
  }));
  if (overflow.body > width)
    throw new Error(`Horizontal overflow ${width}: ${overflow.body}`);
  await page.screenshot({
    path: `test-results/full-${width}.png`,
    fullPage: true,
  });
  checks.push(`Full-page review ${width}px: no horizontal overflow`);
}
await page.setViewportSize({ width: 375, height: 812 });
await page.goto(origin, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Open menu" }).click();
await expect(page.locator(".mobile-menu")).toBeVisible();
await page
  .locator(".mobile-menu")
  .getByRole("link", { name: "Work", exact: true })
  .click();
await expect(page).toHaveURL(origin + "/work");
await expect(page.locator(".mobile-menu")).toHaveCount(0);
checks.push("Mobile navigation");
await page.goto(origin, { waitUntil: "networkidle" });
await page.locator("#services").scrollIntoViewIfNeeded();
await expect(page.locator(".st-offer")).toHaveCount(4);
await expect(page.locator(".offer-mobile")).toHaveAttribute(
  "href",
  "/services/mobile-apps",
);
checks.push("Mobile illustrated services");
await writeFile(
  "test-results/browser-report.json",
  JSON.stringify({ checks, errors }, null, 2),
);
console.log(JSON.stringify({ checks, errors }, null, 2));
await browser.close();
if (errors.length) process.exit(1);
