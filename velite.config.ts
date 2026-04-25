import { defineCollection, defineConfig, s } from "velite";

/**
 * Scaffolding collection for future /guides, /docs, /compare, /blog routes.
 * Add MDX under content/guides/*.mdx — run `npx velite` or `next dev` / `next build` (wired in next.config).
 */
const guides = defineCollection({
  name: "Guide",
  pattern: "guides/**/*.mdx",
  schema: s.object({
    title: s.string().max(200),
    description: s.string().max(500).optional(),
    date: s.isodate().optional(),
    published: s.boolean().default(true),
    body: s.mdx(),
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    clean: true,
  },
  collections: { guides },
});
