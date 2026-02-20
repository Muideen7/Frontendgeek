"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { FlipCard } from "@/components/ui/FlipCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ExternalLink,
  Github,
  Code2,
  Star,
  FolderOpen,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  description: string;
  stars: number;
  language: string;
  url: string;
  homepage?: string;
  isPrivate: boolean;
}

interface ProjectCardProps {
  className?: string;
  id?: string;
}

type LoadingState = "idle" | "loading" | "success" | "error";

export function ProjectCard({ className, id }: ProjectCardProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoadingState("loading");
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const res = await fetch("/api/github/projects", {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Failed to fetch projects (${res.status})`,
        );
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }

      setProjects(data);
      setLoadingState("success");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to load projects. Please try again.";

      console.error("[ProjectCard] Fetch error:", {
        error: err,
        timestamp: new Date().toISOString(),
        endpoint: "/api/github/projects",
      });

      setError(errorMessage);
      setLoadingState("error");
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Loading State
  if (loadingState === "loading") {
    return (
      <Card
        className={cn(
          "h-[28rem] flex flex-col items-center justify-center border-zinc-800 bg-zinc-950",
          className,
        )}
        role="status"
        aria-live="polite"
        aria-label="Loading project information"
      >
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />
          <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
        </div>
        <p className="text-sm text-zinc-500 font-medium">
          Loading featured project...
        </p>
      </Card>
    );
  }

  // Error State
  if (loadingState === "error") {
    return (
      <Card
        className={cn(
          "h-[28rem] flex flex-col items-center justify-center text-center p-8 border-red-900/30 bg-red-950/20",
          className,
        )}
        role="alert"
        aria-live="assertive"
      >
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-zinc-100 mb-2">
          Unable to Load Project
        </h3>
        <p className="text-sm text-zinc-400 mb-6 max-w-md">{error}</p>
        <Button
          onClick={fetchProjects}
          className="gap-2 bg-zinc-800 hover:bg-zinc-700 text-white"
          aria-label="Retry loading projects"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      </Card>
    );
  }

  // Empty State
  if (projects.length === 0) {
    return (
      <Card
        className={cn(
          "h-[28rem] flex flex-col items-center justify-center text-center p-8 border-zinc-800 bg-zinc-950",
          className,
        )}
      >
        <FolderOpen className="w-16 h-16 text-zinc-700 mb-4" />
        <h3 className="text-lg font-semibold text-zinc-300 mb-2">
          No Featured Projects
        </h3>
        <p className="text-sm text-zinc-500 max-w-md">
          Projects tagged with{" "}
          <code className="px-2 py-1 bg-zinc-900 rounded text-xs font-mono">
            portfolio-feature
          </code>{" "}
          will appear here.
        </p>
      </Card>
    );
  }

  // Success State - Show Project
  const project = projects[0];
  const ogImageUrl = `${SITE_CONFIG.siteUrl}/api/og?title=${encodeURIComponent(project.title)}&tags=${encodeURIComponent(project.language || "Project")}`;

  const front = (
    <Card
      className="h-full p-0 flex flex-col border-zinc-800 bg-zinc-950 cursor-pointer overflow-hidden group"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title} project`}
    >
      {/* Project Preview Image */}
      <div className="relative aspect-video overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 z-10" />
        <Image
          src={ogImageUrl}
          alt={`${project.title} project preview`}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          priority={false}
        />

        {/* Language Badge */}
        <div className="absolute top-4 right-4 z-20">
          <Badge className="bg-zinc-950/90 text-blue-400 border-zinc-800 backdrop-blur-md font-medium">
            {project.language || "Repository"}
          </Badge>
        </div>

        {/* Private Badge (if applicable) */}
        {project.isPrivate && (
          <div className="absolute top-4 left-4 z-20">
            <Badge className="bg-zinc-950/90 text-yellow-400 border-yellow-900/30 backdrop-blur-md font-medium">
              Private
            </Badge>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-bold text-zinc-100 capitalize tracking-tight flex-1">
            {project.title.replace(/-/g, " ")}
          </h3>
          {project.stars > 0 && (
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 font-medium shrink-0"
              aria-label={`${project.stars} stars`}
            >
              <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
              {project.stars}
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 mb-6">
          {project.description || "A featured project from my portfolio."}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-900">
          <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
            Project Details
          </span>
          <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">
            Click to View →
          </span>
        </div>
      </div>
    </Card>
  );

  const back = (
    <Card
      className="h-full bg-gradient-to-br from-zinc-900 to-zinc-950 border-blue-500/20 p-6 sm:p-8 flex flex-col cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`Return to ${project.title} preview`}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Code2 className="w-5 h-5 text-blue-400" />
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em]">
            Repository Details
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white capitalize leading-tight">
          {project.title.replace(/-/g, " ")}
        </h3>
      </div>

      {/* Description */}
      <div className="flex-1 overflow-y-auto pr-2 mb-6 min-h-0">
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(39, 39, 42, 0.5);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(113, 113, 122, 0.5);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(161, 161, 170, 0.7);
          }
        `}</style>
        <p className="text-zinc-300 leading-relaxed text-sm sm:text-base custom-scrollbar">
          {project.description ||
            "This is a featured project showcasing my development work."}
        </p>

        {/* Metadata */}
        <div className="mt-6 flex flex-wrap gap-3">
          {project.language && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs text-zinc-400 font-medium">
                {project.language}
              </span>
            </div>
          )}
          {project.stars > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span className="text-xs text-zinc-400 font-medium">
                {project.stars} {project.stars === 1 ? "star" : "stars"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {!project.isPrivate && (
          <Button
            as="a"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="flex-1 gap-2 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 h-11 justify-center"
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <Github className="w-4 h-4" />
            <span>View Source</span>
          </Button>
        )}
        {project.homepage && (
          <Button
            as="a"
            href={project.homepage}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="flex-1 gap-2 bg-blue-600 hover:bg-blue-500 text-white h-11 justify-center"
            aria-label={`Visit ${project.title} live demo`}
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
          </Button>
        )}
      </div>

      {/* Return hint */}
      <div className="mt-4 text-center">
        <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
          Click to Return
        </span>
      </div>
    </Card>
  );

  return (
    <FlipCard
      id={id}
      className={cn("h-[28rem]", className)}
      front={front}
      back={back}
      trigger="click"
      expandOnFlip={false}
    />
  );
}
