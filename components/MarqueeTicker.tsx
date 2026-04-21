"use client";

import { useEffect, useState } from "react";

import {
  MARQUEE_FALLBACK,
  type MarqueeRow,
} from "@/lib/marquee-ticker-data";

function Item({ t }: { t: MarqueeRow }) {
  return (
    <span className="inline-flex items-center gap-2.5 border-r border-borderw px-7 py-3 text-[12px] text-mutted2 first:pl-7 last:border-r-0">
      <span className="font-medium text-soft">{t.symbol}</span>
      <span>{t.price}</span>
      <span
        className={
          t.dir === "up"
            ? "text-neon"
            : t.dir === "down"
              ? "text-red-400"
              : "text-mutted"
        }
      >
        {t.change}
      </span>
    </span>
  );
}

const REFRESH_MS = 120_000;

/** Live prices from CoinGecko via `/api/marquee`; falls back to static data offline or on API errors. */
export function MarqueeTicker() {
  const [rows, setRows] = useState<MarqueeRow[]>(MARQUEE_FALLBACK);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/marquee", { cache: "no-store" });
        if (!res.ok) return;
        const json: unknown = await res.json();
        if (
          cancelled ||
          typeof json !== "object" ||
          json === null ||
          !Array.isArray((json as { rows?: unknown }).rows)
        ) {
          return;
        }
        const next = (json as { rows: MarqueeRow[] }).rows.filter(
          (r): r is MarqueeRow =>
            r &&
            typeof r.symbol === "string" &&
            typeof r.price === "string" &&
            typeof r.change === "string" &&
            (r.dir === "up" || r.dir === "down" || r.dir === "flat"),
        );
        if (next.length > 0) setRows(next);
      } catch {
        /* keep fallback */
      }
    }

    void load();
    const id = window.setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <div className="relative overflow-hidden border-y border-borderw bg-void2 py-3" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-12 bg-gradient-to-r from-void2 to-transparent md:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-12 bg-gradient-to-l from-void2 to-transparent md:w-20" />
      <div className="hidden flex-wrap justify-center gap-x-6 gap-y-2 motion-reduce:flex">
        {rows.map((t, i) => (
          <Item key={`static-${t.symbol}-${i}`} t={t} />
        ))}
      </div>
      <div className="flex w-max animate-marquee gap-0 whitespace-nowrap motion-reduce:hidden">
        <div className="flex shrink-0">
          {rows.map((t, i) => (
            <Item key={`a-${t.symbol}-${i}`} t={t} />
          ))}
        </div>
        <div className="flex shrink-0">
          {rows.map((t, i) => (
            <Item key={`b-${t.symbol}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
