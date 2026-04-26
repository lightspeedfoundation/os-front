import { HeroNewTabPreview } from "@/components/HeroNewTabPreview";
import { CHROME_WEB_STORE_URL } from "@/lib/chrome-store";
import { PRODUCT_DEFINITION_ONE_LINE } from "@/lib/product-definition";

export function Hero() {
  return (
    <section
      id="product"
      className="relative scroll-mt-24 overflow-x-hidden pt-24 md:scroll-mt-28 md:pt-28"
    >
      <div
        className="pointer-events-none absolute -left-[20%] top-0 h-[700px] w-[700px] bg-[radial-gradient(circle,rgba(0,255,135,0.06)_0%,transparent_70%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-12 px-6 pb-28 pt-8 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.22fr)] lg:items-center lg:gap-12 lg:pb-32 xl:gap-16">
        <div className="min-w-0 max-w-[min(100%,560px)] lg:max-w-[600px]">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-neon/25 bg-neon-dim py-1.5 pl-2 pr-3.5 text-[11px] font-medium uppercase tracking-[0.06em] text-neon">
            <span
              className="h-1.5 w-1.5 rounded-full bg-neon motion-safe:animate-pulseDot"
              aria-hidden
            />
            Chrome Extension
          </div>

          <h1 className="font-display text-[clamp(36px,4.75vw,68px)] font-extrabold leading-[0.98] tracking-[-1.5px] text-soft">
            Intent-driven
            <span className="mt-1.5 block text-neon">onchain trading</span>
            <span className="mt-1.5 block text-mutted2">in every new tab.</span>
          </h1>

          <p className="mt-5 max-w-[min(100%,520px)] text-[12px] font-light leading-relaxed text-mutted2 md:text-[13px]">
            {PRODUCT_DEFINITION_ONE_LINE}
          </p>

          <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center lg:mt-12">
            <a
              href={CHROME_WEB_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-[10px] bg-neon px-7 py-3.5 text-[13px] font-semibold tracking-wide text-black transition hover:-translate-y-0.5 hover:bg-[#1aff95] hover:shadow-[0_0_32px_rgba(0,255,135,0.4)]"
            >
              <svg aria-hidden className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
              </svg>
              Add to Chrome
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-borderw2 bg-transparent px-6 py-3.5 text-[13px] font-normal text-mutted2 transition hover:border-white/20 hover:bg-borderw hover:text-soft"
            >
              See how it works →
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 md:mt-11 md:gap-8">
            <div className="flex flex-col gap-0.5">
              <span className="font-display text-[22px] font-bold text-soft">10+</span>
              <span className="text-[11px] uppercase tracking-[0.05em] text-mutted">Protocols & Chains</span>
            </div>
            <div className="h-9 w-px bg-borderw2" aria-hidden />
            <div className="flex flex-col gap-0.5">
              <span className="font-display text-[22px] font-bold text-soft">30+</span>
              <span className="text-[11px] uppercase tracking-[0.05em] text-mutted">Functions</span>
            </div>
            <div className="h-9 w-px bg-borderw2" aria-hidden />
            <div className="flex flex-col gap-0.5">
              <span className="font-display text-[22px] font-bold text-soft">∞</span>
              <span className="text-[11px] uppercase tracking-[0.05em] text-mutted">Combinations</span>
            </div>
          </div>
        </div>

        {/* Speed OS new tab preview — matches in-product shell */}
        <div className="relative mx-auto mt-10 w-full min-w-0 max-w-[620px] lg:mx-0 lg:mt-0 lg:max-w-none lg:justify-self-end">
          <HeroNewTabPreview />

          <div className="motion-safe:animate-float relative z-10 mx-auto mt-5 flex w-fit max-w-full items-center gap-2.5 rounded-xl border border-borderw2 bg-void4 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.7)] motion-reduce:animate-none lg:absolute lg:-bottom-4 lg:-right-2 lg:mx-0 lg:mt-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon-dim text-base" aria-hidden>
              🔒
            </div>
            <div className="flex flex-col gap-px">
              <strong className="font-display text-[13px] font-semibold text-soft">Keys on-device</strong>
              <span className="text-[10px] text-mutted">Vault never leaves Chrome</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
