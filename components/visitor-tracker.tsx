"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/*
 * Visit notifications (see app/api/visit/route.ts).
 * - On the first page of a browser session it reports the arrival with device details.
 * - It records page views and clicks on links and buttons (their visible label only, never
 *   anything typed into a form) and sends them when the visitor hides or leaves the page.
 * Skipped for bots and automated browsers, for visitors whose browser sends Do Not Track or
 * Global Privacy Control, and for anyone who opened the site once with ?notrack=1 (use it on the
 * studio's own devices; ?track=1 turns tracking back on).
 */
const VID = "dd-vid";
const SID = "dd-sid";
const LOG = "dd-log";
const ENDPOINT = "/api/visit";

type Ev = { t: "view" | "click"; at: string; page: string; label?: string; href?: string };

const uuid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

function store(kind: "local" | "session") {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function optedOut() {
  const ls = store("local");
  const q = new URLSearchParams(location.search);
  if (q.get("notrack") === "1") ls?.setItem("dd-no-track", "1");
  if (q.get("track") === "1") ls?.removeItem("dd-no-track");
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return (
    ls?.getItem("dd-no-track") === "1" ||
    nav.webdriver ||
    nav.globalPrivacyControl === true ||
    nav.doNotTrack === "1" ||
    /bot|crawl|spider|headless|lighthouse/i.test(nav.userAgent)
  );
}

function send(payload: object) {
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: "text/plain" }))) return;
  } catch {}
  fetch(ENDPOINT, { method: "POST", body, keepalive: true, headers: { "Content-Type": "text/plain" } }).catch(() => {});
}

async function deviceInfo() {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { effectiveType?: string; downlink?: number };
    userAgentData?: { getHighEntropyValues?: (h: string[]) => Promise<Record<string, unknown>> };
  };
  let hints: Record<string, unknown> = {};
  try {
    hints = (await nav.userAgentData?.getHighEntropyValues?.(["model", "platformVersion"])) ?? {};
  } catch {}
  return {
    screen: `${screen.width} x ${screen.height}`,
    viewport: `${innerWidth} x ${innerHeight}`,
    dpr: Math.round(devicePixelRatio * 100) / 100,
    touch: navigator.maxTouchPoints > 0,
    cores: nav.hardwareConcurrency,
    memory: nav.deviceMemory,
    connection: nav.connection?.effectiveType
      ? `${nav.connection.effectiveType}${nav.connection.downlink ? `, about ${nav.connection.downlink} Mbps` : ""}`
      : undefined,
    languages: (navigator.languages ?? [navigator.language]).slice(0, 4).join(", "),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    colorScheme: matchMedia("(prefers-color-scheme: dark)").matches ? "Dark" : "Light",
    theme: document.documentElement.getAttribute("data-theme") === "emerald" ? "Emerald gold" : "Brand blue",
    model: typeof hints.model === "string" && hints.model ? hints.model : undefined,
    platformVersion: typeof hints.platformVersion === "string" ? hints.platformVersion : undefined,
  };
}

export function VisitorTracker() {
  const pathname = usePathname();
  const ctx = useRef<{ on: boolean; vid: string; sid: string; started: number; device?: object }>({
    on: false,
    vid: "",
    sid: "",
    started: Date.now(),
  });

  // Session start, arrival report, click capture and flushing.
  useEffect(() => {
    if (optedOut()) return;
    const ls = store("local");
    const ss = store("session");
    let vid = ls?.getItem(VID) ?? "";
    let firstSeen = ls?.getItem("dd-first") ?? "";
    if (!vid) {
      vid = uuid();
      firstSeen = new Date().toISOString();
      ls?.setItem(VID, vid);
      ls?.setItem("dd-first", firstSeen);
    }
    let sid = ss?.getItem(SID) ?? "";
    const isNewSession = !sid;
    if (!sid) {
      sid = uuid();
      ss?.setItem(SID, sid);
      ss?.setItem("dd-started", String(Date.now()));
    }
    const started = Number(ss?.getItem("dd-started")) || Date.now();
    ctx.current = { on: true, vid, sid, started };

    const read = (): Ev[] => {
      try {
        return JSON.parse(ss?.getItem(LOG) ?? "[]");
      } catch {
        return [];
      }
    };
    const push = (e: Ev) => {
      const log = read();
      log.push(e);
      ss?.setItem(LOG, JSON.stringify(log.slice(-150)));
    };
    (window as Window & { __ddTrack?: (e: Ev) => void }).__ddTrack = push;

    deviceInfo().then((device) => {
      ctx.current.device = device;
      if (!isNewSession) return;
      const visitNo = (Number(ls?.getItem("dd-visits")) || 0) + 1;
      ls?.setItem("dd-visits", String(visitNo));
      const q = new URLSearchParams(location.search);
      const utm = Object.fromEntries(
        ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "ref"]
          .map((k) => [k, q.get(k)?.slice(0, 80)])
          .filter(([, v]) => v),
      );
      const ref = document.referrer && !document.referrer.startsWith(location.origin) ? document.referrer : "";
      send({
        kind: "arrival",
        vid,
        sid,
        visitNo,
        firstSeen,
        page: location.pathname + location.search,
        title: document.title,
        referrer: ref,
        utm,
        device,
      });
    });

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("a, button, [role='button'], summary");
      if (!el) return;
      const label = (el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
      const href = el instanceof HTMLAnchorElement ? el.getAttribute("href") ?? undefined : undefined;
      push({ t: "click", at: new Date().toISOString(), page: location.pathname, label, href });
    };

    let flushed = Number(ss?.getItem("dd-flushed")) || 0;
    const flush = () => {
      const log = read();
      if (log.length <= flushed) return;
      const events = log.slice(flushed);
      flushed = log.length;
      ss?.setItem("dd-flushed", String(flushed));
      send({
        kind: "activity",
        vid,
        sid,
        firstSeen,
        visitNo: Number(ls?.getItem("dd-visits")) || undefined,
        events,
        startedAt: new Date(started).toISOString(),
        seconds: Math.round((Date.now() - started) / 1000),
        device: { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
      });
    };
    const onHide = () => document.visibilityState === "hidden" && flush();

    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", flush);
    };
  }, []);

  // Page views, including client-side navigation.
  useEffect(() => {
    const t = setTimeout(() => {
      if (!ctx.current.on) return;
      const track = (window as Window & { __ddTrack?: (e: Ev) => void }).__ddTrack;
      track?.({ t: "view", at: new Date().toISOString(), page: location.pathname + location.search });
    }, 50);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
