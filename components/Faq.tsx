import { SectionLabelDark } from "@/components/SectionLabelDark";
import { faqs } from "@/lib/faq-data";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-28 border-t border-borderw bg-void px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-[900px]">
        <SectionLabelDark>FAQ</SectionLabelDark>
        <h2 className="font-display text-[clamp(36px,4vw,58px)] font-extrabold leading-[1.05] tracking-[-1.5px] text-soft">
          Plain-language answers
          <br />
          <span className="text-soft/30">before you install.</span>
        </h2>

        <div className="mt-12 flex flex-col gap-px overflow-hidden rounded-xl border border-borderw bg-borderw">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              className="group bg-void2 open:bg-void3 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-display text-base font-semibold tracking-tight text-soft outline-none md:px-8 md:text-lg">
                <span className="min-w-0">{f.q}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-borderw2 text-[10px] text-mutted transition group-open:rotate-45 group-open:border-neon/30 group-open:bg-neon-dim group-open:text-neon">
                  +
                </span>
              </summary>
              <div className="border-t border-borderw px-6 pb-6 pt-5 md:px-8">
                <div className="space-y-3 text-[14px] font-light leading-relaxed text-mutted2">
                  {f.a.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
