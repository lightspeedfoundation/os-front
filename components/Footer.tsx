import Link from "next/link";

import { LogoMark } from "@/components/LogoMark";
import { CHROME_WEB_STORE_URL } from "@/lib/chrome-store";
import { GITHUB_SPEED_MCP_URL } from "@/lib/site-links";

export function Footer() {
  return (
    <footer className="border-t border-borderw bg-black text-mutted">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <Link href="/" className="group inline-flex items-center gap-3">
            <LogoMark variant="onDark" className="h-8 w-8 shrink-0 opacity-95 transition group-hover:opacity-100" />
            <span className="font-display text-[17px] font-bold tracking-tight text-soft">Speed OS</span>
          </Link>
          <p className="text-[12px] text-mutted">© {new Date().getFullYear()} Speed OS. All rights reserved.</p>
        </div>

        <div className="flex flex-wrap items-center gap-6 md:gap-8">
          <ul className="flex flex-wrap gap-5 text-[12px] md:gap-6">
            <li>
              <Link href="/#product" className="transition hover:text-soft">
                Product
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="transition hover:text-soft">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/learn" className="transition hover:text-soft">
                Learn
              </Link>
            </li>
            <li>
              <a
                href={CHROME_WEB_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-soft"
              >
                Chrome Web Store
              </a>
            </li>
            <li>
              <a
                href={GITHUB_SPEED_MCP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-soft"
              >
                GitHub
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-1.5 rounded-lg border border-borderw2 bg-void3 px-3 py-1.5 text-[11px] text-mutted2">
            <span className="h-1.5 w-1.5 rounded-full bg-neon" aria-hidden />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
