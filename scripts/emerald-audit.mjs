// Finds leftover brand blue/orange in the Emerald & gold theme.
// Loads each route with the emerald theme, then lists elements whose computed colours are
// still a saturated blue or orange, plus branded images that have no emerald copy showing.
// OFF_PALETTE=1 also lists any other saturated hue that is neither teal-green nor gold.
//   TEST_URL=http://localhost:3210 node scripts/emerald-audit.mjs
import { chromium } from "@playwright/test";
const base = process.env.TEST_URL ?? "http://localhost:3000";
const routes = (process.argv[2] ?? "/").split(",");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
if (process.env.AUDIT_THEME !== "brand") await page.addInitScript(() => localStorage.setItem("dd-theme", "emerald"));
let total = 0;
for (const route of routes) {
  await page.goto(base + route, { waitUntil: "networkidle" });
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 700) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(800);
  if (process.env.OFF_PALETTE) await page.evaluate(() => (window.__offPalette = true));
  const found = await page.evaluate(() => {
    const hsl = (r, g, b) => {
      r /= 255; g /= 255; b /= 255;
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
      if (!d) return [0, 0, l];
      const s = d / (1 - Math.abs(2 * l - 1));
      let hh = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
      return [(hh * 60 + 360) % 360, s, l];
    };
    const bad = (str) => {
      const out = [];
      for (const m of str.matchAll(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/g)) {
        const a = m[4] === undefined ? 1 : +m[4];
        if (a < 0.12) continue;
        const [hh, s, l] = hsl(+m[1], +m[2], +m[3]);
        if (l > 0.94 || l < 0.06) continue;
        if (hh >= 200 && hh <= 255 && s > 0.45) out.push("blue " + m[0]);
        else if (hh >= 8 && hh <= 33 && s > 0.6) out.push("orange " + m[0]);
        else if (window.__offPalette && s > 0.4 && l > 0.12 && l < 0.9 && !(hh >= 150 && hh <= 200) && !(hh >= 33 && hh <= 52))
          out.push("off-palette " + m[0]);
      }
      return out;
    };
    const props = ["color", "backgroundColor", "backgroundImage", "borderTopColor", "borderBottomColor", "borderLeftColor", "boxShadow", "fill", "stroke", "outlineColor", "textShadow", "stopColor"];
    const hits = new Map();
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden";
    };
    const check = (el, pseudo) => {
      const cs = getComputedStyle(el, pseudo);
      if (pseudo && (cs.content === "none" || cs.content === "normal")) return;
      for (const p of props) {
        if (p === "borderTopColor" && cs.borderTopWidth === "0px") continue;
        if (p === "borderBottomColor" && cs.borderBottomWidth === "0px") continue;
        if (p === "borderLeftColor" && cs.borderLeftWidth === "0px") continue;
        if (p === "outlineColor" && cs.outlineStyle === "none") continue;
        if ((p === "fill" || p === "stroke" || p === "stopColor") && !(el instanceof SVGElement)) continue;
        for (const b of bad(cs[p] || "")) {
          const cls = typeof el.className === "string" ? el.className : el.getAttribute("class") || "";
          const key = `${el.tagName.toLowerCase()}.${cls.trim().split(/\s+/).slice(0, 2).join(".")}${pseudo || ""} ${p}: ${b}`;
          hits.set(key, (hits.get(key) || 0) + 1);
        }
      }
    };
    for (const el of document.querySelectorAll("body *")) {
      if (el.closest(".dd-theme-switch") || el.closest("nextjs-portal")) continue;
      if (!(el instanceof SVGElement && el.tagName === "stop") && !visible(el)) continue;
      check(el);
      check(el, "::before");
      check(el, "::after");
    }
    const imgs = [...document.querySelectorAll("img")]
      .filter((i) => visible(i) && /\/(Projects\/brand|artwork\/[a-z-]+v2|artwork\/industry-phone|Logo\/logo\.png|service-atlas\.webp)/.test(decodeURIComponent(i.currentSrc || i.src)) && !/emerald/.test(decodeURIComponent(i.currentSrc || i.src)))
      .map((i) => "IMG " + decodeURIComponent(i.currentSrc || i.src).replace(/^.*?url=/, "").slice(0, 80));
    return [...[...hits].map(([k, n]) => `${n}x ${k}`), ...imgs];
  });
  total += found.length;
  console.log(`\n# ${route} (${found.length})`);
  found.slice(0, 40).forEach((f) => console.log("  " + f));
}
console.log(`\nTOTAL ${total}`);
await browser.close();
