import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => new URL(p, SITE.url).toString();
  // Other pages are "coming soon" and not indexed yet
  const pages: { path: string; priority: number }[] = [{ path: "/", priority: 1 }];
  return pages.map((p) => ({ url: url(p.path), changeFrequency: "monthly", priority: p.priority }));
}
