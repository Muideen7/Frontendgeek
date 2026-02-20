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

const PROJECTS = [
  { id: "p1", title: "Procedural Study", tags: ["3d", "C4D"] },
  { id: "p2", title: "Windows 11th", tags: ["Design"] },
];

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#030303] text-white relative overflow-hidden p-4 md:p-8 pb-32">
      {/* --- NEON FUTURISTIC BACKGROUND LAYER --- */}
      {/* fixed inset-0 ensures it stays behind and doesn't affect grid layout */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Dynamic Neon Blurs */}
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-blue-600/20 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full bg-emerald-500/15 blur-[130px]" />
        <div className="absolute top-[30%] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[140px]" />

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Fine Noise Texture */}
        <div className="absolute inset-0 opacity-[0.12] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <ScrollProgress />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          // We keep your exact original grid classes
          className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-min"
        >
          {/* ROW 1: Header */}
          <ProfileCard />
          <ClockWidget onClick={scrollToTop} />

          {/* ROW 2: Projects */}
          <ProjectCard project={PROJECTS[0]} />
          <ProjectCard project={PROJECTS[1]} />

          {/* ROW 3: Media & Interest */}
          <MusicWidget />
          <AnimeWidget />

          {/* ROW 4: MATCH HEIGHT - SocialLinks & METext */}
          <SocialLinksCard />
          <METextCard />

          {/* ROW 5: MATCH HEIGHT - Achievements & Quotes */}
          <AchievementTracking />
          <AnimeQuotesCard />

          {/* ROW 6: Footer Grid - Thoughts & GitHub */}
          <ThoughtsCard />
          <GitHubActivity />
        </motion.div>
      </div>

      <BottomNav />
    </main>
  );
}
