import { chromium, expect } from "@playwright/test";
import { writeFile, mkdir } from "node:fs/promises";
const origin = process.env.TEST_URL || "http://localhost:3000";
const b = await chromium.launch();
const c = await b.newContext({
  viewport: { width: 375, height: 812 },
  isMobile: true,
  hasTouch: true,
});
const p = await c.newPage();
const errors = [];
p.on("pageerror", (e) => errors.push(e.message));
await p.goto(origin, { waitUntil: "networkidle" });
await mkdir("test-results/studio-final", { recursive: true });
await p.getByRole("button", { name: "Open menu" }).tap();
await expect(p.locator(".mobile-menu")).toBeVisible();
await p.getByRole("button", { name: "Close menu" }).tap();
await p.locator("#services").scrollIntoViewIfNeeded();
await p.locator("#discipline-1").tap();
await expect(p.locator(".real-mobile-preview img")).toBeVisible();
await p
  .locator("#services")
  .screenshot({ path: "test-results/studio-final/mobile-discipline.png" });
await p.locator("#features").scrollIntoViewIfNeeded();
await p.locator(".sn-node").first().tap();
await expect(p.locator(".sn-detail")).toBeVisible();
await expect(p).toHaveURL(origin + "/");
await p.screenshot({ path: "test-results/studio-final/mobile-network.png" });
await p.getByRole("button", { name: "Close service preview" }).tap();
await p.locator("#contact").scrollIntoViewIfNeeded();
await p.locator("#project-name").fill("Mobile Preview");
await p.locator("#project-email").fill("preview@example.com");
await p.getByRole("button", { name: "Mobile", exact: true }).tap();
await p
  .locator("#project-message")
  .fill("We would like to discuss a new mobile application.");
await p.getByRole("button", { name: "Send my project" }).tap();
await expect(p.locator(".email-draft")).toContainText(
  "Nothing has been sent yet",
);
await expect(p).toHaveURL(origin + "/");
await p
  .locator("#contact")
  .screenshot({ path: "test-results/studio-final/mobile-form.png" });
await writeFile(
  "test-results/studio-final/mobile.json",
  JSON.stringify(
    {
      menu: true,
      realScreen: true,
      tapPreview: true,
      inlineForm: true,
      errors,
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify({
    menu: true,
    realScreen: true,
    tapPreview: true,
    inlineForm: true,
    errors,
  }),
);
await b.close();
if (errors.length) process.exit(1);
