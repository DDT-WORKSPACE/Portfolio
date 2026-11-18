// Server-side visitor details for enquiry and visit emails: IP address, approximate location,
// browser, operating system and device. Location comes from the hosting platform's geo headers
// (Vercel, Cloudflare) when present, otherwise from an IP lookup (ipapi.co). Set VISITOR_GEO=off
// to skip the lookup. A website cannot read a hardware device ID or GPS position without asking,
// so the visitor is recognised by an anonymous random ID kept in their browser instead.

export type Geo = {
  city?: string;
  region?: string;
  country?: string;
  postal?: string;
  timezone?: string;
  lat?: number;
  lon?: number;
  network?: string;
};

export type Device = { browser: string; os: string; type: string; model?: string };

const geoCache = new Map<string, { at: number; geo: Geo }>();

export function clientIp(h: Headers) {
  const fwd = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return fwd || h.get("x-real-ip") || h.get("cf-connecting-ip") || "";
}

const isPrivate = (ip: string) =>
  !ip ||
  ip === "::1" ||
  ip.startsWith("127.") ||
  ip.startsWith("10.") ||
  ip.startsWith("192.168.") ||
  /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
  /^f[cd]/i.test(ip) ||
  ip.startsWith("::ffff:127.");

export async function lookupGeo(h: Headers, ip: string): Promise<Geo> {
  const dec = (v: string | null) => (v ? decodeURIComponent(v) : undefined);
  // Hosting platform headers first: free, instant and nothing leaves the server.
  const vercelCountry = h.get("x-vercel-ip-country");
  if (vercelCountry)
    return {
      country: vercelCountry,
      region: dec(h.get("x-vercel-ip-country-region")),
      city: dec(h.get("x-vercel-ip-city")),
      postal: dec(h.get("x-vercel-ip-postal-code")),
      timezone: dec(h.get("x-vercel-ip-timezone")),
      lat: Number(h.get("x-vercel-ip-latitude")) || undefined,
      lon: Number(h.get("x-vercel-ip-longitude")) || undefined,
    };
  if (process.env.VISITOR_GEO === "off" || isPrivate(ip)) {
    const cf = h.get("cf-ipcountry");
    return cf ? { country: cf } : {};
  }
  const cached = geoCache.get(ip);
  if (cached && Date.now() - cached.at < 24 * 3600 * 1000) return cached.geo;
  try {
    const res = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`, {
      signal: AbortSignal.timeout(2500),
      headers: { "User-Agent": "website-visit-notifier" },
      cache: "no-store",
    });
    if (!res.ok) return {};
    const j = await res.json();
    if (j.error) return {};
    const geo: Geo = {
      city: j.city,
      region: j.region,
      country: j.country_name,
      postal: j.postal,
      timezone: j.timezone,
      lat: j.latitude,
      lon: j.longitude,
      network: j.org,
    };
    if (geoCache.size > 2000) geoCache.clear();
    geoCache.set(ip, { at: Date.now(), geo });
    return geo;
  } catch {
    return {};
  }
}

export function placeName(g: Geo) {
  return [g.city, g.region !== g.city ? g.region : undefined, g.country].filter(Boolean).join(", ");
}

export function parseUserAgent(ua: string): Device {
  const v = (re: RegExp) => ua.match(re)?.[1];
  const browser =
    (v(/Edg(?:e|A|iOS)?\/([\d]+)/) && `Edge ${v(/Edg(?:e|A|iOS)?\/([\d]+)/)}`) ||
    (v(/OPR\/([\d]+)/) && `Opera ${v(/OPR\/([\d]+)/)}`) ||
    (v(/SamsungBrowser\/([\d]+)/) && `Samsung Internet ${v(/SamsungBrowser\/([\d]+)/)}`) ||
    (v(/Firefox\/([\d]+)/) && `Firefox ${v(/Firefox\/([\d]+)/)}`) ||
    (v(/FxiOS\/([\d]+)/) && `Firefox ${v(/FxiOS\/([\d]+)/)}`) ||
    (v(/CriOS\/([\d]+)/) && `Chrome ${v(/CriOS\/([\d]+)/)}`) ||
    (v(/Chrome\/([\d]+)/) && `Chrome ${v(/Chrome\/([\d]+)/)}`) ||
    (/Safari\//.test(ua) && v(/Version\/([\d.]+)/) && `Safari ${v(/Version\/([\d.]+)/)}`) ||
    "Unknown browser";
  const os =
    (v(/Android ([\d.]+)/) && `Android ${v(/Android ([\d.]+)/)}`) ||
    (v(/(?:iPhone|CPU) OS ([\d_]+)/) && `iOS ${v(/(?:iPhone|CPU) OS ([\d_]+)/)!.replace(/_/g, ".")}`) ||
    (/iPad/.test(ua) && "iPadOS") ||
    (/Windows NT 10/.test(ua) && "Windows 10 or 11") ||
    (v(/Windows NT ([\d.]+)/) && `Windows NT ${v(/Windows NT ([\d.]+)/)}`) ||
    (v(/Mac OS X ([\d_]+)/) && `macOS ${v(/Mac OS X ([\d_]+)/)!.replace(/_/g, ".")}`) ||
    (/CrOS/.test(ua) && "ChromeOS") ||
    (/Linux/.test(ua) && "Linux") ||
    "Unknown OS";
  const type = /iPad|Tablet/.test(ua) || (/Android/.test(ua) && !/Mobile/.test(ua)) ? "Tablet" : /Mobi|iPhone|Android/.test(ua) ? "Mobile" : "Desktop";
  const model = v(/Android [\d.]+; (?:[a-z]{2}-[a-z]{2}; )?([^;)]+?)(?: Build|\))/i) || (/iPhone/.test(ua) ? "iPhone" : /iPad/.test(ua) ? "iPad" : undefined);
  return { browser, os, type, model: model && model !== "K" ? model : undefined };
}

export const isBot = (ua: string) =>
  !ua || /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|whatsapp|curl|wget|python|axios|node-fetch/i.test(ua);

export function mapLink(g: Geo) {
  return g.lat && g.lon ? `https://www.google.com/maps?q=${g.lat},${g.lon}` : undefined;
}
