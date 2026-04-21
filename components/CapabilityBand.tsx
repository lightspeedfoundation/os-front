import Link from "next/link";

import { LogoMark } from "@/components/LogoMark";
import { SectionLabelDark } from "@/components/SectionLabelDark";
import { GITHUB_SPEED_MCP_URL } from "@/lib/site-links";

/** Partner marks in `/public/brand/integrations/` */
const INTEGRATION_ICONS = {
  zerox: "/brand/integrations/0x.svg",
  squid: "/brand/integrations/squid.svg",
  hyperliquid: "/brand/integrations/hyperliquid.svg",
} as const;

const cards = [
  {
    badge: "Swaps & Quotes",
    badgeClass: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    title: "Token swaps, done right.",
    body: "Get a quote, approve a token if needed, and swap—from Ask Speed or from the terminal. 0x routing finds optimal prices across liquidity sources.",
    footer: (
      <>
        <span className="flex h-[22px] max-w-[48px] shrink-0 items-center justify-center overflow-hidden rounded-md border border-blue-500/25 bg-white px-1.5 py-[3px]">
          <img
            src={INTEGRATION_ICONS.zerox}
            alt=""
            width={394}
            height={241}
            className="h-[11px] w-auto max-h-[11px] object-contain object-center"
            decoding="async"
          />
        </span>
        <strong className="font-medium text-mutted2">Powered by 0x Protocol</strong>
      </>
    ),
  },
  {
    badge: "Cross-chain Bridging",
    badgeClass: "border-cyan/20 bg-cyan/10 text-cyan",
    title: "Move assets anywhere.",
    body: "Bridge between networks using Squid—the same bridging flows as the desktop app. EVM and beyond. Fewer tab hops, less copy-paste.",
    footer: (
      <>
        <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/15 bg-white p-[3px]">
          {/* Black artwork on light chip — stays crisp on dark cards */}
          <img
            src={INTEGRATION_ICONS.squid}
            alt=""
            width={16}
            height={16}
            className="h-3.5 w-3.5 object-contain"
            decoding="async"
          />
        </span>
        <strong className="font-medium text-mutted2">Powered by Squid Router</strong>
      </>
    ),
  },
  {
    badge: "Derivatives",
    badgeClass: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    title: "Hyperliquid, fully wired.",
    body: "Deposits, withdrawals, perps, and spot—wired through Hyperliquid’s APIs. When your vault is unlocked, use the positions panel in the dock.",
    footer: (
      <>
        <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#97fce4]/25 bg-[#0a1614] p-[3px]">
          <img
            src={INTEGRATION_ICONS.hyperliquid}
            alt=""
            width={18}
            height={18}
            className="h-[14px] w-[14px] object-contain"
            decoding="async"
          />
        </span>
        <strong className="font-medium text-mutted2">Hyperliquid L1</strong>
      </>
    ),
  },
  {
    badge: "Operator View",
    badgeClass: "border-neon/20 bg-neon-dim text-neon",
    title: "Portfolio at a glance.",
    body: "See who you’re signed in as, run diagnostics, read balances, and check pending activity—operator-style reads in one panel.",
    footer: (
      <>
        <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center overflow-hidden rounded-md border border-neon/25 bg-[#060608] p-[2px]">
          <LogoMark variant="onDark" className="h-[17px] w-[17px]" />
        </span>
        <strong className="font-medium text-mutted2">Built-in status panel</strong>
      </>
    ),
  },
] as const;

export function CapabilityBand() {
  return (
    <section className="border-t border-borderw bg-void px-6 pb-24 pt-16 md:px-10 md:pb-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabelDark>What you can do</SectionLabelDark>
        <h2 className="font-display text-[clamp(36px,4vw,58px)] font-extrabold leading-[1.05] tracking-[-1.5px] text-soft">
          Trade and track
          <br />
          <span className="text-soft/30">in one Chrome surface.</span>
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <article className="relative overflow-hidden rounded-2xl border border-borderw bg-void2 p-8 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-10 lg:p-10">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-neon/20 bg-neon-dim px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-neon">
                Speed CLI · Inside Chrome
              </span>
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-soft">Full terminal. Zero installs.</h3>
              <p className="mt-3 text-[13px] font-light leading-[1.75] text-mutted2">
                Everything runs inside the extension. The default MCP server is{" "}
                <span className="text-soft/90">mcp.ispeed.pro</span>—or run it locally from the open-source repo on{" "}
                <Link href={GITHUB_SPEED_MCP_URL} className="text-neon underline-offset-2 hover:underline">
                  GitHub
                </Link>
                . Chains, amounts, and everyday words work the same here as in the desktop app.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[12px] text-mutted">
                <kbd className="rounded-md border border-borderw2 bg-void4 px-2.5 py-1 font-medium text-mutted2">⌘</kbd>
                <span>+</span>
                <kbd className="rounded-md border border-borderw2 bg-void4 px-2.5 py-1 font-medium text-mutted2">K</kbd>
                <span className="ml-1">open terminal</span>
                <span className="mx-2 text-borderw2">|</span>
                <kbd className="rounded-md border border-borderw2 bg-void4 px-2.5 py-1 font-medium text-mutted2">Esc</kbd>
                <span className="ml-1">close panels</span>
              </div>
              <p className="mt-6 flex flex-wrap items-center gap-2 border-t border-borderw pt-6 text-[11px] text-mutted">
                <span className="truncate font-mono text-[11px] text-mutted2">{GITHUB_SPEED_MCP_URL.replace("https://", "")}</span>
                <span className="text-borderw2">·</span>
                <strong className="font-medium text-mutted2">Open source</strong>
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border border-borderw2 bg-void3 lg:mt-0">
              <div className="flex items-center gap-2 border-b border-borderw bg-void4 px-3.5 py-2.5 font-mono text-[11px] text-mutted">
                <span className="text-[8px] text-neon" aria-hidden>
                  ●
                </span>
                Terminal · Speed OS
              </div>
              <div className="space-y-2 p-4 font-mono text-[12px] leading-loose">
                <div className="flex gap-2">
                  <span className="text-neon">$</span>
                  <span className="text-soft">
                    speed swap <span className="text-amber-400">0.5 ETH</span>{" "}
                    <span className="text-cyan">usdc</span> --chain base
                  </span>
                </div>
                <p className="pl-4 text-mutted">Fetching quote from 0x…</p>
                <p className="pl-4 text-mutted2">
                  <span className="text-neon">✓</span> Quote: 0.5 ETH → 1,620 USDC (impact 0.02%)
                </p>
                <div className="flex gap-2">
                  <span className="text-neon">$</span>
                  <span className="text-soft">
                    speed bridge <span className="text-amber-400">100 USDC</span>{" "}
                    <span className="text-cyan">arbitrum</span>
                  </span>
                </div>
                <p className="pl-4 text-mutted2">
                  <span className="text-neon">✓</span> Bridge via Squid · ETA 2 min
                </p>
                <div className="flex gap-2">
                  <span className="text-neon">$</span>
                  <span className="text-soft">
                    speed hl deposit <span className="text-amber-400">500 USDC</span>
                  </span>
                </div>
                <p className="pl-4 text-amber-400">⟳ Unlocking vault for signature…</p>
                <p className="pl-4 text-mutted2">
                  <span className="text-neon">✓</span> Deposited to Hyperliquid{" "}
                  <span className="ml-1 inline-block h-3.5 w-2 animate-pulse bg-neon align-middle" aria-hidden />
                </p>
              </div>
            </div>
          </article>

          {cards.map((c) => (
            <article
              key={c.title}
              className="group relative overflow-hidden rounded-2xl border border-borderw bg-void2 p-8 transition hover:-translate-y-0.5 hover:border-neon/20 motion-reduce:transform-none"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent opacity-0 transition group-hover:opacity-100"
                aria-hidden
              />
              <span
                className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${c.badgeClass}`}
              >
                {c.badge}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-soft">{c.title}</h3>
              <p className="mt-3 text-[13px] font-light leading-[1.75] text-mutted2">{c.body}</p>
              <div className="mt-5 flex items-center gap-2 border-t border-borderw pt-5 text-[11px] text-mutted">{c.footer}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
