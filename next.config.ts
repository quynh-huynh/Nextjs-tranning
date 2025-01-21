import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.storims.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ]
  }
};

export default nextConfig;
