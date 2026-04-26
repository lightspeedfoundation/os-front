/**
 * CDP: refresh only bridge-tokens-across-chains-in-browser step-1…step-3.
 * Same layout rules as capture-full-tutorial (wide viewport, wait for .confirm-card--ready + Run).
 * From infosite/: node scripts/capture-bridge-guides.mjs
 */
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INFOSITE = path.join(__dirname, "..");
const SLUG = "bridge-tokens-across-chains-in-browser";
const gdir = path.join(INFOSITE, "public", "images", "guides", SLUG);
const CDP = process.env.BRAVE_CDP_URL || "http://127.0.0.1:9222";
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function pickPage(browser) {
  const pgs = [];
  for (const c of browser.contexts()) pgs.push(...c.pages());
  if (pgs.length === 0) return browser.contexts()[0].newPage();
  const raw = process.env.BRAVE_PAGE_INDEX;
  if (raw === "last" || raw === "-1") return pgs[pgs.length - 1];
  const i = raw != null && raw !== "" ? parseInt(String(raw), 10) : 0;
  return pgs[Number.isFinite(i) ? Math.min(pgs.length - 1, Math.max(0, i)) : 0];
}

async function goNtp(page) {
  await page.goto("chrome://newtab/", { waitUntil: "domcontentloaded", timeout: 60_000 }).catch(() => {});
  await delay(Number(process.env.NTP_LOAD_MS) || 5000);
}

function askLocator(page) {
  return page.getByRole("combobox", { name: /Ask Speed/i });
}

async function main() {
  const bridgeW = Number(process.env.BRIDGE_CAPTURE_WIDTH) || 1680;
  const bridgeH = Number(process.env.BRIDGE_CAPTURE_HEIGHT) || 900;
  const browser = await chromium.connectOverCDP(CDP);
  const page = await pickPage(browser);
  await page.bringToFront().catch(() => {});

  const shot = (name) => path.join(gdir, name);

  try {
    await page.setViewportSize({ width: bridgeW, height: bridgeH });
    await goNtp(page);
    await page.screenshot({ path: shot("step-1.png"), type: "png" });
    console.log("Wrote bridge step-1");

    const ask = askLocator(page);
    await ask.click({ timeout: 20_000 });
    await ask.fill("speed bridge 0.01 eth from base to arbitrum", { timeout: 20_000 });
    await page.locator("aside.confirm-card.confirm-card--ready").waitFor({ state: "visible", timeout: 90_000 });
    await page.getByRole("button", { name: /^Run$/ }).waitFor({ state: "visible", timeout: 15_000 });
    await delay(800);
    await page.screenshot({ path: shot("step-2.png"), type: "png" });
    console.log("Wrote bridge step-2 (quote on right, Run enabled)");

    await page.getByRole("button", { name: /^Run$/ }).click({ timeout: 15_000 });
    await delay(8_000);
    await page.screenshot({ path: shot("step-3.png"), type: "png" });
    console.log("Wrote bridge step-3");
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
