import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const cdp = await context.newCDPSession(page);
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
await page.goto(process.env.TEST_URL ?? "http://localhost:3000", {
  waitUntil: "networkidle",
});
await page.waitForTimeout(2000);
await page.evaluate(() => {
  window.__scrollAudit = { frames: [], tasks: [], running: true };
  let last = performance.now();
  const frame = (time) => {
    if (!window.__scrollAudit.running) return;
    window.__scrollAudit.frames.push(time - last);
    last = time;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  const observer = new PerformanceObserver((entries) => {
    window.__scrollAudit.tasks.push(
      ...entries
        .getEntries()
        .map((e) => ({ start: e.startTime, duration: e.duration })),
    );
  });
  observer.observe({ type: "longtask", buffered: false });
  window.__scrollAudit.observer = observer;
});
for (let i = 0; i < 48; i++) {
  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(130);
}
const result = await page.evaluate(() => {
  const audit = window.__scrollAudit;
  audit.running = false;
  audit.observer.disconnect();
  const frames = audit.frames.filter((n) => n > 0);
  return {
    cpuThrottle: 4,
    frames: frames.length,
    meanFps: Math.round(
      1000 / (frames.reduce((a, b) => a + b, 0) / frames.length),
    ),
    framesOver20ms: frames.filter((n) => n > 20).length,
    framesOver50ms: frames.filter((n) => n > 50).length,
    longTasks: audit.tasks,
    maxTaskMs: Math.max(0, ...audit.tasks.map((t) => t.duration)),
  };
});
await writeFile(
  "test-results/scroll-audit.json",
  JSON.stringify(result, null, 2),
);
console.log(JSON.stringify(result, null, 2));
await browser.close();
