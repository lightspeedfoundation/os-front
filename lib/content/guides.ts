import type { Guide } from "#velite";

export type { Guide };

/**
 * Velite output (`.velite/`). Run `npx velite` or `next dev` / `next build` so this import resolves.
 */
export async function getGuides(): Promise<readonly Guide[]> {
  const { guides } = await import("#velite");
  return guides;
}
