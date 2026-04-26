import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SkipLink } from "@/components/SkipLink";

type Props = {
  children: React.ReactNode;
  /** e.g. concept | comparison | guide | roundup */
  typeLabel: string;
};

export function ContentPageShell({ children, typeLabel }: Props) {
  return (
    <>
      <SkipLink />
      <Header />
      <div className="min-h-dvh bg-void pb-20 pt-[72px] md:pb-24 md:pt-[5.5rem]">
        <p className="sr-only" aria-hidden>
          {typeLabel}
        </p>
        <article className="mx-auto max-w-[860px] rounded-2xl border border-borderw/70 bg-void/78 px-6 py-7 backdrop-blur-[2px] md:px-11 md:py-10">
          {children}
        </article>
      </div>
      <Footer />
    </>
  );
}
