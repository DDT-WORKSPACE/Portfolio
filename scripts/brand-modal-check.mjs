// Checks the Start a project panel: opens from the hero, builds the email links, closes on Escape.
//   TEST_URL=http://localhost:3210 node scripts/brand-modal-check.mjs <outDir>
import { chromium } from "@playwright/test";
const base = process.env.TEST_URL ?? "http://localhost:3000";
const out = process.argv[2] ?? "test-results/brand-modal";
const browser = await chromium.launch();
const results = [];
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.locator(".dd-hero-actions button", { hasText: "Start a project" }).click();
  const dialog = page.getByRole("dialog", { name: "Start a project" });
  await dialog.waitFor();
  await dialog.getByLabel("Your name").fill("Test Person");
  await dialog.getByRole("button", { name: "Mobile app" }).click();
  await dialog.getByLabel("About the project").fill("A booking app for our clinic.");
  const gmail = await dialog.getByRole("link", { name: /Send with Gmail/ }).getAttribute("href");
  const mailto = await dialog.getByRole("link", { name: /Use my email app/ }).getAttribute("href");
  await page.screenshot({ path: `${out}/modal-${width}.png` });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  const closed = (await page.getByRole("dialog").count()) === 0;
  results.push({
    width,
    gmailHasRecipient: gmail.includes("to=devsdevtech%40gmail.com"),
    gmailHasBody: decodeURIComponent(gmail).includes("A booking app for our clinic."),
    mailtoHasSubject: decodeURIComponent(mailto).includes("New project enquiry: Mobile app"),
    closedOnEscape: closed,
  });
  await page.close();
}
console.log(JSON.stringify(results, null, 1));
await browser.close();
