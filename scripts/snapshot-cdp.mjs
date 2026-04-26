/**
 * One screenshot via CDP. Usage (from infosite/):
 *   node scripts/snapshot-cdp.mjs [relative-output.png]
 * Env: BRAVE_CDP_URL, BRAVE_PAGE_INDEX (0,1,..., or "last")
 */
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const cdp = process.env.BRAVE_CDP_URL || "http://127.0.0.1:9222";
const outRel = process.argv[2] || "public/images/guides/unlock-vault-for-signing/capture-locked.png";
const outAbs = path.isAbsolute(outRel) ? outRel : path.join(root, outRel);

const browser = await chromium.connectOverCDP(cdp);
const pgs = [];
for (const c of browser.contexts()) pgs.push(...c.pages());
const raw = process.env.BRAVE_PAGE_INDEX;
let page;
if (pgs.length) {
  if (raw === "last" || raw === "-1") page = pgs[pgs.length - 1];
  else {
    const i = raw != null && raw !== "" ? parseInt(String(raw), 10) : 0;
    const idx = Number.isFinite(i) ? Math.max(0, Math.min(pgs.length - 1, i)) : 0;
    page = pgs[idx];
  }
} else {
  page = await browser.contexts()[0].newPage();
}
await page.bringToFront().catch(() => {});
fs.mkdirSync(path.dirname(outAbs), { recursive: true });
await page.screenshot({ path: outAbs, type: "png" });
await browser.close();
console.log("Wrote", outAbs);
