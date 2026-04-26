/**
 * Connects to Brave (BRAVE_CDP_URL, default http://127.0.0.1:9222), loads chrome://newtab/ before each file, writes all 9 PNGs.
 * Every image is a new-tab frame — not swap/bridge/vault-specific. For real step-2/3 UI, use manual staging +
 * `capture-guide-screenshots.mjs --cdp` (interactive) or extend this script with product selectors.
 * Run: npm run capture:guide-burst:cdp  (from infosite/)
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const SHOTS = [
  ["swap-eth-to-usdc-in-browser", 1],
  ["swap-eth-to-usdc-in-browser", 2],
  ["swap-eth-to-usdc-in-browser", 3],
  ["bridge-tokens-across-chains-in-browser", 1],
  ["bridge-tokens-across-chains-in-browser", 2],
  ["bridge-tokens-across-chains-in-browser", 3],
  ["unlock-vault-for-signing", 1],
  ["unlock-vault-for-signing", 2],
  ["unlock-vault-for-signing", 3],
];

const url = process.env.BRAVE_CDP_URL || "http://127.0.0.1:9222";
const ntpWait = Number(process.env.NTP_LOAD_MS) || 4000;
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

function flattenPages(browser) {
  const out = [];
  for (const c of browser.contexts()) out.push(...c.pages());
  return out;
}

async function pickPage(browser) {
  const pgs = flattenPages(browser);
  if (pgs.length) {
    const raw = process.env.BRAVE_PAGE_INDEX;
    if (raw === "last" || raw === "-1") return pgs[pgs.length - 1];
    const i = raw ? parseInt(String(raw), 10) : 0;
    return pgs[Number.isFinite(i) ? Math.min(pgs.length - 1, Math.max(0, i)) : 0];
  }
  return browser.contexts()[0].newPage();
}

async function goNtp(page) {
  try {
    await page.goto("chrome://newtab/", { waitUntil: "domcontentloaded", timeout: 60_000 });
  } catch {
    await page.goto("about:blank", { waitUntil: "domcontentloaded", timeout: 30_000 });
  }
  try {
    await page.waitForSelector("#root, body", { timeout: 20_000 });
  } catch {
    /* ok */
  }
  await delay(ntpWait);
}

async function main() {
  console.log("Connecting to", url, "…");
  const browser = await chromium.connectOverCDP(url);
  const page = await pickPage(browser);
  await page.bringToFront().catch(() => {});

  try {
    for (const [slug, step] of SHOTS) {
      const dir = path.join(ROOT, "public", "images", "guides", slug);
      fs.mkdirSync(dir, { recursive: true });
      const out = path.join(dir, `step-${step}.png`);
      await goNtp(page);
      await page.screenshot({ path: out, type: "png" });
      console.log("Wrote", out);
    }
  } finally {
    await browser.close();
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
