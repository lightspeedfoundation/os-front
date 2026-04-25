import type { Metadata, Viewport } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
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

const site = getSiteUrl();
const defaultTitle = "Speed OS — Crypto trading Chrome extension & onchain workspace";
const defaultDescription =
  "Browser crypto trading workspace: replace Chrome’s new tab with Speed OS. Ask bar, panels, optional Cmd+K terminal—same Lightspeed-CLI tools, encrypted on-device vault, optional MCP. No extra Node install.";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: defaultTitle, template: "%s | Speed OS" },
  description: defaultDescription,
  alternates: { canonical: "/" },
  icons: {
    icon: "/brand/speed-logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    url: site,
    siteName: "Speed OS",
    locale: "en_US",
    title: defaultTitle,
    description:
      "Trade onchain from every new tab: same CLI tools in the browser, keys on your device, optional mcp.ispeed.pro for API env. Chrome extension for DeFi and browser trading.",
    images: [
      {
        url: new URL("opengraph-image", site).toString(),
        width: 1200,
        height: 630,
        alt: "Speed OS — onchain trading in your new tab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
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
