import type { NextConfig } from "next";

// NEXT_OUTPUT=export builds a static copy of the site (used to deploy it on
// Wirl itself). The API route is excluded from that build by the export script.
const nextConfig: NextConfig =
  process.env.NEXT_OUTPUT === 'export'
    ? { output: 'export', images: { unoptimized: true } }
    : {};

export default nextConfig;
