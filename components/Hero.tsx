import { HeroNewTabPreview } from "@/components/HeroNewTabPreview";
import { CHROME_WEB_STORE_URL } from "@/lib/chrome-store";

export function Hero() {
  return (
    <section
      id="product"
      className="relative scroll-mt-24 overflow-hidden pt-24 md:scroll-mt-28 md:pt-28"
    >
      <div
        className="pointer-events-none absolute -left-[20%] top-0 h-[700px] w-[700px] bg-[radial-gradient(circle,rgba(0,255,135,0.06)_0%,transparent_70%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-[1400px] min-h-[min(100vh,920px)] grid-cols-1 items-center gap-12 px-6 pb-16 pt-8 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.22fr)] lg:gap-12 lg:pb-20 xl:gap-16">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-neon/25 bg-neon-dim py-1.5 pl-2 pr-3.5 text-[11px] font-medium uppercase tracking-[0.06em] text-neon">
            <span
              className="h-1.5 w-1.5 rounded-full bg-neon motion-safe:animate-pulseDot"
              aria-hidden
            />
            Chrome Extension
          </div>

          <h1 className="font-display text-[clamp(42px,5.5vw,80px)] font-extrabold leading-none tracking-[-2px] text-soft">
            Intent-driven
            <span className="mt-1 block text-neon">onchain trading</span>
            <span className="mt-1 block text-soft/40">in every new tab.</span>
          </h1>

          <p className="mt-6 max-w-[440px] text-[15px] font-light leading-[1.75] text-mutted2">
            Your new tab becomes a <em className="font-normal not-italic text-soft">full trading workspace</em> with
            panels and optional terminal. Keys stay on-device. No installs. No logins beyond your vault.
          </p>

          <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <a
              href={CHROME_WEB_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-[10px] bg-neon px-7 py-3.5 text-[13px] font-semibold tracking-wide text-black transition hover:-translate-y-0.5 hover:bg-[#1aff95] hover:shadow-[0_0_32px_rgba(0,255,135,0.4)]"
            >
              <span aria-hidden>⚡</span>
              Add to Chrome
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-borderw2 bg-transparent px-6 py-3.5 text-[13px] font-normal text-mutted2 transition hover:border-white/20 hover:bg-borderw hover:text-soft"
            >
              See how it works →
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6 md:gap-8">
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
        <div className="relative mx-auto mt-10 w-full min-w-0 max-w-[620px] lg:mx-0 lg:mt-0 lg:max-w-none">
          <HeroNewTabPreview />

          <div className="motion-safe:animate-float absolute -bottom-4 -right-4 z-10 flex items-center gap-2.5 rounded-xl border border-borderw2 bg-void4 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.7)] motion-reduce:animate-none">
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
