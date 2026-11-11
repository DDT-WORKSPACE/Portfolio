import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
const b = await chromium.launch();
const c = await b.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const p = await c.newPage();
const origin = process.env.TEST_URL || "http://localhost:3002";
const checks = [],
  errors = [];
p.on("pageerror", (e) => errors.push(e.message));
await mkdir("test-results/project-directory", { recursive: true });
await p.goto(origin, { waitUntil: "networkidle" });
const ids = await p
  .locator(".studio-home-light>section")
  .evaluateAll((es) => es.map((e) => e.id));
const requested = [
  "studio",
  "features",
  "integrations",
  "projects",
  "services",
  "approach",
  "faq",
];
if (JSON.stringify(ids.slice(1, 8)) !== JSON.stringify(requested))
  throw Error("Wrong section order " + ids);
checks.push(
  "Homepage order: About, Services, Integrations, Selected works, Disciplines, Approach, FAQ",
);
await p.goto(origin + "/work", { waitUntil: "networkidle" });
await expect(p.locator(".pd-card")).toHaveCount(10);
await p.screenshot({ path: "test-results/project-directory/desktop-top.png" });
await p
  .locator(".project-directory")
  .screenshot({
    path: "test-results/project-directory/projects.png",
    style: "header{visibility:hidden!important}",
  });
const initial = await p
  .locator(".pd-card")
  .evaluateAll((es) =>
    es.map((e) => ({
      w: e.getBoundingClientRect().width,
      x: e.getBoundingClientRect().x,
      y: e.getBoundingClientRect().y,
    })),
  );
if (Math.abs(initial[0].w - initial[1].w) > 1 || initial[0].y !== initial[1].y)
  throw Error("Uneven project cards");
checks.push("All ten projects use a consistent two-column grid");
const filters = p.locator(".pd-filters button");
const counts = {};
for (const f of await filters.all()) {
  await f.click();
  const name = (await f.innerText()).split("\n")[0];
  const count = await f.locator("span").innerText();
  await expect(p.locator(".pd-card")).toHaveCount(+count);
  counts[name] = +count;
}
await p.getByRole("button", { name: /All projects/ }).click();
await p.getByRole("searchbox", { name: "Search projects" }).fill("renbite");
await expect(p.locator(".pd-card")).toHaveCount(1);
await expect(p.locator(".pd-card h3")).toContainText("Renbite");
await p
  .getByRole("searchbox", { name: "Search projects" })
  .fill("does-not-exist");
await expect(p.locator(".pd-empty")).toBeVisible();
await p.getByRole("button", { name: "Show all projects" }).click();
await expect(p.locator(".pd-card")).toHaveCount(10);
checks.push(
  "Industry counts, name search, empty state and reset behave correctly",
);
for (const link of await p.locator(".pd-card").all()) {
  const href = await link.getAttribute("href");
  if (!(await c.request.get(origin + href)).ok())
    throw Error("Bad case study " + href);
}
checks.push("Every project card opens an existing case study");
const axe = await new AxeBuilder({ page: p })
  .include(".project-directory")
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
const violations = axe.violations.map((v) => ({
  id: v.id,
  nodes: v.nodes.map((n) => ({ html: n.html, summary: n.failureSummary })),
}));
for (const width of [375, 768, 1024, 1440, 1920]) {
  await p.setViewportSize({ width, height: 1000 });
  await p.goto(origin + "/work", { waitUntil: "networkidle" });
  if (await p.evaluate(() => document.documentElement.scrollWidth > innerWidth))
    throw Error("Overflow " + width);
  const links = await p
    .locator(".pd-card")
    .evaluateAll((es) =>
      es
        .slice(0, 2)
        .map((e) => ({
          x: e.getBoundingClientRect().x,
          y: e.getBoundingClientRect().y,
        })),
    );
  if (width === 375 && links[1].y <= links[0].y)
    throw Error("Mobile grid not stacked");
  await p.screenshot({
    path: `test-results/project-directory/${width}.png`,
    fullPage: true,
  });
}
checks.push(
  "Project directory fits five responsive widths and stacks on mobile",
);
await writeFile(
  "test-results/project-directory/report.json",
  JSON.stringify({ checks, errors, violations, counts, ids }, null, 2),
);
console.log(
  JSON.stringify({ checks, errors, violations, counts, ids }, null, 2),
);
await b.close();
if (errors.length || violations.length) process.exit(1);
