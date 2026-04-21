import { SectionLabelDark } from "@/components/SectionLabelDark";

const faqs: { q: string; a: string[] }[] = [
  {
    q: "What am I actually installing?",
    a: [
      "You’re installing the Speed OS Chrome extension, which replaces your new tab page.",
      "It gives you an Ask bar for everyday tasks, side panels for things like your portfolio, and an optional Cmd/Ctrl+K terminal for advanced commands.",
      "It uses the same tools as Speed CLI via npm.",
    ],
  },
  {
    q: "Does Speed OS hold or control my crypto keys?",
    a: [
      "No. Speed OS is not a custodial service—we don’t store your keys on our servers.",
      "Your trading key is encrypted and kept in Chrome’s storage on your device. It’s only decrypted in memory while you’ve unlocked it for a session. We never store the raw key on disk.",
      "If you use optional MCP integration (mcp.ispeed.pro), that can merge in API-related settings. It does not replace or overwrite the private key you keep in the vault.",
      "This is normal software-on-your-device security—not a hardware wallet. You’re still responsible for your device and who can use it.",
    ],
  },
  {
    q: "Why replace the new tab page?",
    a: [
      "Most people open new tabs all day long. Putting Speed OS there means swaps, bridges, balances, and similar actions are one glance away—without juggling extra tabs and sites.",
    ],
  },
  {
    q: "What permissions does the extension need—and why?",
    a: [
      "Chrome will ask for permissions so the extension can work like a serious trading tool, not just a static page.",
      "That includes things like saving your settings (storage), scheduling small background tasks (alarms), and optional alerts (notifications). It also uses Chrome’s network rules so it can reach the same trusted HTTPS services the CLI uses for trading and chain data—such as 0x, Squid, Alchemy, Hyperliquid, and common RPC endpoints.",
      "Nothing here is hidden: what we request matches what the extension actually does, and lines up with the extension’s manifest and docs.",
    ],
  },
];

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
