import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(process.env.DRAFT_PREVIEW === "1" || !process.env.SITE_URL
        ? { disallow: "/" }
        : { allow: "/" }),
    },
    ...(process.env.SITE_URL
      ? { sitemap: process.env.SITE_URL + "/sitemap.xml" }
      : {}),
  };
}
