import type { Metadata, Viewport } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import { PRODUCT_DEFINITION_ONE_LINE, PRODUCT_DEFINITION_SHORT } from "@/lib/product-definition";
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
const defaultTitle = "Speed OS — crypto trading in Chrome: new tab workspace (CLI tools)";
const defaultDescription = PRODUCT_DEFINITION_ONE_LINE;

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
    description: PRODUCT_DEFINITION_SHORT,
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
    title: "Speed OS — crypto trading Chrome extension & onchain workspace",
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
