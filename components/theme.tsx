"use client";

import { useSyncExternalStore } from "react";
import { THEME_KEY, applyFavicon } from "./theme-script";

/*
 * Colour themes. "brand" is the logo palette (blue/orange). "emerald" is the green and gold
 * palette from the DDT Figma file. The choice lives on <html data-theme> (set before paint by
 * themeScript from ./theme-script, inlined in app/layout.tsx) and is remembered in localStorage.
 */
export type Theme = "brand" | "emerald";

const listeners = new Set<() => void>();
function read(): Theme {
  return document.documentElement.getAttribute("data-theme") === "emerald" ? "emerald" : "brand";
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function setTheme(theme: Theme) {
  const root = document.documentElement;
  // Briefly disable transitions so every surface switches in the same frame.
  root.classList.add("dd-theme-switching");
  if (theme === "emerald") root.setAttribute("data-theme", "emerald");
  else root.removeAttribute("data-theme");
  applyFavicon(theme === "emerald");
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
  listeners.forEach((l) => l());
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("dd-theme-switching")));
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, read, () => "brand");
}

const options: { id: Theme; label: string }[] = [
  { id: "brand", label: "Brand blue" },
  { id: "emerald", label: "Emerald gold" },
];

export function ThemeSwitch() {
  const theme = useTheme();
  return (
    <div className="dd-theme-switch" role="group" aria-label="Colour theme">
      <span className="dd-theme-switch-label">Theme</span>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={theme === o.id}
          className={theme === o.id ? "is-on" : ""}
          onClick={() => setTheme(o.id)}
        >
          <span className={`dd-theme-dot is-${o.id}`} aria-hidden="true" />
          {o.label}
        </button>
      ))}
    </div>
  );
}
