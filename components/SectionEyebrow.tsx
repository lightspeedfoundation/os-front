import type { ReactNode } from "react";

type Tone = "default" | "inverse" | "muted";

const tones: Record<Tone, string> = {
  default: "border-primary/20 bg-primary/5 text-primary",
  inverse: "border-white/25 bg-white/10 text-white",
  muted: "border-slate-200/80 bg-white/70 text-slate-500",
};

export function SectionEyebrow({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <p
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${tones[tone]}`}
    >
      {children}
    </p>
  );
}
