export function SectionLabelDark({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-neon">
      <span className="h-px w-5 shrink-0 bg-neon" aria-hidden />
      {children}
    </p>
  );
}
