/** CoinGecko `/simple/price` docs: https://docs.coingecko.com/reference/simple-price */

export type MarqueeDir = "up" | "down" | "flat";

export type MarqueeRow = {
  symbol: string;
  price: string;
  change: string;
  dir: MarqueeDir;
};

export type CoinGeckoSimpleUsd = {
  usd?: number;
  usd_24h_change?: number | null;
};

/** Ordered line items (symbols shown in the marquee). CoinGecko `id` values (public ids, not secrets). */
export const MARQUEE_COIN_DEFS: { symbol: string; id: string }[] = [
  { symbol: "ETH", id: "ethereum" },
  { symbol: "BTC", id: "bitcoin" },
  { symbol: "SOL", id: "solana" },
  { symbol: "ARB", id: "arbitrum" },
  { symbol: "OP", id: "optimism" },
  { symbol: "USDC", id: "usd-coin" },
  { symbol: "HYPE", id: "hyperliquid" },
  { symbol: "SPEED", id: "lightspeed" },
  { symbol: "CORE", id: "warpcore" },
];

export const MARQUEE_FALLBACK: MarqueeRow[] = [
  { symbol: "ETH", price: "$3,241.80", change: "+1.24%", dir: "up" },
  { symbol: "BTC", price: "$67,420", change: "+0.85%", dir: "up" },
  { symbol: "SOL", price: "$154.20", change: "-0.43%", dir: "down" },
  { symbol: "ARB", price: "$0.92", change: "+3.12%", dir: "up" },
  { symbol: "OP", price: "$2.14", change: "+1.88%", dir: "up" },
  { symbol: "USDC", price: "$1.0001", change: "+0.01%", dir: "flat" },
  { symbol: "HYPE", price: "$24.80", change: "+5.3%", dir: "up" },
  { symbol: "SPEED", price: "$0.048", change: "+12.4%", dir: "up" },
  { symbol: "CORE", price: "$0.12", change: "+2.1%", dir: "up" },
];

function fallbackRow(symbol: string): MarqueeRow {
  return (
    MARQUEE_FALLBACK.find((r) => r.symbol === symbol) ?? {
      symbol,
      price: "—",
      change: "—",
      dir: "flat",
    }
  );
}

/** Format USD for marquee (compact; more decimals when price is small). */
export function formatUsdMarquee(usd: number): string {
  if (!Number.isFinite(usd)) return "—";
  const a = Math.abs(usd);
  let maxFrac = 2;
  if (a < 0.0001) maxFrac = 6;
  else if (a < 0.01) maxFrac = 5;
  else if (a < 1) maxFrac = 4;
  else if (a < 1000) maxFrac = 2;
  else if (a < 10000) maxFrac = 2;
  else maxFrac = 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: maxFrac,
    maximumFractionDigits: maxFrac,
  }).format(usd);
}

export function formatPctChange(pct: number | null | undefined): { text: string; dir: MarqueeDir } {
  if (pct == null || Number.isNaN(pct)) {
    return { text: "—", dir: "flat" };
  }
  const abs = Math.abs(pct);
  const sign = pct > 0 ? "+" : pct < 0 ? "" : "";
  const decimals = abs >= 100 ? 1 : abs >= 10 ? 2 : 2;
  const text = `${sign}${pct.toFixed(decimals)}%`;
  const dir: MarqueeDir = abs < 0.0005 ? "flat" : pct > 0 ? "up" : "down";
  return { text, dir };
}

export function rowFromGecko(
  symbol: string,
  geckoId: string,
  data: Record<string, CoinGeckoSimpleUsd> | null | undefined,
): MarqueeRow {
  const fb = fallbackRow(symbol);
  if (!data?.[geckoId]) return fb;

  const p = data[geckoId];
  const usd = p.usd;
  if (usd == null || !Number.isFinite(usd)) return fb;

  const { text, dir } = formatPctChange(p.usd_24h_change);
  return {
    symbol,
    price: formatUsdMarquee(usd),
    change: text,
    dir,
  };
}
