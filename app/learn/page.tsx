import Link from "next/link";
import { concepts, comparisons, guides, roundups } from "#velite";
import { ContentPageShell } from "@/components/ContentPageShell";
import { getSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const site = getSiteUrl();
  return {
    title: "Learn: guides, concepts, and comparisons for browser trading",
    description:
      "Index of Speed OS how-to guides, MCP and trading concepts, and use-case comparison pages — built for search and AI citation with internal cross-links.",
    alternates: { canonical: "/learn" },
    openGraph: {
      type: "website",
      title: "Learn | Speed OS",
      description: "Guides, concepts, and comparisons for onchain browser trading with Speed OS.",
      url: new URL("/learn", site).toString(),
    },
  };
}

type Item = { slug: string; title: string; description: string; published: boolean };

function List({ items, base, title }: { items: readonly Item[]; base: string; title: string }) {
  const list = items.filter((i) => i.published);
  if (list.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="font-display text-xl font-bold text-soft">{title}</h2>
      <ul className="mt-4 divide-y divide-borderw rounded-xl border border-borderw bg-void2/55 px-5">
        {list.map((i) => (
          <li key={i.slug} className="py-5 first:pt-5 last:pb-5">
            <Link
              href={`${base}/${i.slug}`}
              className="font-display text-lg font-semibold text-soft transition hover:text-neon"
            >
              {i.title}
            </Link>
            <p className="mt-2 text-[15px] leading-7 text-mutted">{i.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function LearnPage() {
  return (
    <ContentPageShell typeLabel="Learn index">
      <h1 className="font-display text-[clamp(2rem,4.5vw,2.75rem)] font-extrabold text-soft">Learn</h1>
      <p className="mt-3 max-w-[640px] text-[15px] leading-relaxed text-mutted2">
        Citation-friendly pages: how-tos (with in-product screenshot placeholders you can replace), “what is”
        explainers, and use-case-specific comparisons. Start with a guide, then read the MCP concepts and
        roundups.
      </p>
      <p className="mt-6 text-sm text-mutted">
        <Link className="text-neon underline decoration-neon/30 underline-offset-2 hover:decoration-neon" href="/">
          Back to home
        </Link>
      </p>

      <section className="mt-10 rounded-xl border border-borderw2 bg-void2/65 p-6 md:p-7">
        <h2 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-neon/90">Start here</h2>
        <ul className="mt-4 list-inside list-disc space-y-3.5 text-base leading-7 text-mutted marker:text-neon/70">
          <li>
            <Link
              className="font-medium text-soft underline decoration-borderw2 underline-offset-2 transition hover:text-neon hover:decoration-neon/40"
              href="/guides/swap-eth-to-usdc-in-browser"
            >
              Swap ETH to USDC in the browser
            </Link>{" "}
            — step-by-step (placeholder screenshots; replace with in-product captures).
          </li>
          <li>
            <Link
              className="font-medium text-soft underline decoration-borderw2 underline-offset-2 transition hover:text-neon hover:decoration-neon/40"
              href="/concepts/what-is-mcp-crypto"
            >
              What is MCP in crypto?
            </Link>{" "}
            — short definition and how it pairs with a local vault.
          </li>
          <li>
            <Link
              className="font-medium text-soft underline decoration-borderw2 underline-offset-2 transition hover:text-neon hover:decoration-neon/40"
              href="/compare/speed-os-vs-metamask-for-trading"
            >
              Speed OS vs MetaMask for trading
            </Link>{" "}
            — use-case-specific comparison.
          </li>
        </ul>
      </section>

      <List items={guides} base="/guides" title="Guides" />
      <List items={concepts} base="/concepts" title="Concepts" />
      <List items={comparisons} base="/compare" title="Comparisons" />
      <List items={roundups} base="/roundups" title="Roundups" />
    </ContentPageShell>
  );
}
