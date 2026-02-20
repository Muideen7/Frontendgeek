"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { FlipCard } from "@/components/ui/FlipCard";
import { SITE_CONFIG } from "@/lib/config";
import { motion } from "framer-motion";

interface GitHubUser {
  avatar_url: string;
  name: string;
  bio: string;
  login: string;
}

// Added 'id' to props to fix the Page.tsx linting error
export function ProfileCard({
  className,
  id,
}: {
  className?: string;
  id?: string;
}) {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${SITE_CONFIG.github.username}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error("Error fetching GitHub data:", err));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Front side
  const front = (
    <Card className="h-full">
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Avatar with status indicator */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative shrink-0"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 ring-4 ring-emerald-500/10">
            {userData ? (
              <Image
                src={userData.avatar_url}
                alt={SITE_CONFIG.name}
                width={80}
                height={80}
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 animate-pulse" />
            )}
          </div>

          <div
            className={`
            absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#0a0a0a]
            ${isOnline ? "bg-emerald-500 shadow-[0_0_10px_#10b981]" : "bg-red-500"}
          `}
          />
        </motion.div>

        {/* Bio Content */}
        <div className="flex-1">
          {/* ONLY THE NAME IS BOLD/HEADING NOW */}
          <h1 className="text-2xl font-black text-white mb-2 tracking-tight">
            Hi, I&apos;m {SITE_CONFIG.name}
          </h1>

          {/* THE REST IS NORMAL TEXT */}
          <p className="text-gray-300 leading-relaxed mb-4 text-[15px]">
            A{" "}
            <span className="text-emerald-400 font-medium">
              {SITE_CONFIG.role}
            </span>{" "}
            blending systems thinking, engineering precision, and creative
            innovation to craft cohesive digital experiences.
          </p>

          <p className="text-gray-400 leading-relaxed mb-3 text-[15px]">
            I design scalable visual and interaction systems that bring clarity,
            consistency, and emotion across platforms—from expressive brand
            moments to functional product interfaces.
          </p>

          <p className="text-gray-400 leading-relaxed text-[15px]">
            Currently{" "}
            <a
              href={SITE_CONFIG.current.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors border-b border-emerald-400/20"
            >
              @{SITE_CONFIG.current.company}
            </a>
            , building {SITE_CONFIG.current.project}. Previously{" "}
            <a
              href={SITE_CONFIG.previous.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors border-b border-blue-400/20"
            >
              @{SITE_CONFIG.previous.company}
            </a>
            .
          </p>

          <p className="text-[10px] uppercase tracking-widest text-zinc-600 mt-6 font-bold">
            Click to view full avatar →
          </p>
        </div>
      </div>
    </Card>
  );

  const back = (
    <Card className="h-full bg-linear-to-br from-[#061a12] to-black">
      <div className="flex flex-col items-center justify-center h-full p-4">
        {userData && (
          <>
            <div className="relative w-48 h-48 rounded-2xl overflow-hidden mb-6 border-2 border-emerald-500/20 shadow-2xl">
              <Image
                src={userData.avatar_url}
                alt={SITE_CONFIG.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {userData.name || SITE_CONFIG.name}
            </h3>
            <p className="text-emerald-500 font-mono text-sm mb-4">
              @{userData.login}
            </p>
            {userData.bio && (
              <p className="text-gray-400 text-center text-sm max-w-xs leading-relaxed">
                {userData.bio}
              </p>
            )}
            <button className="mt-8 text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
              Close Profile
            </button>
          </>
        )}
      </div>
    </Card>
  );

  return (
    <FlipCard
      id={id || "profile-card"}
      className={className}
      front={front}
      back={back}
      expandOnFlip={false}
      trigger="click"
    />
  );
}
