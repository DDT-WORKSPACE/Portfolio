// Runs before first paint (inlined in app/layout.tsx) so the remembered theme never flashes.
// It also swaps the browser-tab icon: in the Emerald theme an extra <link rel="icon"> with the
// green and gold logo is added at the end of <head> (the last icon wins), and removed again for
// the brand theme. Next's own icon link is never touched.
export const THEME_KEY = "dd-theme";
export const EMERALD_FAVICON = "/Logo/favicon-emerald.png";

export const themeScript = `try{
window.__ddFavicon=function(on){var l=document.getElementById("dd-favicon");if(!on){if(l)l.remove();return}
if(!l){l=document.createElement("link");l.id="dd-favicon";l.rel="icon";l.type="image/png";l.href="${EMERALD_FAVICON}"}
document.head.appendChild(l)};
if(localStorage.getItem("${THEME_KEY}")==="emerald"){document.documentElement.setAttribute("data-theme","emerald");
window.__ddFavicon(true);document.addEventListener("DOMContentLoaded",function(){window.__ddFavicon(document.documentElement.getAttribute("data-theme")==="emerald")})}
}catch(e){}`;

/** Called by setTheme; keeps working even if the inline script was blocked. */
export function applyFavicon(on: boolean) {
  const w = window as Window & { __ddFavicon?: (on: boolean) => void };
  if (w.__ddFavicon) return w.__ddFavicon(on);
  let l = document.getElementById("dd-favicon") as HTMLLinkElement | null;
  if (!on) return l?.remove();
  if (!l) {
    l = document.createElement("link");
    l.id = "dd-favicon";
    l.rel = "icon";
    l.type = "image/png";
    l.href = EMERALD_FAVICON;
  }
  document.head.appendChild(l);
}
