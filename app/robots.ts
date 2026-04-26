import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Single broad-allow policy: do not add default Disallow for GPTBot, ChatGPT-User,
 * ClaudeBot, or PerplexityBot here unless there is a deliberate, documented reason—
 * over-restricting AI crawlers hurts GEO discovery.
 */
export default function robots(): MetadataRoute.Robots {
  const site = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${site}/sitemap.xml`,
  };
}
