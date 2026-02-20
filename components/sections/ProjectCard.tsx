"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { FlipCard } from "@/components/ui/FlipCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink, Github, Code2, Star, FolderOpen } from "lucide-react";
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
  index?: number;
}

export function ProjectCard({ className, id, index = 0 }: ProjectCardProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/github/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Responsive height: Auto on mobile to close gaps, fixed 112 on desktop for alignment
  const responsiveHeight = "h-auto md:h-112";

  if (loading)
    return (
      <Card
        className={cn(
          responsiveHeight,
          "min-h-75 flex items-center justify-center border-zinc-800 bg-zinc-950 w-full m-0",
          className,
        )}
      >
        <div className="w-8 h-8 rounded-full border-2 border-zinc-800 border-t-blue-500 animate-spin" />
      </Card>
    );

  const project = projects[index];

  if (!project)
    return (
      <Card
        className={cn(
          responsiveHeight,
          "min-h-75 flex flex-col items-center justify-center border-zinc-800 bg-zinc-950 w-full m-0",
          className,
        )}
      >
        <FolderOpen className="w-10 h-10 text-zinc-800 mb-2" />
        <p className="text-xs text-zinc-500 font-mono">Empty</p>
      </Card>
    );

  const ogImageUrl = `${SITE_CONFIG.siteUrl}/api/og?title=${encodeURIComponent(project.title)}&tags=${encodeURIComponent(project.language || "Dev")}`;

  const front = (
    <Card className="p-0 flex flex-col border-zinc-800 bg-zinc-950 cursor-pointer overflow-hidden group h-full w-full m-0">
      <div className="relative aspect-video overflow-hidden bg-zinc-900 shrink-0">
        <Image
          src={ogImageUrl}
          alt={project.title}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 z-20">
          <Badge className="bg-zinc-950/90 text-blue-400 border-zinc-800 backdrop-blur-md">
            {project.language || "Repo"}
          </Badge>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 min-h-0">
        <div className="flex items-start justify-between gap-4 mb-3 shrink-0">
          <h3 className="text-xl font-bold text-zinc-100 capitalize truncate">
            {project.title.replace(/-/g, " ")}
          </h3>
          {project.stars > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
              <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
              {project.stars}
            </div>
          )}
        </div>
        <p className="text-sm text-zinc-400 line-clamp-3 mb-4 flex-1">
          {project.description}
        </p>
        <div className="mt-auto pt-4 border-t border-zinc-900 flex justify-between items-center shrink-0">
          <span className="text-[10px] text-zinc-600 font-mono uppercase">
            Details
          </span>
          <span className="text-[10px] text-blue-500 font-bold uppercase group-hover:translate-x-1 transition-transform">
            View Project →
          </span>
        </div>
      </div>
    </Card>
  );

  const back = (
    <Card className="bg-zinc-900 border-blue-500/20 p-6 flex flex-col cursor-pointer h-full w-full m-0">
      <div className="mb-6 shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <Code2 className="w-5 h-5 text-blue-400" />
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
            Description
          </span>
        </div>
        <h3 className="text-xl font-bold text-white capitalize truncate leading-tight">
          {project.title.replace(/-/g, " ")}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 mb-6 text-zinc-300 text-sm leading-relaxed custom-scrollbar min-h-0">
        {project.description}
      </div>

      <div className="flex flex-row gap-3 mt-auto shrink-0">
        {!project.isPrivate && (
          <Button
            as="a"
            href={project.url}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 gap-2 bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700 h-11 text-[11px] px-2 flex items-center justify-center"
          >
            <Github className="w-4 h-4 shrink-0" />
            <span className="truncate">View Source</span>
          </Button>
        )}
        {project.homepage && (
          <Button
            as="a"
            href={project.homepage}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 gap-2 bg-blue-600 hover:bg-blue-500 text-white h-11 text-[11px] px-2 flex items-center justify-center"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            <span className="truncate">Live Demo</span>
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <FlipCard
      id={id}
      className={cn(responsiveHeight, "w-full p-0 m-0", className)}
      front={front}
      back={back}
      trigger="click"
    />
  );
}
