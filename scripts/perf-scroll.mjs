// Scroll smoothness check: scrolls a page with the mouse wheel while the CPU is slowed down,
// and reports frame timing (dropped frames, worst frames) plus long main-thread tasks.
//   TEST_URL=http://localhost:3220 node scripts/perf-scroll.mjs [/route] [cpuSlowdown=4]
// Uses the system Chrome (real GPU) when available, so numbers match what visitors see.
import { chromium } from "@playwright/test";
const base = process.env.TEST_URL ?? "http://localhost:3000";
const route = process.argv[2] ?? "/";
const slow = Number(process.argv[3] ?? 4);
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || undefined });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const cdp = await page.context().newCDPSession(page);
// SMOOTH=off measures native scrolling without the Lenis smooth-scroll engine.
if (process.env.SMOOTH === "off") await page.addInitScript(() => localStorage.setItem("dd-smooth", "off"));
await page.goto(base + route, { waitUntil: "networkidle" });
// Experiments: PERF_CSS injects a stylesheet before scrolling (to switch features off one by one).
if (process.env.PERF_CSS) await page.addStyleTag({ content: process.env.PERF_CSS });
await page.waitForTimeout(Number(process.env.SETTLE ?? 1500));
await cdp.send("Emulation.setCPUThrottlingRate", { rate: slow });
await page.evaluate(() => {
  window.__frames = [];
  window.__long = [];
  let last = performance.now();
  const tick = (t) => {
    window.__frames.push(t - last);
    last = t;
    if (window.__run) requestAnimationFrame(tick);
  };
  window.__run = true;
  requestAnimationFrame(tick);
  new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__long.push(Math.round(e.duration)))).observe({ type: "longtask", buffered: false });
});
await page.mouse.move(720, 450);
const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
for (let i = 0; i < 400; i++) {
  await page.mouse.wheel(0, 120);
  await page.waitForTimeout(16);
  if ((await page.evaluate(() => scrollY)) >= total - 5) break;
}
await page.waitForTimeout(800);
const r = await page.evaluate(() => {
  window.__run = false;
  const f = window.__frames.slice(2);
  const sorted = [...f].sort((a, b) => a - b);
  const pct = (p) => Math.round(sorted[Math.floor(sorted.length * p)] * 10) / 10;
  return {
    frames: f.length,
    avgFps: Math.round(1000 / (f.reduce((a, b) => a + b, 0) / f.length)),
    p50: pct(0.5),
    p95: pct(0.95),
    worst: Math.round(sorted[sorted.length - 1]),
    jank: f.filter((x) => x > 34).length,
    longTasks: window.__long.length,
    longestTask: Math.max(0, ...window.__long),
  };
});
console.log(route, `cpu x${slow}`, JSON.stringify(r));
await browser.close();
