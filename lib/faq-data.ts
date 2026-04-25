import { CHROME_WEB_STORE_URL } from "@/lib/chrome-store";

export type FaqItem = { q: string; a: string[] };

/**
 * Single source of truth for FAQ section UI + JSON-LD FAQPage.
 * Keep answers factual and citable; avoid duplicating this list elsewhere.
 */
export const faqs: FaqItem[] = [
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

/**
 * HowTo JSON-LD: only included when steps are explicit and match visible product flow.
 * @see https://schema.org/HowTo
 */
export const installSpeedOsHowTo = {
  name: "Install Speed OS from the Chrome Web Store",
  description:
    "Add the Speed OS extension to Chrome so your new tab becomes a trading workspace with the same tools as Speed CLI in the browser.",
  totalTime: "PT2M",
  tool: [{ "@type": "HowToTool", name: "Google Chrome" }],
  supply: [{ "@type": "HowToSupply", name: "Chrome Web Store account (same as your Google account in Chrome)" }],
  step: [
    {
      "@type": "HowToStep",
      name: "Open the Speed OS listing",
      text: "Open the official Speed OS page in the Chrome Web Store.",
      url: CHROME_WEB_STORE_URL,
    },
    {
      "@type": "HowToStep",
      name: "Add the extension to Chrome",
      text: "Click Add to Chrome and confirm the installation when Chrome prompts you.",
    },
    {
      "@type": "HowToStep",
      name: "Use a new tab",
      text: "Open a new tab. Speed OS replaces the default new tab with Ask Speed, side panels, and (optionally) the terminal.",
    },
  ],
} as const;
