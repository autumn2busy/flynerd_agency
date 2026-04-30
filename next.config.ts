import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/pricing/ai-website-quickstart-ul",
        destination: "/ai-website/trades",
        permanent: true,
      },
      {
        source: "/pricing/ai-website-concierge-tp",
        destination: "/ai-website/premium-services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
