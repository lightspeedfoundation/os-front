"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

function Shortcut({
  keys,
  label,
}: {
  keys: ReactNode;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap">
      <span className="inline-flex items-center gap-0.5">{keys}</span>
      <span className="text-[9px] leading-none text-white/40">{label}</span>
    </span>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded border border-white/[0.18] bg-[#141416] px-[5px] py-px font-mono text-[9px] font-medium leading-none text-soft/90 shadow-[inset_0_-1px_0_rgba(0,0,0,0.35)]">
      {children}
    </kbd>
  );
}

const PREVIEW_BG_VIDEO = "/assets/default.webm";

/** Visual match for Speed OS new tab: clock, greeting, ETH chip, Ask bar, shortcut legend. */
export function HeroNewTabPreview() {
  const [now, setNow] = useState<Date | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const greeting = useMemo(() => {
    if (!now) return "Good evening";
    const h = now.getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  }, [now]);

  const clock = now ? `${pad2(now.getHours())}:${pad2(now.getMinutes())}` : "--:--";

  return (
    <div className="relative w-full min-w-0">
      <div className="relative overflow-hidden rounded-[22px] border border-white/[0.1] bg-black shadow-[0_24px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]">
        {!reduceMotion ? (
          <video
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
            aria-hidden
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={PREVIEW_BG_VIDEO} type="video/webm" />
          </video>
        ) : null}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-black/45 to-black/60"
          aria-hidden
        />
        <div className="relative z-[2] flex min-h-[400px] flex-col items-center px-6 pb-10 pt-14 text-center sm:px-10 md:min-h-[420px] md:px-12 md:pt-16 lg:px-14">
          <p className="font-display text-[13px] font-medium tracking-wide text-neon md:text-[14px]">
            {greeting}, Agent
          </p>
          <p className="mt-2 font-mono text-[clamp(2.75rem,8vw,4rem)] font-medium tabular-nums tracking-[-0.06em] text-neon md:mt-3">
            {clock}
          </p>

          <div className="mt-5 rounded-full border border-neon/35 bg-[#061510] px-4 py-1.5 font-mono text-[12px] font-medium tracking-wide text-neon md:mt-6">
            ETH • $2,351
          </div>

          <div className="mt-10 w-full md:mt-12">
            <div className="rounded-[14px] border border-white/[0.1] bg-[#000000] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="border-b border-white/[0.06] px-4 py-3 text-left sm:px-5 md:py-4 lg:px-6">
                <label htmlFor="hero-ask-demo" className="sr-only">
                  Ask Speed (preview)
                </label>
                <input
                  id="hero-ask-demo"
                  readOnly
                  tabIndex={-1}
                  aria-hidden
                  placeholder="Ask Speed — swap, bridge, hl open, balance..."
                  className="w-full cursor-default bg-transparent font-mono text-[13px] text-soft placeholder:text-white/[0.28] focus:outline-none md:text-[14px]"
                />
              </div>
              <div className="flex flex-wrap items-center justify-start gap-x-2 gap-y-1.5 px-4 py-2 font-mono text-[9px] leading-tight text-white/38 sm:px-5">
                <Shortcut
                  keys={
                    <>
                      <Kbd>↑</Kbd>
                      <Kbd>↓</Kbd>
                    </>
                  }
                  label="suggestions"
                />
                <Shortcut keys={<Kbd>Enter</Kbd>} label="fill or run" />
                <Shortcut keys={<Kbd>⌘K</Kbd>} label="terminal" />
                <Shortcut keys={<Kbd>/</Kbd>} label="quick" />
                <Shortcut
                  keys={
                    <>
                      <Kbd>P</Kbd>
                      <Kbd>A</Kbd>
                      <Kbd>T</Kbd>
                      <Kbd>H</Kbd>
                    </>
                  }
                  label="panels"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
