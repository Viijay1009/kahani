import type { MetadataRoute } from "next";
import { SERVICES } from "@/data/services";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => new URL(p, SITE.url).toString();
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services/speech-therapy", priority: 0.9 },
    { path: "/services", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/approach", priority: 0.6 },
    { path: "/our-team", priority: 0.6 },
    { path: "/gallery", priority: 0.5 },
    ...SERVICES.map((s) => ({ path: `/services/speech-therapy/${s.slug}`, priority: 0.7 })),
  ];
  return pages.map((p) => ({ url: url(p.path), changeFrequency: "monthly", priority: p.priority }));
}
