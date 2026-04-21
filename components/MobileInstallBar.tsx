import { CHROME_WEB_STORE_URL } from "@/lib/chrome-store";

export function MobileInstallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-borderw bg-void/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <a
        href={CHROME_WEB_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-full items-center justify-center rounded-lg bg-neon font-mono text-[13px] font-semibold uppercase tracking-wide text-black shadow-[0_0_24px_rgba(0,255,135,0.25)] transition hover:bg-[#1aff95] active:scale-[0.99]"
      >
        Add to Chrome
      </a>
    </div>
  );
}
