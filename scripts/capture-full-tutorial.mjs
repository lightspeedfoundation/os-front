/**
 * CDP: capture all guide step-1…step-3 images (input → quote → execution for swap/bridge; unlock uses capture-locked + command).
 * From infosite/: node scripts/capture-full-tutorial.mjs
 * Prereq: Brave --remote-debugging-port=9222; vault unlocked. Optional: BRAVE_CDP_URL, BRAVE_PAGE_INDEX, NTP_LOAD_MS
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INFOSITE = path.join(__dirname, "..");
const gdir = (slug) => path.join(INFOSITE, "public", "images", "guides", slug);

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

function writeAllStep1(buf) {
  for (const slug of [
    "swap-eth-to-usdc-in-browser",
    "bridge-tokens-across-chains-in-browser",
    "unlock-vault-for-signing",
  ]) {
    const d = gdir(slug);
    fs.mkdirSync(d, { recursive: true });
    fs.writeFileSync(path.join(d, "step-1.png"), buf);
  }
}

function askLocator(page) {
  return page.getByRole("combobox", { name: /Ask Speed/i });
}

async function main() {
  console.log("CDP", CDP);
  const browser = await chromium.connectOverCDP(CDP);
  const page = await pickPage(browser);
  await page.bringToFront().catch(() => {});

  const shot = (slug, name) => path.join(gdir(slug), name);

  try {
    // Step 1 — new tab (all guides)
    await goNtp(page);
    writeAllStep1(await page.screenshot({ type: "png" }));
    console.log("Wrote step-1.png (swap, bridge, unlock).");

    // —— Swap: quote = step-2, execute/preview = step-3
    const ask = askLocator(page);
    await ask.click({ timeout: 20_000 });
    await ask.fill("speed quote pay eth receive usdc amount 0.0001", { timeout: 20_000 });
    await ask.press("Enter");
    await delay(1500);
    // Suggestions may consume first Enter; second Enter commits / runs the quote.
    await ask.press("Enter").catch(() => {});
    await delay(12_000);
    await page.screenshot({ path: shot("swap-eth-to-usdc-in-browser", "step-2.png"), type: "png" });
    console.log("Wrote swap step-2 (quote / route).");

    await page.getByRole("button", { name: /run|execute|sign|submit|proceed|confirm|swap|trade|quote/i })
      .first()
      .click({ timeout: 5_000 })
      .catch(() => {});
    await page.keyboard.press("Enter").catch(() => {});
    await delay(4_000);
    await page.screenshot({ path: shot("swap-eth-to-usdc-in-browser", "step-3.png"), type: "png" });
    console.log("Wrote swap step-3 (execution / sign / preview).");

    // —— Bridge: new tab, route, sign/track
    // Syntax: speed bridge <amount> <token> from <sourceChain> to <destChain>
    // UI: intent on the left, Confirm + quote in aside.confirm-card on the right; .confirm-card--ready when quote
    // finished and **Run** is enabled (bridge can run). Wide viewport keeps both columns in frame.
    const bridgeW = Number(process.env.BRIDGE_CAPTURE_WIDTH) || 1680;
    const bridgeH = Number(process.env.BRIDGE_CAPTURE_HEIGHT) || 900;
    await page.setViewportSize({ width: bridgeW, height: bridgeH });
    await goNtp(page);
    await page.screenshot({ path: shot("bridge-tokens-across-chains-in-browser", "step-1.png"), type: "png" });
    console.log("Wrote bridge step-1 (wide layout for split view).");

    const ask2 = askLocator(page);
    await ask2.click({ timeout: 20_000 });
    await ask2.fill("speed bridge 0.01 eth from base to arbitrum", { timeout: 20_000 });
    // Typing triggers debounced quote fetch — do NOT press Enter here (Enter submits Run while confirm is open).
    await page.locator("aside.confirm-card.confirm-card--ready").waitFor({ state: "visible", timeout: 90_000 });
    await page.getByRole("button", { name: /^Run$/ }).waitFor({ state: "visible", timeout: 15_000 });
    await delay(800);
    await page.screenshot({ path: shot("bridge-tokens-across-chains-in-browser", "step-2.png"), type: "png" });
    console.log("Wrote bridge step-2 (left: route line, right: quote + Run when bridge can run).");

    await page.getByRole("button", { name: /^Run$/ }).click({ timeout: 15_000 });
    await delay(8_000);
    await page.screenshot({ path: shot("bridge-tokens-across-chains-in-browser", "step-3.png"), type: "png" });
    console.log("Wrote bridge step-3 (after Run / execution or progress).");

    // —— Unlock: step-2 = locked (existing capture), step-3 = command + activity
    const locked = path.join(gdir("unlock-vault-for-signing"), "capture-locked.png");
    if (fs.existsSync(locked)) {
      fs.copyFileSync(locked, path.join(gdir("unlock-vault-for-signing"), "step-2.png"));
      console.log("unlock step-2: copied capture-locked.png");
    } else {
      await page.screenshot({ path: shot("unlock-vault-for-signing", "step-2.png"), type: "png" });
      console.log("unlock step-2: no capture-locked, wrote current tab");
    }

    await goNtp(page);
    const ask3 = askLocator(page);
    await ask3.click({ timeout: 20_000 });
    await ask3.fill("speed balance", { timeout: 20_000 });
    await ask3.press("Enter");
    await delay(8_000);
    await page.screenshot({ path: shot("unlock-vault-for-signing", "step-3.png"), type: "png" });
    console.log("Wrote unlock step-3 (run + preview/activity).");
  } finally {
    await browser.close();
  }
  console.log("\nAll guide PNGs updated under public/images/guides/…/step-{1,2,3}.png");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
