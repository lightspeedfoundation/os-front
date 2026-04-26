/**
 * Ambient types for Velite build output. Regenerate with `npx velite` after changing `velite.config.ts`.
 */
declare module "#velite" {
  export type GuideType = "swap" | "bridge" | "other";

  export type HowToBlock = {
    name: string;
    description?: string;
    step: { name: string; text: string; image?: string }[];
  };

  export type BasePost = {
    slug: string;
    title: string;
    description: string;
    seoTitle?: string;
    date: string;
    updated?: string;
    published: boolean;
    body: string;
  };

  export type Guide = BasePost & {
    guideType: GuideType;
    howTo?: HowToBlock;
  };

  export type Concept = BasePost;
  export type Comparison = BasePost;
  export type Roundup = BasePost;

  export const guides: readonly Guide[];
  export const concepts: readonly Concept[];
  export const comparisons: readonly Comparison[];
  export const roundups: readonly Roundup[];
}
