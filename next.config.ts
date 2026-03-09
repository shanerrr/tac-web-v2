import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  reactCompiler: true,
  images: {
    // unoptimized: true,
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "downloads.ctfassets.net",
      },
    ],
  },
};

export default nextConfig;
