// Removes CSS rules that can never match on the live site.
// 1. Walks the import graph from every route file in app/ to find the modules actually in use
//    (older homepage components that are no longer mounted are ignored).
// 2. Collects every word in those files (class names, data-* names, ids, template prefixes).
// 3. Drops a selector when one of its class or id names appears nowhere in that code, and drops a
//    rule when all its selectors are gone. Classes inside :not()/:has()/:is()/:where() are ignored
//    (kept conservatively). Unused @keyframes are removed too.
//   node scripts/purge-css.mjs            report only
//   node scripts/purge-css.mjs --write    rewrite the stylesheets
import postcss from "postcss";
import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const FILES = ["app/globals.css", "app/experience.css", "app/refinements.css", "app/studio.css", "app/brand.css"];
// Class names added at runtime by libraries or plain DOM code.
const SAFE = [/^lenis/, /^pin-spacer/, /^nextjs/, /^__next/];

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else out.push(p);
  }
  return out;
}
async function exists(p) {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
}
async function resolve(from, spec) {
  let base;
  if (spec.startsWith("@/")) base = path.join(ROOT, spec.slice(2));
  else if (spec.startsWith(".")) base = path.resolve(path.dirname(from), spec);
  else return null;
  for (const ext of ["", ".tsx", ".ts", ".mjs", ".js", "/index.tsx", "/index.ts"]) if (await exists(base + ext)) return base + ext;
  return null;
}

const entries = (await walk(path.join(ROOT, "app"))).filter((f) => /\.(tsx|ts)$/.test(f));
const seen = new Set();
const queue = [...entries];
while (queue.length) {
  const f = queue.pop();
  if (seen.has(f)) continue;
  seen.add(f);
  const src = await readFile(f, "utf8");
  for (const m of src.matchAll(/(?:from\s+|import\s*\(\s*|import\s+)["']([^"']+)["']/g)) {
    const r = await resolve(f, m[1]);
    if (r && /\.(tsx|ts|mjs|js)$/.test(r)) queue.push(r);
  }
}

const tokens = new Set();
const prefixes = new Set();
for (const f of seen) {
  const src = await readFile(f, "utf8");
  for (const m of src.matchAll(/[A-Za-z0-9_-]+/g)) tokens.add(m[0]);
  for (const m of src.matchAll(/([A-Za-z0-9_-]+-)\$\{/g)) prefixes.add(m[1]);
}
const used = (name) => tokens.has(name) || SAFE.some((r) => r.test(name)) || [...prefixes].some((p) => name.startsWith(p));

const stripFns = (sel) => {
  let s = sel;
  for (let i = 0; i < 4; i++) s = s.replace(/:(not|has|is|where)\((?:[^()]|\([^()]*\))*\)/g, "");
  return s;
};
const names = (sel) => {
  const s = stripFns(sel).replace(/\[[^\]]*\]/g, "");
  return [...s.matchAll(/[.#](-?[_a-zA-Z][_a-zA-Z0-9-]*)/g)].map((m) => m[1]);
};

const write = process.argv.includes("--write");
let totalBefore = 0;
let totalAfter = 0;
const roots = [];
for (const file of FILES) {
  const css = await readFile(file, "utf8");
  const root = postcss.parse(css, { from: file });
  let dropped = 0;
  root.walkRules((rule) => {
    if (rule.parent?.type === "atrule" && /keyframes$/i.test(rule.parent.name)) return;
    const keep = rule.selectors.filter((s) => names(s).every(used));
    if (keep.length === 0) {
      rule.remove();
      dropped++;
    } else if (keep.length !== rule.selectors.length) rule.selectors = keep;
  });
  roots.push({ file, root, css, dropped });
}
// Keyframes still referenced by any remaining animation, or by name in the code.
const animRefs = new Set();
for (const { root } of roots)
  root.walkDecls(/^animation(-name)?$/i, (d) => d.value.split(/[\s,]+/).forEach((w) => animRefs.add(w)));
for (const r of roots) {
  r.root.walkAtRules(/keyframes$/i, (k) => {
    const n = k.params.trim();
    if (!animRefs.has(n) && !tokens.has(n)) {
      k.remove();
      r.dropped++;
    }
  });
  let changed = true;
  while (changed) {
    changed = false;
    r.root.walkAtRules((a) => {
      if (a.nodes && a.nodes.length === 0) {
        a.remove();
        changed = true;
      }
    });
  }
  const out = r.root.toString();
  totalBefore += r.css.length;
  totalAfter += out.length;
  console.log(`${r.file}: ${r.dropped} rules removed, ${Math.round(r.css.length / 1024)} KB -> ${Math.round(out.length / 1024)} KB`);
  if (write) await writeFile(r.file, out);
}
console.log(`modules in use: ${seen.size}; total ${Math.round(totalBefore / 1024)} KB -> ${Math.round(totalAfter / 1024)} KB${write ? " (written)" : " (report only)"}`);
