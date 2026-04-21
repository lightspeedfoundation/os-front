import type { Metadata, Viewport } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/brand/speed-logo.png",
  },
  title: "Speed OS — Onchain Trading Workspace",
  description:
    "Replace Chrome’s new tab with Speed OS: Ask Speed, dock panels, and optional Cmd+K terminal. Built-in Lightspeed-CLI tools, encrypted on-device vault, optional MCP—no separate Node install.",
  openGraph: {
    title: "Speed OS — Onchain Trading Workspace",
    description:
      "Ask Speed, terminal panel, and dock—same tools as the desktop app in your browser. Encrypted vault on your device; optional MCP for API settings.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#060608",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceMono.variable}`}>
      <body className="relative min-h-dvh">{children}</body>
    </html>
  );
}
