// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "s4.anilist.co" },
      { protocol: "https", hostname: "i.ytimg.com" }, // For Music/YouTube
    ],
  },
};

export default nextConfig;
