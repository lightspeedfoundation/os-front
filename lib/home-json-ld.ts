import { faqs, installSpeedOsHowTo } from "@/lib/faq-data";
import { CHROME_WEB_STORE_URL } from "@/lib/chrome-store";
import { GITHUB_SPEED_MCP_URL } from "@/lib/site-links";
import { getSiteUrl } from "@/lib/site-url";
import { PRODUCT_DEFINITION_ONE_LINE } from "@/lib/product-definition";

/**
 * JSON-LD graph for the marketing homepage: SoftwareApplication, FAQPage, HowTo.
 */
export function getHomepageJsonLd(): Record<string, unknown>[] {
  const site = getSiteUrl();
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Speed OS",
      description: PRODUCT_DEFINITION_ONE_LINE,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Chrome",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      url: site,
      downloadUrl: CHROME_WEB_STORE_URL,
      sameAs: [GITHUB_SPEED_MCP_URL],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a.join(" "),
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      ...installSpeedOsHowTo,
    },
  ];
}
