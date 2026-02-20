"use client";

import { useEffect, useState } from "react";
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

export function ProjectCard({
  className,
  id,
}: {
  className?: string;
  id?: string;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("/api/github/projects");
        const data = await res.json();
        if (Array.isArray(data)) setProjects(data);
      } catch (_err) {
        console.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  if (loading) {
    return (
      <Card
        className={cn(
          "h-[28rem] animate-pulse bg-zinc-900/50 border-zinc-800",
          className,
        )}
      />
    );
  }

  // If no projects are tagged yet, show a placeholder state
  if (projects.length === 0) {
    return (
      <Card
        className={cn(
          "h-[28rem] flex flex-col items-center justify-center text-center p-6 border-zinc-800",
          className,
        )}
      >
        <FolderOpen className="w-12 h-12 text-zinc-700 mb-4" />
        <p className="text-sm text-zinc-500">
          No projects tagged with 'portfolio-feature' yet.
        </p>
      </Card>
    );
  }

  // We'll show the most recently updated tagged project
  const project = projects[0];

  const front = (
    <Card className="h-full p-0 flex flex-col border-zinc-800 bg-zinc-950 cursor-pointer overflow-hidden group">
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 z-10" />
        <Image
          src={`${SITE_CONFIG.siteUrl}/api/og?title=${encodeURIComponent(project.title)}&tags=${project.language}`}
          alt={project.title}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 z-20">
          <Badge className="bg-zinc-950/80 text-blue-400 border-zinc-800 backdrop-blur-md">
            {project.language || "Repository"}
          </Badge>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-zinc-100 capitalize tracking-tight">
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            {project.stars}
          </div>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 mb-6">
          {project.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-900">
          <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
            Project Details
          </span>
          <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">
            Click to Flip →
          </span>
        </div>
      </div>
    </Card>
  );

  const back = (
    <Card className="h-full bg-zinc-900 border-blue-500/20 p-8 flex flex-col cursor-pointer">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Code2 className="w-5 h-5 text-blue-400" />
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em]">
            Documentation
          </span>
        </div>
        <h3 className="text-2xl font-bold text-white capitalize">
          {project.title}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mb-8">
        <p className="text-zinc-300 leading-relaxed text-sm">
          {project.description}
        </p>
      </div>

      <div className="flex gap-3">
        {!project.isPrivate && (
          <Button
            as="a"
            href={project.url}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 gap-2 bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700 cursor-pointer h-11"
          >
            <Github className="w-4 h-4" /> Source
          </Button>
        )}
        {project.homepage && (
          <Button
            as="a"
            href={project.homepage}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 gap-2 bg-blue-600 hover:bg-blue-500 text-white cursor-pointer h-11"
          >
            <ExternalLink className="w-4 h-4" /> Live Demo
          </Button>
        )}
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
    />
  );
}
