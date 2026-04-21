import Link from "next/link";

import { SectionLabelDark } from "@/components/SectionLabelDark";
import { GITHUB_SPEED_MCP_URL } from "@/lib/site-links";

const ways = [
  {
    num: "01",
    icon: "✦",
    eyebrow: "Natural Language",
    title: "Intents",
    body: "Type your intent and Speed OS guides you toward the correct function syntax. Your vault unlocks only when something needs your signature.",
    tag: "Ask Speed",
    iconClass: "bg-neon-dim text-neon",
  },
  {
    num: "02",
    icon: "⌘",
    eyebrow: "Precise Commands",
    title: "Terminal",
    body: "When you need exact commands, open the terminal panel—same built-in tools as the desktop app, with nothing extra to install.",
    tag: "Cmd+K / Ctrl+K",
    iconClass: "bg-blue-500/10 text-blue-400",
  },
  {
    num: "03",
    icon: "◈",
    eyebrow: "One-key Access",
    title: "Dock & Panels",
    body: "Jump to Portfolio, Activity, Tokens, or Hyperliquid with simple keyboard shortcuts—the same layout documented in the extension guide.",
    tag: "Esc to close",
    iconClass: "bg-amber-500/10 text-amber-400",
  },
] as const;

export function SocialProof() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-28 border-t border-borderw bg-void px-6 py-24 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionLabelDark>Three ways to work</SectionLabelDark>
        <h2 className="font-display text-[clamp(36px,4vw,58px)] font-extrabold leading-[1.05] tracking-[-1.5px] text-soft">
          One product,
          <br />
          <span className="text-soft/30">three familiar entry points.</span>
        </h2>
        <p className="mt-4 max-w-[480px] text-[15px] font-light leading-[1.75] text-mutted2">
          Ask Speed for quick tasks, open the terminal for exact commands, or use the dock for portfolio and markets—however you work, the tools stay consistent.
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-borderw bg-borderw md:grid-cols-3">
          {ways.map((w) => (
            <article
              key={w.num}
              data-num={w.num}
              className="relative cursor-default bg-void2 p-8 transition-colors hover:bg-void3 md:p-9"
            >
              <span
                className="pointer-events-none absolute right-6 top-6 font-display text-[64px] font-extrabold leading-none tracking-[-4px] text-white/[0.03]"
                aria-hidden
              >
                {w.num}
              </span>
              <div
                className={`relative mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] text-xl ${w.iconClass}`}
                aria-hidden
              >
                {w.icon}
              </div>
              <p className="relative mb-2 font-display text-[11px] font-semibold uppercase tracking-[0.1em] text-mutted">
                {w.eyebrow}
              </p>
              <h3 className="relative mb-3 font-display text-[22px] font-bold tracking-tight text-soft">{w.title}</h3>
              <p className="relative text-[13px] font-light leading-[1.7] text-mutted2">{w.body}</p>
              <p className="relative mt-5 inline-flex rounded-md border border-borderw2 bg-void4 px-3 py-1 font-mono text-[11px] tracking-wide text-mutted2">
                {w.tag}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
