/** Canonical listing; override locally or on Vercel via NEXT_PUBLIC_CHROME_STORE_URL if needed. */
export const CHROME_WEB_STORE_URL =
  process.env.NEXT_PUBLIC_CHROME_STORE_URL ??
  "https://chromewebstore.google.com/detail/speed-os/eloeamplclnpkdeigkohokbmjbflilde";
