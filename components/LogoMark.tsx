import Image from "next/image";

const SRC = "/brand/speed-logo.png";

export function LogoMark({
  className = "",
  priority = false,
  variant = "default",
}: {
  className?: string;
  /** Light mark on dark backgrounds — uses CSS invert only (avoid brightness-0: it fills the whole box). */
  variant?: "default" | "onDark";
  priority?: boolean;
}) {
  /** Black artwork → white on dark footer; preserves transparency better than brightness-0 + invert. */
  const tone = variant === "onDark" ? "invert" : "";

  return (
    <Image
      src={SRC}
      alt=""
      width={650}
      height={650}
      priority={priority}
      sizes="96px"
      className={`object-contain ${tone} ${className}`.trim()}
    />
  );
}
