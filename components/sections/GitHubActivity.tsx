"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { FlipCard } from "@/components/ui/FlipCard";
import { Badge } from "@/components/ui/Badge";
import { Github, GitCommit } from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
}

interface Commit {
  repo: string;
  commits: { message: string; sha: string }[];
  createdAt: string;
}

export function GitHubActivity({ className }: { className?: string }) {
  const [contributions, setContributions] = useState<ContributionDay[][]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loadingCommits, setLoadingCommits] = useState(false);
  const [commitsLoaded, setCommitsLoaded] = useState(false);

  // ================= LOAD CONTRIBUTIONS IMMEDIATELY =================
  useEffect(() => {
    fetch("/api/github/contributions")
      .then((res) => res.json())
      .then((data) => {
        setContributions(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // ================= LAZY LOAD COMMITS =================
  const loadCommits = async () => {
    if (commitsLoaded) return;

    setLoadingCommits(true);

    try {
      const res = await fetch("/api/github/commits");
      const data = await res.json();
      setCommits(data);
      setCommitsLoaded(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCommits(false);
    }
  };

  // ================= TOTAL CONTRIBUTIONS =================
  const totalContributions = contributions
    .flat()
    .reduce((sum, day) => sum + day.count, 0);

  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-900";
    if (count <= 2) return "bg-emerald-900/40";
    if (count <= 5) return "bg-emerald-700/60";
    if (count <= 10) return "bg-emerald-500/80";
    return "bg-emerald-400";
  };

  // ================= FRONT =================
  const front = (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Github className="w-5 h-5 text-white" />
          <h3 className="text-[11px] font-bold tracking-widest text-gray-300">
            GITHUB ACTIVITY
          </h3>
        </div>
        <Badge variant="outline" className="text-[10px]">
          {totalContributions} contributions
        </Badge>
      </div>

      <div className="flex gap-0.5 overflow-x-auto pb-2 scrollbar-hide">
        {contributions.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-0.5">
            {week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`w-3 h-3 rounded-sm ${getColor(
                  day.count,
                )} hover:scale-110 transition`}
                title={`${new Date(day.date).toLocaleDateString()} — ${
                  day.count
                } contributions`}
              />
            ))}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-600 italic text-center mt-3">
        Click to see commit history →
      </p>
    </Card>
  );

  // ================= BACK =================
  const back = (
    <Card className="h-full bg-linear-to-br from-gray-950 to-black overflow-y-auto max-h-150">
      <div className="flex items-center gap-2 mb-5">
        <GitCommit className="w-5 h-5 text-emerald-400" />
        <h3 className="text-sm font-bold text-white">Recent Commits</h3>
      </div>

      {loadingCommits ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-900/50 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : commits.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent commits found.</p>
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
                {new Date(commit.createdAt).toLocaleDateString()}
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
    </Card>
  );

  return (
    <FlipCard
      id="github-activity"
      className={className}
      front={front}
      back={back}
      expandOnFlip
      trigger="click"
      onFlip={loadCommits} // 👈 LAZY LOAD HERE
    />
  );
}
