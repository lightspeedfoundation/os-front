import { NextResponse } from "next/server";

import {
  MARQUEE_COIN_DEFS,
  MARQUEE_FALLBACK,
  rowFromGecko,
  type CoinGeckoSimpleUsd,
  type MarqueeRow,
} from "@/lib/marquee-ticker-data";

/** Cache JSON at the edge ~60s; CoinGecko free tier stays happy. */
export const revalidate = 60;

const COINGECKO_SIMPLE = "https://api.coingecko.com/api/v3/simple/price";

/** Cached proxy to CoinGecko public API (avoids browser CORS; eases rate limits via CDN cache headers). */
export async function GET() {
  const ids = MARQUEE_COIN_DEFS.map((d) => d.id).join(",");

  try {
    const url = new URL(COINGECKO_SIMPLE);
    url.searchParams.set("ids", ids);
    url.searchParams.set("vs_currencies", "usd");
    url.searchParams.set("include_24hr_change", "true");

    const res = await fetch(url.toString(), {
      headers: { accept: "application/json" },
    });

    if (!res.ok) {
      return jsonResponse(MARQUEE_FALLBACK, { stale: true }, 200);
    }

    const data = (await res.json()) as Record<string, CoinGeckoSimpleUsd>;

    const rows: MarqueeRow[] = MARQUEE_COIN_DEFS.map((d) =>
      rowFromGecko(d.symbol, d.id, data),
    );

    return jsonResponse(rows, { stale: false }, 200);
  } catch {
    return jsonResponse(MARQUEE_FALLBACK, { stale: true }, 200);
  }
}

function jsonResponse(rows: MarqueeRow[], extra: Record<string, boolean>, status: number) {
  return NextResponse.json({ rows, ...extra }, { status });
}
