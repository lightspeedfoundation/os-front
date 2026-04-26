import { notFound } from "next/navigation";
import { concepts } from "#velite";
import { ContentPageShell } from "@/components/ContentPageShell";
import { VeliteHtml } from "@/components/VeliteHtml";
import { getSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return concepts.filter((c) => c.published).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = concepts.find((x) => x.slug === slug);
  if (!c) return {};
  const site = getSiteUrl();
  const path = `/concepts/${c.slug}`;
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
  const c = concepts.find((x) => x.slug === slug && x.published);
  if (!c) notFound();
  return (
    <ContentPageShell typeLabel="Concept">
      <header>
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-neon">Concept</p>
        <h1 className="mt-2 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-soft">
          {c.title}
        </h1>
        <p className="mt-3 text-[15px] text-mutted2">{c.description}</p>
      </header>
      <VeliteHtml html={c.body} className="velite-html mt-10" />
    </ContentPageShell>
  );
}
