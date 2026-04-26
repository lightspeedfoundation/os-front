import { defineCollection, defineConfig, s } from "velite";

const base = {
  slug: s
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .describe("URL segment; must match filename stem"),
  title: s.string().max(200),
  /** For <meta name="description"> and OG. */
  description: s.string().max(500),
  /** Optional query-first <title>; defaults to `title` in generateMetadata. */
  seoTitle: s.string().max(120).optional(),
  date: s.isodate(),
  /** Touch this when you edit the page (sitemap lastModified). */
  updated: s.isodate().optional(),
  published: s.boolean().default(true),
  body: s.markdown(),
};

const guides = defineCollection({
  name: "Guide",
  pattern: "guides/**/*.mdx",
  schema: s.object({
    ...base,
    guideType: s.enum(["swap", "bridge", "other"]).default("other"),
    /** For HowTo JSON-LD on the guide page (must match on-page steps). */
    howTo: s
      .object({
        name: s.string().max(200),
        description: s.string().max(500).optional(),
        step: s.array(
          s.object({
            name: s.string().max(120),
            text: s.string().max(2000),
            image: s.string().optional().describe("Optional path under /public, e.g. /images/guides/slug/01.png"),
          }),
        ),
      })
      .optional(),
  }),
});

const concepts = defineCollection({
  name: "Concept",
  pattern: "concepts/**/*.mdx",
  schema: s.object({ ...base }),
});

const comparisons = defineCollection({
  name: "Comparison",
  pattern: "comparisons/**/*.mdx",
  schema: s.object({ ...base }),
});

const roundups = defineCollection({
  name: "Roundup",
  pattern: "roundups/**/*.mdx",
  schema: s.object({ ...base }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    clean: true,
  },
  collections: { guides, concepts, comparisons, roundups },
});
