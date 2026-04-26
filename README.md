# Speed OS infosite



Marketing landing (Next.js App Router) for the Speed OS Chrome extension.



## Environment (optional)

- Copy `.env.example` to `.env.local` for local overrides.
- **`NEXT_PUBLIC_SITE_URL`** — canonical origin used for `metadataBase`, sitemap, robots, and Open Graph (set in production, e.g. `https://ispeed.pro`).

## SEO / content

- Global metadata, `robots.txt`, `sitemap.xml`, JSON-LD (SoftwareApplication, FAQPage, HowTo), and `opengraph-image` live under `app/`.
- [Velite](https://velite.js.org/) compiles `content/{guides,concepts,comparisons,roundups}/*.mdx` to data (`.velite/`, gitignored). Velite runs on `next dev` / `next build` via `next.config.ts`. Article HTML is rendered with `VeliteHtml` + `s.markdown()`.
- **Learn index:** [http://127.0.0.1:3000/learn](http://127.0.0.1:3000/learn) lists all published pages.
- **Off-site checklist** (for humans): [../helper-docs/infosite-offsite-distribution.md](../helper-docs/infosite-offsite-distribution.md) at repo root.
- **Guide screenshots (in-product, Brave + extension):** from `infosite/`, with Brave **fully closed**:
  - `npm run capture:guide-screens` — interactive: after each prompt, set up the Speed OS new tab UI, then press Enter; writes all `step-1.png` … `step-3.png` for each guide.
  - `npm run capture:guide-screens:quick` — same as `node … -- --quick` on every OS; non-interactive smoke test (one `step-1` per guide).
  - **Not your usual session?** The script now picks the **last-active** Chromium profile from `Local State` (not always the folder named `Default`), matches **Stable / Beta / Nightly** user data to the same channel’s `brave.exe` (`BRAVE_CHANNEL=nightly` if you use Nightly), and supports `BRAVE_PROFILE_DIRECTORY=Profile 1` to force a profile. `npm run capture:guide-screens:list` lists profiles for the current user-data path.
  - **You already have Brave open:** use **`npm run capture:guide-screens:cdp`** (or add `--cdp` to the node command). You must start Brave *once* with a debug port, e.g.  
    `& "$env:ProgramFiles\BraveSoftware\Brave-Browser\Application\brave.exe" --remote-debugging-port=9222`  
    then the script **attaches** (no second window), prompts before **each** PNG, and only captures the tab you choose with `BRAVE_PAGE_INDEX` (`0` = first tab, `last` = last tab). It does not drive the UI in CDP mode—you set each shot, then press Enter in the terminal.
  - See `scripts/capture-guide-screenshots.mjs` for env (`BRAVE_PATH`, `BRAVE_CDP_PORT`, `BRAVE_PAGE_INDEX`, `BRAVE_USER_DATA_DIR`, `BRAVE_CHANNEL`, `NTP_LOAD_MS`, etc.).
  - You can still drop PNGs in `public/images/guides/<slug>/` by hand; the script is optional automation.

## Development (live updates)



From this folder:



```bash

npm install

npm run dev

```



Opens **http://localhost:3000** with **Fast Refresh** (dev uses **Turbopack**). Edit `app/`, `components/`, `tailwind.config.ts`, etc.—the browser updates on save.



From the **repo root**:



```bash

npm run infosite:dev

```



### Visual QA loop (agents & humans)



Typical iteration—**no full build needed** while designing:



1. Keep **`npm run dev`** running.

2. **Open** http://localhost:3000/ (use `?v=2` etc. if the browser looks cached).

3. **Screenshot** (viewport and/or full page).

4. **Scroll** down in steps; **screenshot** each section until the footer.

5. Note issues → **fix code** → repeat.



Before deploy, run **`npm run build && npm run start`** and repeat the same scroll/screenshot pass once.



### Production bundle (not for day-to-day iteration)



```bash

npm run build && npm run start

```



Serves the production bundle on port **3000**; it will **not** hot-reload edits.



### OneDrive / cloud-sync folders



If changes don’t reload, try polling:



```powershell

$env:CHOKIDAR_USEPOLLING="1"; npm run dev

```



### Stuck or stale `.next`



```powershell

Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue; npm run dev

```


