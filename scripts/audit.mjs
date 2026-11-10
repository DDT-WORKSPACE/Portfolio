import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import lighthouse from "lighthouse";
import { mkdir, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
await mkdir("test-results", { recursive: true });
const browser = await chromium.launch({
  args: ["--remote-debugging-port=9222"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const scripts = [];
const jobs = [];
page.on("response", (r) => {
  if (r.request().resourceType() === "script")
    jobs.push(
      r
        .body()
        .then((buffer) =>
          scripts.push({
            url: r.url().split("/").at(-1),
            gzip: gzipSync(buffer).length,
          }),
        )
        .catch(() => {}),
    );
});
await page.goto(process.env.TEST_URL ?? "http://localhost:3000", {
  waitUntil: "networkidle",
});
await page.waitForTimeout(2200);
await Promise.all(jobs);
const axe = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
const violations = axe.violations.map((v) => ({
  id: v.id,
  impact: v.impact,
  description: v.description,
  nodes: v.nodes.map((n) => ({
    html: n.html,
    target: n.target,
    summary: n.failureSummary,
  })),
}));
await writeFile(
  "test-results/accessibility.json",
  JSON.stringify(violations, null, 2),
);
const audits = [];
for (const mobile of [false, true]) {
  const result = await lighthouse(
    process.env.TEST_URL ?? "http://localhost:3000",
    {
      port: 9222,
      output: "json",
      logLevel: "error",
      onlyCategories: ["performance", "accessibility"],
      ...(mobile
        ? {}
        : {
            formFactor: "desktop",
            screenEmulation: {
              mobile: false,
              width: 1440,
              height: 1000,
              deviceScaleFactor: 1,
              disabled: false,
            },
            throttling: {
              rttMs: 40,
              throughputKbps: 10240,
              cpuSlowdownMultiplier: 1,
            },
          }),
    },
  );
  await writeFile(
    `test-results/lighthouse-${mobile ? "mobile" : "desktop"}.json`,
    result.report,
  );
  const lhr = result.lhr;
  audits.push({
    device: mobile ? "mobile" : "desktop",
    performance: lhr.categories.performance.score,
    accessibility: lhr.categories.accessibility.score,
    LCP: lhr.audits["largest-contentful-paint"].numericValue,
    CLS: lhr.audits["cumulative-layout-shift"].numericValue,
    TBT: lhr.audits["total-blocking-time"].numericValue,
  });
}
const report = {
  scripts,
  gzipTotal: scripts.reduce((a, b) => a + b.gzip, 0),
  violations,
  audits,
};
await writeFile(
  "test-results/audit-summary.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
await browser.close();
