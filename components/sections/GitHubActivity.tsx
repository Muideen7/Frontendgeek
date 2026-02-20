"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { FlipCard } from "@/components/ui/FlipCard";
import { Badge } from "@/components/ui/Badge";
import { Github, GitCommit } from "lucide-react";

interface Commit {
  repo: string;
  commits: { message: string; sha: string }[];
  createdAt: string;
}

export function GitHubActivity({ className }: { className?: string }) {
  const [contributions, setContributions] = useState<number[][]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate contribution heatmap (mock data - can be replaced with real GitHub GraphQL data)
    const weeks = 26;
    const days = 7;
    const data: number[][] = [];

    for (let week = 0; week < weeks; week++) {
      const weekData: number[] = [];
      for (let day = 0; day < days; day++) {
        weekData.push(Math.floor(Math.random() * 11));
      }
      data.push(weekData);
    }
    setContributions(data);

    // Fetch recent commits
    fetch("/api/github/commits")
      .then((res) => res.json())
      .then((data) => {
        setCommits(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching commits:", err);
        setLoading(false);
      });
  }, []);

  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-gray-900";
    if (count <= 2) return "bg-emerald-900/40";
    if (count <= 4) return "bg-emerald-700/60";
    if (count <= 7) return "bg-emerald-500/80";
    return "bg-emerald-400";
  };

  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);
  const endDate = new Date();

  // Front side - Contribution heatmap
  const front = (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Github className="w-5 h-5 text-white" />
          <h3 className="text-[11px] font-bold tracking-[0.1em] text-gray-300">
            GITHUB ACTIVITY
          </h3>
        </div>
        <Badge variant="outline" className="text-[10px]">
          LAST 6 MONTHS
        </Badge>
      </div>

      <div className="flex gap-[2px] overflow-x-auto pb-2 scrollbar-hide">
        {contributions.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[2px]">
            {week.map((count, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`w-3 h-3 rounded-sm ${getContributionColor(count)} transition-colors`}
                title={`${count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between text-[10px] text-gray-500 mt-3 mb-3">
        <span>
          {startDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <span>
          {endDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      <p className="text-xs text-gray-600 italic text-center">
        Click to see commit history →
      </p>
    </Card>
  );

  // Back side - Recent commits
  const back = (
    <Card className="h-full bg-gradient-to-br from-gray-950 to-black overflow-y-auto max-h-[600px]">
      <div className="flex items-center gap-2 mb-5">
        <GitCommit className="w-5 h-5 text-emerald-400" />
        <h3 className="text-sm font-bold text-white">Recent Commits</h3>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-900/50 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : commits.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <GitCommit className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No recent commits found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {commits.map((commit, index) => (
            <div
              key={index}
              className="border-l-2 border-emerald-500 pl-4 pb-4"
            >
              <div className="text-xs text-emerald-400 font-mono mb-1">
                {commit.repo}
              </div>
              <div className="text-[11px] text-gray-500 mb-2">
                {new Date(commit.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              {commit.commits.slice(0, 2).map((c, i) => (
                <div key={i} className="text-sm text-gray-300 mb-1">
                  <span className="text-gray-600 font-mono text-xs">
                    {c.sha}
                  </span>{" "}
                  {c.message}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-600 mt-4 italic text-center">
        Click to return →
      </p>
    </Card>
  );

  return (
    <FlipCard
      id="github-activity"
      className={className}
      front={front}
      back={back}
      expandOnFlip={true}
      trigger="click"
    />
  );
}
