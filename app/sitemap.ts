import type { MetadataRoute } from "next";
import { startingPoints } from "@/content/starting-points";
import { services } from "@/content/services";
import { industries } from "@/content/site";
import { work } from "@/content/work";
import { posts } from "@/content/posts";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.SITE_URL;
  if (!origin) return [];
  return [
    "",
    "/services",
    "/work",
    "/about",
    "/blog",
    "/contact",
    "/legal/privacy",
    "/legal/terms",
    ...startingPoints.map((s) => `/starting-points/${s.slug}`),
    ...services.map((s) => `/services/${s.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
    ...work.map((w) => `/work/${w.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ].map((route) => ({
    url: origin + route,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
