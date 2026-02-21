"use client";

import { ProfileCard } from "@/components/sections/ProfileCard";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ClockWidget } from "@/components/sections/ClockWidget";
import { MusicWidget } from "@/components/sections/MusicWidget";
import { SocialLinksCard } from "@/components/sections/SocialLinksCard";
import { AnimeWidget } from "@/components/sections/AnimeWidget";
import { AchievementTracking } from "@/components/sections/AchievementTracking";
import { GitHubActivity } from "@/components/sections/GitHubActivity";
import { ThoughtsCard } from "@/components/sections/ThoughtsCard";
import { METextCard } from "@/components/sections/METextCard";
import { AnimeQuotesCard } from "@/components/sections/AnimeQuotesCard";
import { BottomNav } from "@/components/sections/BottomNav";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { motion } from "framer-motion";

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#030303] text-white relative overflow-hidden p-4 md:p-8 pb-32">
      {/* --- NEON FUTURISTIC BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-200 h-200 rounded-full bg-blue-600/20 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-5%] right-[-5%] w-150 h-150 rounded-full bg-emerald-500/15 blur-[130px]" />
        <div className="absolute top-[30%] right-[10%] w-125 h-125 rounded-full bg-purple-600/10 blur-[140px]" />

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Fine Noise Texture */}
        <div className="absolute inset-0 opacity-[0.12] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <ScrollProgress />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 auto-rows-min"
        >
          {/* ROW 1: Header & Status */}
          <ProfileCard />
          <ProjectCard id="p1" index={0} />
          <ClockWidget onClick={scrollToTop} />
          <ThoughtsCard />
          <ProjectCard id="p2" index={1} /> <MusicWidget />
          <AnimeWidget />
          <ProjectCard id="p3" index={2} />
          <AchievementTracking />
          <METextCard />
          <SocialLinksCard />
          <AnimeQuotesCard />
          <GitHubActivity />
        </motion.div>
      </div>

      <BottomNav />
    </main>
  );
}
