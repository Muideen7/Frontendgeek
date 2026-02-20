"use client";

import { useState, useEffect } from "react";
import { Home, Music, Film, Github, Trophy, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "profile", icon: Home, label: "Profile", target: "profile-card" },
  { id: "music", icon: Music, label: "Music", target: "music-widget" },
  { id: "anime", icon: Film, label: "Anime", target: "anime-widget" },
  { id: "github", icon: Github, label: "GitHub", target: "github-activity" },
  {
    id: "achievements",
    icon: Trophy,
    label: "Achievements",
    target: "achievements-card",
  },
  { id: "clock", icon: Clock, label: "Top", target: "clock-widget" },
];

export function BottomNav() {
  const [activeNav, setActiveNav] = useState("profile");

  const scrollToSection = (targetId: string, navId: string) => {
    setActiveNav(navId);

    if (navId === "clock") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const navItem = navItems.find(
              (item) => item.target === entry.target.id,
            );
            if (navItem) setActiveNav(navItem.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.target);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    /* Use 'fixed' and style directly to avoid linter issues with z-[100] */
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      style={{ zIndex: 100 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 bg-[#121212]/90 backdrop-blur-2xl border border-white/10 rounded-full p-2 shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;

          return (
            <div key={item.id} className="relative">
              <button
                onClick={() => scrollToSection(item.target, item.id)}
                type="button"
                className={cn(
                  "relative p-3 rounded-full transition-colors duration-300 cursor-pointer outline-none group",
                  isActive ? "text-black" : "text-zinc-500 hover:text-white",
                )}
              >
                {/* HIGHLIGHT PILL: Slides between items */}
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <Icon className="w-5 h-5 relative z-10" />

                {/* TOOLTIP */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                  <div className="bg-zinc-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap">
                    {item.label}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </motion.nav>
  );
}
