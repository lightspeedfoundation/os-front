/**
 * Captures in-product "new tab" PNGs for infosite guide pages using Playwright + Brave
 * with your *real* browser profile (so the Speed OS extension is already installed).
 *
 * Prereqs:
 *   - Brave fully **quit** (not minimized) so the profile is not locked.
 *   - Speed OS installed in that profile (default profile unless BRAVE_PROFILE_DIRECTORY is set).
 *
 * Usage (from infosite/):
 *   node scripts/capture-guide-screenshots.mjs
 *   node scripts/capture-guide-screenshots.mjs --quick
 *   npm run capture:guide-screens:quick   (same as --quick; use if `npm run … -- --quick` drops args on Windows)
 *   npm run capture:guide-hl:cdp          (--cdp --only hyperliquid-setup-in-browser) five HL tutorial PNGs
 *
 *   --quick   Only writes step-1.png per guide, 5s wait after NTP load (no prompts).
 *   --only SLUG   Capture only that guide folder (e.g. hyperliquid-setup-in-browser). Repeat flag or comma list OK.
 *   (default) Interactive: pause before each capture so you can set up the exact UI.
 *
 *   --cdp     Connect to a Brave *you* already started with a debug port (no second Playwright window).
 *             1) Quit all Brave windows, then start:
 *                & "C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe" --remote-debugging-port=9222
 *                (or add --user-data-dir / --profile-directory=… if you use a non-default path.)
 *             2) Open the new tab / extension UI you need; run: node ... --cdp
 *             3) The script will prompt before each file; you adjust Brave, then press Enter. We capture the
 *                tab selected by BRAVE_PAGE_INDEX (default: first tab). The script will NOT change tabs or URL.
 *             BRAVE_CDP_URL (default http://127.0.0.1:9222) or BRAVE_CDP_PORT=9222
 *
 * Env (optional):
 *   BRAVE_USER_DATA_DIR   default: see BRAVE_CHANNEL (stable = …\\Brave-Browser\\User Data)
 *   BRAVE_CHANNEL         stable | beta | nightly  (picks matching User Data + per-channel brave.exe; default stable)
 *   BRAVE_PROFILE_DIRECTORY  optional; if unset, last-active profile is read from Local State (not always "Default")
 *   BRAVE_PATH            full path to brave.exe if not found
 *   BRAVE_PAGE_INDEX   (with --cdp) 0 = first tab, 1 = second, or "last" (default: 0)
 *   CAPTURE_WIDTH / CAPTURE_HEIGHT  used when launching a window (not CDP; CDP uses your window size)
 *   NTP_LOAD_MS          extra wait after NTP (default 4000) — launch / --quick only
 *
 * @see .cursor/rules/infosite-dev.mdc (screenshot QA on localhost for the site, not for this script)
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INFOSITE_ROOT = path.join(__dirname, "..");

/** @type {{ slug: string; stepCount: number }[]} */
const GUIDES = [
  { slug: "swap-eth-to-usdc-in-browser", stepCount: 3 },
  { slug: "bridge-tokens-across-chains-in-browser", stepCount: 3 },
  { slug: "unlock-vault-for-signing", stepCount: 3 },
  { slug: "hyperliquid-setup-in-browser", stepCount: 5 },
];

function parseOnlySlugs() {
  const out = new Set();
  for (const a of process.argv) {
    if (a.startsWith("--only=")) {
      for (const s of a.slice("--only=".length).split(",")) {
        const t = s.trim();
        if (t) out.add(t);
      }
    }
  }
  const idx = process.argv.indexOf("--only");
  if (idx !== -1) {
    const next = process.argv[idx + 1];
    if (next && !next.startsWith("--")) {
      for (const s of next.split(",")) {
        const t = s.trim();
        if (t) out.add(t);
      }
    }
  }
  return out.size ? [...out] : null;
}

const CHANNEL_FOLDERS = {
  stable: "Brave-Browser",
  beta: "Brave-Browser-Beta",
  nightly: "Brave-Browser-Nightly",
};

function braveChannel() {
  const c = (process.env.BRAVE_CHANNEL || "stable").toLowerCase();
  return c in CHANNEL_FOLDERS ? c : "stable";
}

/** Use the same per-channel build as the User Data you open (Nightly data + Stable exe = "wrong" browser). */
function findBraveExecutable() {
  if (process.env.BRAVE_PATH && fs.existsSync(process.env.BRAVE_PATH)) {
    return process.env.BRAVE_PATH;
  }
  const la = process.env.LOCALAPPDATA;
  const folder = CHANNEL_FOLDERS[braveChannel()];
  if (la) {
    const p = path.join(la, "BraveSoftware", folder, "Application", "brave.exe");
    if (fs.existsSync(p)) return p;
  }
  for (const name of Object.values(CHANNEL_FOLDERS)) {
    if (la) {
      const p = path.join(la, "BraveSoftware", name, "Application", "brave.exe");
      if (fs.existsSync(p)) return p;
    }
  }
  for (const p of [
    "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    "C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  ]) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function defaultUserDataDir() {
  if (process.env.BRAVE_USER_DATA_DIR) return process.env.BRAVE_USER_DATA_DIR;
  const la = process.env.LOCALAPPDATA;
  if (!la) return null;
  const folder = CHANNEL_FOLDERS[braveChannel()];
  return path.join(la, "BraveSoftware", folder, "User Data");
}

function readLocalStateProfileHints(userDataDir) {
  const localStatePath = path.join(userDataDir, "Local State");
  if (!fs.existsSync(localStatePath)) return { lastActive: null, infoCache: /** @type {Record<string, unknown>} */ ({}) };
  try {
    const j = JSON.parse(fs.readFileSync(localStatePath, "utf8"));
    const pr = j.profile || {};
    const lap = pr.last_active_profiles;
    const lastFromList = Array.isArray(lap) && lap.length > 0 ? String(lap[0]) : null;
    const lastUsed = typeof pr.last_used === "string" ? pr.last_used : null;
    return {
      lastActive: lastFromList || lastUsed,
      infoCache: (pr.info_cache && typeof pr.info_cache === "object" ? pr.info_cache : {}) || {},
    };
  } catch {
    return { lastActive: null, infoCache: {} };
  }
}

function profileDirIsUsable(userDataDir, name) {
  if (!name || name.startsWith("System")) return false;
  const d = path.join(userDataDir, name);
  return fs.existsSync(d) && fs.statSync(d).isDirectory();
}

/**
 * "Default" is often not the profile you use daily; prefer Chromium Local State last-active when unset.
 */
function resolveProfileDirectory(userDataDir) {
  if (process.env.BRAVE_PROFILE_DIRECTORY) {
    return { profileDir: process.env.BRAVE_PROFILE_DIRECTORY.trim(), source: "BRAVE_PROFILE_DIRECTORY" };
  }
  const { lastActive, infoCache } = readLocalStateProfileHints(userDataDir);
  if (lastActive && profileDirIsUsable(userDataDir, lastActive)) {
    return { profileDir: lastActive, source: "Local State (last active profile)" };
  }
  if (profileDirIsUsable(userDataDir, "Default")) {
    return { profileDir: "Default", source: "Default folder" };
  }
  for (const key of Object.keys(infoCache)) {
    if (profileDirIsUsable(userDataDir, key)) {
      return { profileDir: key, source: "Local State (first existing profile in info cache)" };
    }
  }
  return { profileDir: "Default", source: "fallback name only (verify folder exists)" };
}

function printProfilesAndExit(userDataDir) {
  if (!userDataDir || !fs.existsSync(userDataDir)) {
    console.error("User data dir not found:", userDataDir);
    process.exit(1);
  }
  const { lastActive, infoCache } = readLocalStateProfileHints(userDataDir);
  console.log("User data dir:", userDataDir);
  console.log("Local State last active hint:", lastActive || "(none)");
  const entries = Object.keys(infoCache);
  if (entries.length === 0) {
    console.log("No profile info_cache; listing directories:");
    try {
      for (const n of fs.readdirSync(userDataDir)) {
        if (n === "Local State" || n.endsWith("store")) continue;
        const p = path.join(userDataDir, n);
        if (fs.statSync(p).isDirectory() && (n === "Default" || n.startsWith("Profile "))) {
          console.log("  -", n, profileDirIsUsable(userDataDir, n) ? "" : "(not usable)");
        }
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    for (const key of entries) {
      const raw = infoCache[key];
      const name =
        raw && typeof raw === "object" && "name" in raw && typeof raw.name === "string" ? raw.name : "";
      const ok = profileDirIsUsable(userDataDir, key);
      console.log(`  ${ok ? "✓" : "✗"} ${key}${name ? `  (${name})` : ""}`);
    }
  }
  console.log("\nSet BRAVE_PROFILE_DIRECTORY=Profile 1   (or your folder name) if the script picks the wrong one.");
  process.exit(0);
}

function question(rl, prompt) {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

const quick = process.argv.includes("--quick");
const listProfiles = process.argv.includes("--list-profiles");
const onlySlugs = parseOnlySlugs();
const guidesFiltered = onlySlugs
  ? GUIDES.filter((g) => onlySlugs.includes(g.slug))
  : GUIDES;
const useCdp =
  process.argv.includes("--cdp") ||
  Boolean(process.env.BRAVE_CDP_URL) ||
  (process.env.BRAVE_CDP_PORT != null && String(process.env.BRAVE_CDP_PORT) !== "");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function cdpConnectUrl() {
  if (process.env.BRAVE_CDP_URL) return process.env.BRAVE_CDP_URL;
  const port = process.env.BRAVE_CDP_PORT || "9222";
  return `http://127.0.0.1:${port}`;
}

function flattenAllPages(browser) {
  const out = [];
  for (const ctx of browser.contexts()) out.push(...ctx.pages());
  return out;
}

/**
 * @param {import("playwright").Browser} browser
 * @returns {Promise<import("playwright").Page>}
 */
async function pickOrCreatePage(browser) {
  const pgs = flattenAllPages(browser);
  if (pgs.length) {
    const raw = process.env.BRAVE_PAGE_INDEX;
    if (raw === "last" || raw === "-1") return pgs[pgs.length - 1];
    const i = raw !== undefined && raw !== null && raw !== "" ? Number.parseInt(String(raw), 10) : 0;
    const idx = Number.isFinite(i) ? Math.max(0, Math.min(pgs.length - 1, i)) : 0;
    return pgs[idx];
  }
  const c0 = browser.contexts()[0];
  if (c0) return await c0.newPage();
  throw new Error("No browser context to create a page");
}

/**
 * @param {import("playwright").Page} page
 * @param {number} ntpLoadMs
 */
async function goNewTab(page, ntpLoadMs) {
  try {
    await page.goto("chrome://newtab/", { waitUntil: "domcontentloaded", timeout: 60_000 });
  } catch {
    await page.goto("about:blank", { waitUntil: "domcontentloaded", timeout: 30_000 });
  }
  try {
    await page.waitForSelector("#root, body", { timeout: 20_000 });
  } catch {
    /* NTP may still render */
  }
  await delay(ntpLoadMs);
}

/**
 * @param {import("readline").Interface} rl
 * @param {import("playwright").Page} page
 * @param {import("playwright").Browser | null} browser
 * @param {{ cdp: boolean; quick: boolean; ntpLoadMs: number }} opts
 */
async function runCaptureLoop(rl, page, browser, opts) {
  const { cdp, quick, ntpLoadMs, guides } = opts;

  async function writeShot(outFile) {
    if (cdp && browser) {
      const p = await pickOrCreatePage(browser);
      await p.bringToFront().catch(() => {});
      await p.screenshot({ path: outFile, type: "png" });
    } else {
      await page.screenshot({ path: outFile, type: "png" });
    }
  }

  if (!quick && !cdp) {
    await goNewTab(page, ntpLoadMs);
  }

  for (let gi = 0; gi < guides.length; gi++) {
    const { slug, stepCount } = guides[gi];
    const outDir = path.join(INFOSITE_ROOT, "public", "images", "guides", slug);
    fs.mkdirSync(outDir, { recursive: true });
    const stepList = quick ? [1] : Array.from({ length: stepCount }, (_, i) => i + 1);
    for (const step of stepList) {
      const outFile = path.join(outDir, `step-${step}.png`);
      if (quick) {
        await goNewTab(page, ntpLoadMs);
      } else {
        if (!cdp && gi > 0 && step === 1) {
          await goNewTab(page, ntpLoadMs);
        }
        const cdpPart =
          "adjust the tab for this image (set env BRAVE_PAGE_INDEX=0,1, or last) — the script will not navigate";
        const launchPart = "set up the Speed OS new tab UI for this step,";
        const msg = cdp
          ? `[${slug}] step ${step}/${stepCount} — ${cdpPart}, then press Enter to write:\n  ${outFile}\n> `
          : `[${slug}] step ${step}/${stepCount} — ${launchPart} then press Enter to write:\n  ${outFile}\n> `;
        await question(rl, msg);
      }

      await writeShot(outFile);
      console.log("Wrote", outFile);
      if (quick) await delay(500);
    }
  }
}

async function main() {
  const userDataDir = defaultUserDataDir();
  if (listProfiles) {
    printProfilesAndExit(userDataDir);
  }

  if (onlySlugs && guidesFiltered.length === 0) {
    console.error("--only did not match any guide slug. Known:", GUIDES.map((g) => g.slug).join(", "));
    process.exit(1);
  }
  if (onlySlugs) {
    console.log("Guides selected (--only):", guidesFiltered.map((g) => g.slug).join(", "));
  }

  const w = Number(process.env.CAPTURE_WIDTH) || 1440;
  const h = Number(process.env.CAPTURE_HEIGHT) || 900;
  const ntpLoadMs = Number(process.env.NTP_LOAD_MS) || 4000;

  if (useCdp) {
    const url = cdpConnectUrl();
    console.log("Mode: --cdp (no Playwright launch; attach to Brave you started with a debug port)");
    console.log("Connect URL:", url);
    if (!quick) {
      console.log(
        "\n1) Close Brave if it is open without a debug port.\n" +
          "2) Start: & \"$env:ProgramFiles\\BraveSoftware\\Brave-Browser\\Application\\brave.exe\" " +
          "--remote-debugging-port=9222\n" +
          "3) Set up the tab you use for the shoot; then run this and press Enter when ready.\n",
      );
    }
    console.log("Output root:", path.join(INFOSITE_ROOT, "public", "images", "guides"));
    if (quick) {
      console.log("  (--quick) will load chrome://newtab/ on the chosen tab between shots (no prompts)\n");
    } else {
      console.log("  (interactive) one file per step; you drive Brave between prompts; no auto navigation\n");
    }

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    try {
      if (quick) {
        await question(rl, `With Brave on ${url}, press Enter to connect (2s) or Ctrl+C to cancel… `);
        await delay(2000);
      } else {
        await question(rl, "When Brave (with --remote-debugging-port) is up and the tab is ready, press Enter to connect… ");
      }

      let browser;
      try {
        browser = await chromium.connectOverCDP(url);
      } catch (e) {
        console.error("Could not connect to", url, "\n", (e && e.message) || e);
        console.error(
          "Is Brave open with: --remote-debugging-port=9222 ?  Set BRAVE_CDP_PORT / BRAVE_CDP_URL to match. " +
            "Close any Brave that was not started with that flag.",
        );
        process.exit(1);
      }

      const workPage = await pickOrCreatePage(browser);
      await workPage.bringToFront().catch(() => {});

      try {
        if (quick) {
          await delay(2000);
        }
        await runCaptureLoop(rl, workPage, browser, { cdp: true, quick, ntpLoadMs, guides: guidesFiltered });
      } finally {
        await browser.close();
      }

      console.log("\nDone. Review PNGs, then run `npm run build` in infosite if you changed assets.");
    } finally {
      rl.close();
    }
    return;
  }

  const executablePath = findBraveExecutable();
  if (!userDataDir || !fs.existsSync(userDataDir)) {
    console.error("BRAVE user data not found. Set BRAVE_USER_DATA_DIR to your …\\Brave-Browser\\User Data folder.");
    console.error("If you use Brave Nightly, set BRAVE_CHANNEL=nightly (or set BRAVE_USER_DATA_DIR to that User Data).");
    process.exit(1);
  }
  if (!executablePath) {
    console.error("brave.exe not found. Set BRAVE_PATH to the full path to brave.exe");
    process.exit(1);
  }

  const { profileDir, source: profileSource } = resolveProfileDirectory(userDataDir);

  const channel = braveChannel();
  if (process.env.BRAVE_USER_DATA_DIR) {
    console.log(
      "BRAVE_USER_DATA_DIR is set — use BRAVE_PATH to the same channel’s brave.exe if the window is not your usual Brave.",
    );
  }
  console.log("BRAVE_CHANNEL:", channel);
  console.log("Brave executable:", executablePath);
  console.log("User data dir:", userDataDir);
  console.log("Profile dir:", profileDir, "—", profileSource);
  console.log("Output root:", path.join(INFOSITE_ROOT, "public", "images", "guides"));
  if (quick) {
    console.log("Mode: --quick (only step-1 per guide, no prompts)\n");
  } else {
    console.log(
      "Mode: interactive (Playwright opens Brave) — to use your *already open* browser, quit and run: node ... --cdp\n",
    );
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    if (quick) {
      console.log("Close all Brave windows. Starting in 4 seconds (Ctrl+C to cancel)…\n");
      await delay(4000);
    } else {
      await question(rl, "Close Brave completely, then press Enter to launch a Playwright-controlled Brave with this profile…");
    }

    const context = await chromium.launchPersistentContext(userDataDir, {
      executablePath,
      headless: false,
      args: [`--profile-directory=${profileDir}`, "--disable-background-networking"],
      viewport: { width: w, height: h },
      locale: "en-US",
    });

    const page = context.pages()[0] ?? (await context.newPage());
    try {
      await runCaptureLoop(rl, page, null, { cdp: false, quick, ntpLoadMs, guides: guidesFiltered });
    } finally {
      await context.close();
    }

    console.log("\nDone. Review PNGs, then run `npm run build` in infosite if you changed assets.");
  } finally {
    rl.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
