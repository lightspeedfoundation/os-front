import Link from "next/link";

import { LogoMark } from "@/components/LogoMark";
import { CHROME_WEB_STORE_URL } from "@/lib/chrome-store";
import { GITHUB_SPEED_MCP_URL } from "@/lib/site-links";

const links = [
  { href: "#product", label: "Product" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-[100] flex h-[60px] items-center border-b border-borderw bg-void/85 px-6 backdrop-blur-xl md:px-10">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 rounded-lg py-1 pr-2">
          <LogoMark variant="onDark" className="h-7 w-7 shrink-0" priority />
          <span className="font-display text-[17px] font-bold tracking-tight text-soft">Speed OS</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3.5 py-1.5 font-mono text-[12px] tracking-wide text-mutted transition hover:bg-borderw hover:text-soft"
            >
              {l.label}
            </a>
          ))}
          <a
            href={GITHUB_SPEED_MCP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3.5 py-1.5 font-mono text-[12px] tracking-wide text-mutted transition hover:bg-borderw hover:text-soft"
          >
            GitHub ↗
          </a>
        </nav>

        <details className="group relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg border border-borderw2 bg-void3 px-3 py-2 font-mono text-[12px] font-semibold text-soft [&::-webkit-details-marker]:hidden">
            Menu
            <span className="text-mutted transition group-open:rotate-180" aria-hidden>
              ▾
            </span>
          </summary>
          <div className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[220px] rounded-xl border border-borderw2 bg-void3/95 p-2 shadow-xl backdrop-blur-xl">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="block rounded-lg px-3 py-2.5 font-mono text-[13px] text-mutted2 transition hover:bg-borderw hover:text-soft"
              >
                {l.label}
              </a>
            ))}
            <a
              href={GITHUB_SPEED_MCP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg px-3 py-2.5 font-mono text-[13px] text-mutted2 transition hover:bg-borderw hover:text-soft"
            >
              GitHub ↗
            </a>
            <a
              href={CHROME_WEB_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block rounded-lg bg-neon px-3 py-2.5 text-center font-mono text-[13px] font-semibold text-black"
            >
              Add to Chrome
            </a>
          </div>
        </details>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href={CHROME_WEB_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg bg-neon px-5 py-2 font-mono text-[12px] font-semibold uppercase tracking-wide text-black transition hover:bg-[#1aff95] hover:shadow-[0_0_24px_rgba(0,255,135,0.35)] sm:inline-flex"
          >
            Add to Chrome
          </a>
        </div>
      </div>
    </header>
  );
}
