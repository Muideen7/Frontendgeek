// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "s4.anilist.co" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "mlndflow.vercel.app" },
      { protocol: "https", hostname: "lexi-clear-legal.vercel.app" },
      { protocol: "https", hostname: "nova-chi-black.vercel.app" },
      { protocol: "https", hostname: "dev-mentor-nu.vercel.app" },
      { protocol: "https", hostname: "crdev.vercel.app" },
    ],
  },
};

export default nextConfig;
