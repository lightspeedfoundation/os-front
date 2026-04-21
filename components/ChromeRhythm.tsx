import { SectionLabelDark } from "@/components/SectionLabelDark";

const perms = [
  {
    title: "storage",
    desc: "Saves your preferences and vault state locally in Chrome. Your keys stay in the extension’s protected storage.",
  },
  {
    title: "alarms / background",
    desc: "Notifies you when activity succeeds or fails. Keeps price feeds and pending transactions current in the background—no open tab required.",
  },
  {
    title: "notifications",
    desc: "Optional alerts when a transaction confirms or a bridge completes—you control whether they’re on.",
  },
  {
    title: "permissions",
    desc: "Replaces the new tab with Speed OS and connects to the same HTTPS endpoints used for trading",
  },
] as const;

const keys = ["Cmd+K / Ctrl+K", "/", "Esc", "P", "A", "T", "H"];

export function ChromeRhythm() {
  return (
    <section className="border-t border-borderw bg-void2 px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabelDark>Built for Chrome</SectionLabelDark>
        <h2 className="font-display text-[clamp(36px,4vw,58px)] font-extrabold leading-[1.05] tracking-[-1.5px] text-soft">
          Permissions you
          <br />
          <span className="text-soft/30">can verify.</span>
        </h2>
        <p className="mt-4 max-w-[520px] text-[15px] font-light leading-[1.75] text-mutted2">
          What we ask Chrome for matches what the extension does. Compare this page to{" "}
          <code className="rounded bg-void4 px-1.5 py-0.5 font-mono text-[12px] text-mutted2">manifest.json</code>{" "}
          anytime.
        </p>

        <div className="mt-12 grid gap-3 md:grid-cols-2">
          {perms.map((p) => (
            <div key={p.title} className="flex gap-3.5 rounded-xl border border-borderw bg-void px-5 py-5 md:gap-4 md:px-6">
              <div
                className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-neon/30 bg-neon-dim text-[11px] text-neon"
                aria-hidden
              >
                ✓
              </div>
              <div>
                <p className="font-mono text-[13px] font-medium text-soft">{p.title}</p>
                <p className="mt-1 text-[12px] font-light leading-relaxed text-mutted">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-borderw bg-void p-6 md:p-8">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-mutted">Shortcuts</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {keys.map((k) => (
              <kbd
                key={k}
                className="rounded-lg border border-borderw2 border-b-2 bg-void4 px-2.5 py-1.5 font-mono text-[11px] font-medium text-mutted2"
              >
                {k}
              </kbd>
            ))}
          </div>
          <p className="mt-5 text-[13px] font-light leading-relaxed text-mutted2">
            Open the terminal overlay, jump to dock panels, and close overlays—the same defaults we document for the new tab experience.
          </p>
        </div>
      </div>
    </section>
  );
}
