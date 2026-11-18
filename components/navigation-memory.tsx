"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/*
 * Restores the reading position when the visitor goes Back (or Forward) to a page.
 * On leaving a page it remembers the element at the top of the screen (as a child-index path
 * from <main>) and how far it sat from the top. On return it scrolls that same element back into
 * the same place, re-checking each frame for up to 3 s while images and fonts finish loading, and
 * stops the moment the visitor scrolls, taps, clicks or presses a key.
 * Positions use offsetTop (layout position), so reveal animations that move elements with
 * transforms do not throw the result off.
 */
type Saved = { y: number; path: number[]; viewTop: number };
const positions = new Map<string, Saved>();
let returning = false;
const key = () => location.pathname + location.search;
const READ_Y = 150; // just under the floating header

function layoutTop(el: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

/** Sticky or fixed elements (like a pinned sub-navigation) have no fixed place in the page. */
function pinned(el: Element, main: Element) {
  for (let n: Element | null = el; n && n !== main; n = n.parentElement) {
    const p = getComputedStyle(n).position;
    if (p === "sticky" || p === "fixed") return true;
  }
  return false;
}

function anchorAt(): HTMLElement | null {
  const main = document.querySelector("main");
  if (!main) return null;
  for (const y of [READ_Y, READ_Y + 90, READ_Y + 180, innerHeight * 0.5]) {
    let el = document.elementFromPoint(innerWidth / 2, y) as HTMLElement | null;
    if (!el || !main.contains(el) || pinned(el, main)) continue;
    // Walk up from SVG parts, tiny inline bits and hidden elements to a real laid-out block.
    while (el && el !== main && (!(el instanceof HTMLElement) || el.offsetParent === null || el.offsetHeight < 8))
      el = el.parentElement;
    if (el && el !== main) return el;
  }
  return null;
}

function pathOf(el: HTMLElement): number[] {
  const main = document.querySelector("main")!;
  const path: number[] = [];
  let node: Element = el;
  while (node && node !== main && node.parentElement) {
    path.unshift([...node.parentElement.children].indexOf(node));
    node = node.parentElement;
  }
  return node === main ? path : [];
}

function resolve(path: number[]): HTMLElement | null {
  let node: Element | null = document.querySelector("main");
  for (const i of path) {
    node = node?.children[i] ?? null;
    if (!node) return null;
  }
  return node instanceof HTMLElement ? node : null;
}

function capture() {
  const y = window.scrollY;
  const el = anchorAt();
  const path = el ? pathOf(el) : [];
  positions.set(key(), { y, path, viewTop: el && path.length ? layoutTop(el) - y : 0 });
}

export function NavigationMemory() {
  const pathname = usePathname();
  useEffect(() => {
    const click = (e: MouseEvent) => {
      const a = e.target instanceof Element ? e.target.closest("a") : null;
      if (!a) return;
      try {
        const url = new URL(a.href, location.href);
        if (url.origin === location.origin && url.pathname !== location.pathname) capture();
      } catch {}
    };
    const pop = () => {
      returning = true;
    };
    document.addEventListener("click", click, true);
    window.addEventListener("popstate", pop);
    window.addEventListener("pagehide", capture);
    return () => {
      document.removeEventListener("click", click, true);
      window.removeEventListener("popstate", pop);
      window.removeEventListener("pagehide", capture);
    };
  }, []);

  useEffect(() => {
    if (!returning) return;
    returning = false;
    const saved = positions.get(key());
    if (!saved) return;
    let cancelled = false;
    let frame = 0;
    const started = performance.now();
    const cancel = () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
    const restore = () => {
      if (cancelled) return;
      const el = saved.path.length ? resolve(saved.path) : null;
      const target = Math.max(0, el ? layoutTop(el) - saved.viewTop : saved.y);
      if (Math.abs(window.scrollY - target) > 1) window.scrollTo({ top: target, behavior: "instant" });
      if (performance.now() - started < 3000) frame = requestAnimationFrame(restore);
    };
    frame = requestAnimationFrame(restore);
    const opts = { once: true, passive: true } as const;
    window.addEventListener("wheel", cancel, opts);
    window.addEventListener("touchstart", cancel, opts);
    window.addEventListener("pointerdown", cancel, opts);
    window.addEventListener("keydown", cancel, { once: true });
    return () => {
      cancel();
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("pointerdown", cancel);
      window.removeEventListener("keydown", cancel);
    };
  }, [pathname]);
  return null;
}
