import type { Guide } from "#velite";
import { getSiteUrl } from "@/lib/site-url";

export function buildHowToJsonLd(guide: Guide, path: string) {
  if (!guide.howTo) return null;
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.howTo.name,
    description: guide.howTo.description,
    step: guide.howTo.step.map((s) => {
      const step: Record<string, unknown> = {
        "@type": "HowToStep",
        name: s.name,
        text: s.text,
      };
      if (s.image) {
        step.image = new URL(s.image, site).toString();
      }
      return step;
    }),
    mainEntityOfPage: { "@type": "WebPage", "@id": new URL(path, site).toString() },
  };
}

export function buildArticleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  date: string;
  updated?: string;
}) {
  const site = getSiteUrl();
  const url = new URL(input.path, site).toString();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    dateModified: input.updated ?? input.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "Speed OS" },
    publisher: { "@type": "Organization", name: "Speed OS" },
  };
}
