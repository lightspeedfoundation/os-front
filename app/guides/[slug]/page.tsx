import { notFound } from "next/navigation";
import { guides } from "#velite";
import { ContentPageShell } from "@/components/ContentPageShell";
import { VeliteHtml } from "@/components/VeliteHtml";
import { buildHowToJsonLd } from "@/lib/json-ld-content";
import { getSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.filter((g) => g.published).map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) return {};
  const site = getSiteUrl();
  const path = `/guides/${g.slug}`;
  return {
    title: g.seoTitle ?? g.title,
    description: g.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: g.seoTitle ?? g.title,
      description: g.description,
      url: new URL(path, site).toString(),
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug && x.published);
  if (!g) notFound();
  const path = `/guides/${g.slug}`;
  const howToJson = buildHowToJsonLd(g, path);
  return (
    <ContentPageShell typeLabel="Guide">
      {howToJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJson) }}
        />
      )}
      <header>
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-neon">Guide · {g.guideType}</p>
        <h1 className="mt-2 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-soft">
          {g.title}
        </h1>
        <p className="mt-3 text-[15px] text-mutted2">{g.description}</p>
      </header>
      <VeliteHtml html={g.body} className="velite-html mt-10" />
    </ContentPageShell>
  );
}
