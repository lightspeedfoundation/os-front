# Content templates (Phase 2)

Use the same **frontmatter** shape as existing files in `guides/`, `concepts/`, `comparisons/`, and `roundups/`.

## Guide: swap flow

- `guideType: swap`
- `howTo` with 3+ steps; each step may include `image: /public/...` path
- Body: direct answer, bullet summary, H2 steps, images per step, FAQ, Related (2+ internal links)
- Store screenshots under `public/images/guides/<slug>/`

## Guide: bridge flow

- `guideType: bridge`
- Same as swap; emphasize chain selection, time-to-finality, and signing discipline

## Query-first titles

- Prefer `seoTitle` that starts with the user question or task (“How to … in browser | Speed OS”).
