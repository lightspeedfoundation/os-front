import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Avoid tracing the wrong workspace root when other lockfiles exist on the machine.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
