/**
 * Ambient types for the Velite build output. Mirror `velite.config.ts` — after running
 * `npx velite`, see `.velite/index.d.ts` (gitignored) for the exact inferred `Guide` shape.
 */
declare module "#velite" {
  export type Guide = {
    title: string;
    description?: string;
    date?: string;
    published: boolean;
    /** Compiled MDX module (use as a React component in server components). */
    body: unknown;
  };

  export const guides: readonly Guide[];
}
