import type { NextConfig } from "next";

// NEXT_OUTPUT=export builds a static copy of the site (used to deploy it on
// Wirl itself). The API route is excluded from that build by the export script.
// The docs live at docs.wirl.dev; old links to /docs go there.
const nextConfig: NextConfig =
  process.env.NEXT_OUTPUT === 'export'
    ? { output: 'export', images: { unoptimized: true } }
    : {
        async redirects() {
          return [{ source: '/docs/:path*', destination: 'https://docs.wirl.dev/:path*', permanent: true }];
        },
      };

export default nextConfig;
