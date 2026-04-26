import Link from "next/link";
import { CHROME_WEB_STORE_URL } from "@/lib/chrome-store";
import { GITHUB_SPEED_MCP_URL } from "@/lib/site-links";

export function CtaBand() {
  return (
    <section className="border-t border-borderw bg-void px-6 py-24 md:px-10 md:py-28">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-3xl border border-borderw2 bg-void2 px-8 py-20 text-center md:px-20">
        <div
          className="pointer-events-none absolute bottom-[-100px] left-1/2 h-[300px] w-[600px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(0,255,135,0.08)_0%,transparent_70%)]"
          aria-hidden
        />
        <p className="relative text-[11px] font-medium uppercase tracking-[0.12em] text-neon">Ready to trade faster</p>
        <h2 className="relative mt-5 font-display text-[clamp(36px,4vw,60px)] font-extrabold leading-none tracking-[-2px] text-soft">
          Your new tab.
          <br />
          Your terminal.
        </h2>
        <p className="relative mx-auto mt-5 max-w-[400px] text-[15px] font-light leading-[1.75] text-mutted2">
          Install in 30 seconds. Keys stay on-device. No account required.
        </p>
        <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={CHROME_WEB_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[10px] bg-neon px-8 py-4 font-mono text-sm font-semibold text-black transition hover:bg-[#1aff95] hover:shadow-[0_0_32px_rgba(0,255,135,0.35)]"
          >
            <span aria-hidden>⚡</span>
            Add to Chrome
          </a>
          <a
            href={GITHUB_SPEED_MCP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[10px] border border-borderw2 px-7 py-[15px] font-mono text-sm text-mutted2 transition hover:border-white/20 hover:bg-borderw hover:text-soft"
          >
            View on GitHub ↗
          </a>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 rounded-[10px] border border-borderw2 px-7 py-[15px] font-mono text-sm text-mutted2 transition hover:border-white/20 hover:bg-borderw hover:text-soft"
          >
            Read guides (swap, bridge, MCP)
          </Link>
        </div>
        <div className="relative mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] text-mutted md:gap-6">
          <span>
            <span className="text-neon">✓</span> Free forever
          </span>
          <span>
            <span className="text-neon">✓</span> Open source MCP
          </span>
          <span>
            <span className="text-neon">✓</span> Keys on-device
          </span>
        </div>
      </div>
    </section>
  );
}
