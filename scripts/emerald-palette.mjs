// Shared colour mapping for the "Emerald & gold" theme (from the DDT Figma file).
// Brand blue -> deep teal-green, brand orange -> gold, navy/night -> deep green.
// Neutrals (white, black, greys) are left alone; low-saturation blue-greys only rotate hue.
//
// Figma reference: deep #062121, teal #1F4C4C, gold #876215, dark gold #4A350B, page #F3F5F6.

const wrap = (h) => ((h % 360) + 360) % 360;
const hueDiff = (a, b) => {
  const d = wrap(a - b);
  return d > 180 ? d - 360 : d;
};
const smooth = (e0, e1, x) => {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};
const mix = (a, b, t) => a + (b - a) * t;

export function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const mx = Math.max(r, g, b),
    mn = Math.min(r, g, b),
    l = (mx + mn) / 2,
    d = mx - mn;
  let h = 0,
    s = 0;
  if (d > 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (mx === r) h = ((g - b) / d) % 6;
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = wrap(h * 60);
  }
  return [h, Math.min(1, s), l];
}
export function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2;
  const [r, g, b] =
    h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

export const GREEN_HUE = 177;
export const GOLD_HUE = 40;

// Lightness curves: mid blues become deep teal, mid oranges become warm gold.
export const greenL = (l) => (l < 0.5 ? l * (1.2 - 1.4 * l) : 0.25 + (l - 0.5) * 1.5);
export const goldL = (l) => (l < 0.5 ? l * 0.74 : 0.37 + (l - 0.5) * 1.26);

// opts.warmWide: also pull magenta/pink reflections (3D renders) into gold. Off for CSS so
// error reds and other UI hues are never touched.
export function mapHsl(h, s, l, opts = {}) {
  const blueW = 1 - smooth(45, 70, Math.abs(hueDiff(h, 218)));
  let orangeW = 1 - smooth(18, 34, Math.abs(hueDiff(h, 28)));
  if (opts.warmWide) orangeW = Math.max(orangeW, 1 - smooth(42, 58, Math.abs(hueDiff(h, 328))));
  if (s === 0 || (blueW <= 0 && orangeW <= 0)) return [h, s, l];
  const sw = smooth(0.18, 0.45, s); // only clearly coloured tones get the lightness shift
  if (blueW >= orangeW) {
    const th = wrap(GREEN_HUE + hueDiff(h, 218) * 0.12);
    const sf = mix(0.82, 0.5, smooth(0.15, 0.45, l));
    // Very light tints (page surfaces) stay close to Figma's clean neutral #F3F5F6.
    const ts = s * mix(0.6, sf, sw) * mix(1, 0.38, smooth(0.86, 0.97, l));
    const tl = mix(l, greenL(l), sw);
    return [wrap(h + hueDiff(th, h) * blueW), mix(s, ts, blueW), mix(l, tl, blueW)];
  }
  const near = Math.abs(hueDiff(h, 28)) < 40;
  const th = wrap(GOLD_HUE + (near ? hueDiff(h, 28) * 0.3 : 0));
  const ts = s * mix(0.7, 0.76, sw);
  const tl = mix(l, goldL(l), sw);
  return [wrap(h + hueDiff(th, h) * orangeW), mix(s, ts, orangeW), mix(l, tl, orangeW)];
}

export function mapRgb(r, g, b, opts) {
  const [h, s, l] = rgbToHsl(r, g, b);
  const [h2, s2, l2] = mapHsl(h, s, l, opts);
  return hslToRgb(h2, s2, l2).map((v) => Math.max(0, Math.min(255, Math.round(v))));
}

const hex2 = (v) => v.toString(16).padStart(2, "0");
export function mapHex(hex) {
  let x = hex.replace("#", "");
  if (x.length === 3 || x.length === 4) x = [...x].map((c) => c + c).join("");
  const a = x.length === 8 ? x.slice(6) : "";
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16));
  const [R, G, B] = mapRgb(r, g, b);
  return `#${hex2(R)}${hex2(G)}${hex2(B)}${a}`;
}
