"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Trophy, Users, Star, GitFork, Code, BookOpen } from "lucide-react";

interface Achievements {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  languagesUsed: number;
}

export function AchievementTracking({ className }: { className?: string }) {
  const [achievements, setAchievements] = useState<Achievements | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const username = "Muideen7";

        // 1. Fetch User Profile (Followers, Repos)
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();

        // 2. Fetch Repos (To calculate Stars, Forks, and Languages)
        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`,
        );
        const reposData = await reposRes.json();

        if (Array.isArray(reposData)) {
          const stats = reposData.reduce(
            (acc, repo) => {
              acc.stars += repo.stargazers_count;
              acc.forks += repo.forks_count;
              if (repo.language) acc.languages.add(repo.language);
              return acc;
            },
            { stars: 0, forks: 0, languages: new Set<string>() },
          );

          setAchievements({
            publicRepos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
            totalStars: stats.stars,
            totalForks: stats.forks,
            languagesUsed: stats.languages.size,
          });
        }
      } catch (err) {
        console.error("Failed to fetch GitHub stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  const achievementsList = achievements
    ? [
        { icon: Code, label: "Repos", value: achievements.publicRepos },
        { icon: Star, label: "Stars", value: achievements.totalStars },
        { icon: Users, label: "Followers", value: achievements.followers },
        {
          icon: BookOpen,
          label: "Languages",
          value: achievements.languagesUsed,
        },
        { icon: GitFork, label: "Forks", value: achievements.totalForks },
        { icon: Trophy, label: "Following", value: achievements.following },
      ]
    : [];

  return (
    <Card id="achievements-card" className={className}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-emerald-400" />
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
            Live System Stats
          </h3>
        </div>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <div className="w-1 h-1 rounded-full bg-emerald-500/20" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 flex-1">
        {loading
          ? [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-full min-h-[60px] bg-white/5 rounded-xl animate-pulse"
              />
            ))
          : achievementsList.map((item) => (
              <div
                key={item.label}
                className="flex flex-col justify-center p-3 bg-white/[0.03] rounded-xl border border-white/5 hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <item.icon className="w-3 h-3 text-gray-500" />
                  <span className="text-[10px] text-gray-500 font-medium uppercase tracking-tight">
                    {item.label}
                  </span>
                </div>
                <span className="text-xl font-bold text-white tabular-nums">
                  {item.value}
                </span>
              </div>
            ))}
      </div>
    </Card>
  );
}
