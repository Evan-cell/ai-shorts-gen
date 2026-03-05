import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rtmfutrgphsnvllyypip.supabase.co",
      },
    ],
  },
};

export default nextConfig;
