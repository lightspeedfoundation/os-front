import { notFound } from "next/navigation";
import { roundups } from "#velite";
import { ContentPageShell } from "@/components/ContentPageShell";
import { VeliteHtml } from "@/components/VeliteHtml";
import { getSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return roundups.filter((r) => r.published).map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = roundups.find((x) => x.slug === slug);
  if (!r) return {};
  const site = getSiteUrl();
  const path = `/roundups/${r.slug}`;
  return {
    title: r.seoTitle ?? r.title,
    description: r.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: r.seoTitle ?? r.title,
      description: r.description,
      url: new URL(path, site).toString(),
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const r = roundups.find((x) => x.slug === slug && x.published);
  if (!r) notFound();
  return (
    <ContentPageShell typeLabel="Roundup">
      <header>
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-neon">Roundup</p>
        <h1 className="mt-2 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-soft">
          {r.title}
        </h1>
        <p className="mt-3 text-[15px] text-mutted2">{r.description}</p>
      </header>
      <VeliteHtml html={r.body} className="velite-html mt-10" />
    </ContentPageShell>
  );
}
