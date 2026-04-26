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
      "You are installing the Speed OS Chrome extension, which replaces Chrome’s new tab page with a trading workspace.",
      "The workspace includes an Ask bar, dockable side panels, and an optional Cmd/Ctrl+K terminal. It runs the same Lightspeed-CLI tool surface you would use from npm on the desktop—routed through the new tab—without requiring a separate Node install for basic in-browser use.",
    ],
  },
  {
    q: "Does Speed OS hold or control my crypto keys?",
    a: [
      "No. Speed OS is not a custodial service: we do not store your private key on our servers in a way that lets us move your funds.",
      "Your trading key is encrypted in Chrome’s storage on your device and is only decrypted in memory for a session after you unlock the vault. The raw private key is not written to long-lived plaintext storage by design.",
      "If you enable optional MCP integration at mcp.ispeed.pro, that path can merge API-related environment settings. It is not a substitute for a hardware wallet, and you remain responsible for physical access to your device.",
    ],
  },
  {
    q: "Why replace the new tab page?",
    a: [
      "A new tab is a high-frequency surface: putting Speed OS there keeps swaps, bridges, balances, and other onchain actions one gesture away, instead of reopening the same set of dapp tabs every time.",
    ],
  },
  {
    q: "What permissions does the extension need—and why?",
    a: [
      "Chrome will request permissions that match a trading-focused extension: e.g. storage (settings), alarms (lightweight background work), and notifications (optional). It also needs network access rules so the extension can talk to the same class of trusted HTTPS services the CLI uses for market data, routing, and chain connectivity.",
      "Cross-check the live extension manifest in the Chrome Web Store before you install: permissions should read as consistent with the features you intend to use.",
    ],
  },
  {
    q: "Where are the how-to guides and explainers?",
    a: [
      "Use the Learn index at /learn. It links to in-browser how-tos (for example swap and bridge), MCP “what is” pages, and use-case comparison articles.",
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
