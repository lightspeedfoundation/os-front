import parse from "html-react-parser";

type Props = { html: string; className?: string };

/**
 * Renders HTML produced by Velite `s.markdown()` (trusted, repo-authored content at build time).
 */
export function VeliteHtml({ html, className = "velite-html" }: Props) {
  return <div className={className}>{parse(html)}</div>;
}
