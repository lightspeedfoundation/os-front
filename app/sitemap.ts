import type { MetadataRoute } from "next";
import { concepts, comparisons, guides, roundups } from "#velite";
import { getSiteUrl } from "@/lib/site-url";

function lastMod(entry: { date: string; updated?: string }): Date {
  return new Date(entry.updated ?? entry.date);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  const out: MetadataRoute.Sitemap = [
    {
      url: site,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/learn", site).toString(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
  ];

  const push = (
    list: readonly { slug: string; date: string; updated?: string; published: boolean }[],
    path: string,
  ) => {
    for (const p of list.filter((x) => x.published)) {
      out.push({
        url: new URL(`${path}/${p.slug}`, site).toString(),
        lastModified: lastMod(p),
        changeFrequency: "monthly",
        priority: 0.85,
      });
    }
  };

  push(guides, "/guides");
  push(concepts, "/concepts");
  push(comparisons, "/compare");
  push(roundups, "/roundups");
  return out;
}
