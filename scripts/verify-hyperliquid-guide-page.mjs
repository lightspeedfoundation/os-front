/**
 * Connect to Brave/Chromium on CDP, open the Hyperliquid guide on localhost, report
 * title, HowTo JSON-LD, and broken guide images. Does not close your browser.
 *
 *   node scripts/verify-hyperliquid-guide-page.mjs
 *   BRAVE_CDP_URL=http://127.0.0.1:9222 INFOSITE_BASE=http://127.0.0.1:3001 node ...
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INFOSITE_ROOT = path.join(__dirname, "..");
const CDP = process.env.BRAVE_CDP_URL || "http://127.0.0.1:9222";
const PATH = "/guides/hyperliquid-setup-in-browser";

const STEP_FILES = [1, 2, 3, 4, 5].map((n) =>
  path.join(INFOSITE_ROOT, "public", "images", "guides", "hyperliquid-setup-in-browser", `step-${n}.png`),
);

async function pickWorkingBase() {
  const bases = (process.env.INFOSITE_BASE || "http://127.0.0.1:3000,http://127.0.0.1:3001")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  for (const base of bases) {
    try {
      const u = new URL(PATH, base).href;
      const r = await fetch(u, { redirect: "manual" });
      if (r.ok || r.status === 304) return { base, url: u };
    } catch {
      /* try next */
    }
  }
  return null;
}

async function main() {
  console.log("CDP:", CDP);
  for (const f of STEP_FILES) {
    const ok = fs.existsSync(f) && fs.statSync(f).size > 200;
    console.log(ok ? "✓" : "✗", "asset", path.relative(INFOSITE_ROOT, f), ok ? `(${fs.statSync(f).size} bytes)` : "(missing or tiny)");
  }

  const picked = await pickWorkingBase();
  if (!picked) {
    console.error("\nNo reachable infosite for", PATH, "— start `npm run dev` or `npx next start -p 3000` (or set INFOSITE_BASE).");
    process.exit(1);
  }
  const { url } = picked;
  console.log("\nUsing", url);

  let browser;
  try {
    browser = await chromium.connectOverCDP(CDP);
  } catch (e) {
    console.error("connectOverCDP failed:", (e && e.message) || e);
    process.exit(1);
  }

  const ctx = browser.contexts()[0];
  if (!ctx) {
    console.error("No browser context from CDP.");
    process.exit(1);
  }

  const page = await ctx.newPage();
  const errors = [];
  const badResponses = [];
  page.on("response", (r) => {
    const s = r.status();
    if (s >= 400) badResponses.push(`${s} ${r.url()}`);
  });
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
  });

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await new Promise((r) => setTimeout(r, 1500));

    const title = await page.title();
    console.log("Title:", title);

    const howTo = await page.evaluate(() => {
      const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
      for (const s of scripts) {
        try {
          const j = JSON.parse(s.textContent || "");
          const stack = Array.isArray(j) ? j : [j];
          for (const item of stack) {
            if (item["@type"] === "HowTo") return item;
          }
        } catch {
          /* skip */
        }
      }
      return null;
    });

    if (howTo) {
      const n = Array.isArray(howTo.step) ? howTo.step.length : 0;
      console.log("HowTo JSON-LD: name=", howTo.name, "| steps=", n);
      if (n !== 5) console.warn("  expected 5 HowTo steps for this guide, got", n);
    } else {
      console.warn("No HowTo JSON-LD block found on page.");
    }

    const imgReport = await page.evaluate(() => {
      const imgs = [...document.querySelectorAll("img")].filter((img) =>
        /hyperliquid-setup-in-browser\/step-\d/.test(img.currentSrc || img.src || ""),
      );
      return imgs.map((img) => ({
        src: img.currentSrc || img.src,
        w: img.naturalWidth,
        h: img.naturalHeight,
        ok: img.naturalWidth > 0 && img.naturalHeight > 0,
      }));
    });

    console.log("\nGuide step images in DOM:", imgReport.length);
    for (const row of imgReport) {
      console.log(row.ok ? "  ✓" : "  ✗", row.w, "×", row.h, row.src.split("/").slice(-2).join("/"));
    }
    if (imgReport.length < 5) console.warn("  (fewer than 5 step images matched path pattern — check MDX / layout)");

    if (badResponses.length) {
      console.log("\nHTTP errors:");
      for (const e of [...new Set(badResponses)].slice(0, 12)) console.log(" ", e);
    }
    if (errors.length) {
      console.log("\nErrors during load:");
      for (const e of errors.slice(0, 15)) console.log(" ", e);
      if (errors.length > 15) console.log(" ", `… +${errors.length - 15} more`);
    } else if (!badResponses.length) {
      console.log("\nNo pageerror/console.error captured.");
    }

    const out = path.join(INFOSITE_ROOT, "..", "infosite-verify-hl-guide-cdp.png");
    await page.screenshot({ path: out, fullPage: true, type: "png" });
    console.log("\nFull-page screenshot:", out);
  } finally {
    await page.close().catch(() => {});
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
