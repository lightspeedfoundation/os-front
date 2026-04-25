# Speed OS infosite



Marketing landing (Next.js App Router) for the Speed OS Chrome extension.



## Environment (optional)

- Copy `.env.example` to `.env.local` for local overrides.
- **`NEXT_PUBLIC_SITE_URL`** — canonical origin used for `metadataBase`, sitemap, robots, and Open Graph (set in production, e.g. `https://ispeed.pro`).

## SEO / content

- Global metadata, `robots.txt`, `sitemap.xml`, JSON-LD (SoftwareApplication, FAQPage, HowTo), and `opengraph-image` live under `app/`.
- MDX is built with [Velite](https://velite.js.org/): add guides under `content/guides/*.mdx` (see `velite.config.ts`). Velite runs on `next dev` / `next build` via `next.config.ts`.

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


