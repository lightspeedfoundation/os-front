import { notFound } from "next/navigation";
import { comparisons } from "#velite";
import { ContentPageShell } from "@/components/ContentPageShell";
import { VeliteHtml } from "@/components/VeliteHtml";
import { buildArticleJsonLd } from "@/lib/json-ld-content";
import { getSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return comparisons.filter((c) => c.published).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = comparisons.find((x) => x.slug === slug);
  if (!c) return {};
  const site = getSiteUrl();
  const path = `/compare/${c.slug}`;
  return {
    title: c.seoTitle ?? c.title,
    description: c.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: c.seoTitle ?? c.title,
      description: c.description,
      url: new URL(path, site).toString(),
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const c = comparisons.find((x) => x.slug === slug && x.published);
  if (!c) notFound();
  const path = `/compare/${c.slug}`;
  const articleJson = buildArticleJsonLd({
    title: c.seoTitle ?? c.title,
    description: c.description,
    path,
    date: c.date,
    updated: c.updated,
  });
  return (
    <ContentPageShell typeLabel="Comparison">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }}
      />
      <header>
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-neon">Comparison</p>
        <h1 className="mt-2 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-soft">
          {c.title}
        </h1>
        <p className="mt-3 text-[15px] text-mutted2">{c.description}</p>
      </header>
      <VeliteHtml html={c.body} className="velite-html mt-10" />
    </ContentPageShell>
  );
}
