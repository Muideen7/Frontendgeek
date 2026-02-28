"use client";

import React from "react";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Code2, AlertCircle, CheckCircle2, Info } from "lucide-react";

interface ProjectCaseStudy {
  id: string;
  title: string;
  tags: string[];
  situation: string;
  task: string;
  action: string;
  result: string;
  repoUrl?: string;
  liveUrl?: string;
}

export function ProjectSection({ project }: { project: ProjectCaseStudy }) {
  return (
    <TerminalWindow title={`git show ${project.id}`} command={`cat ${project.id}.md`}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-primary/20 text-primary/70 font-mono text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 border-l border-border/30 pl-4 py-2">
          <CaseStep 
            icon={<Info size={14} className="text-blue-400" />} 
            label="SITUATION" 
            content={project.situation} 
          />
          <CaseStep 
            icon={<AlertCircle size={14} className="text-amber-400" />} 
            label="TASK" 
            content={project.task} 
          />
          <CaseStep 
            icon={<Code2 size={14} className="text-primary" />} 
            label="ACTION" 
            content={project.action} 
          />
          <CaseStep 
            icon={<CheckCircle2 size={14} className="text-emerald-400" />} 
            label="RESULT" 
            content={project.result} 
          />
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          {project.repoUrl && (
            <Button variant="outline" size="sm" asChild className="h-9 gap-2 font-mono text-xs">
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github size={14} /> git clone
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button variant="default" size="sm" asChild className="h-9 gap-2 bg-primary text-black hover:bg-primary/90 font-mono text-xs">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} /> ./deploy --live
              </a>
            </Button>
          )}
        </div>
      </div>
    </TerminalWindow>
  );
}

function CaseStep({ icon, label, content }: { icon: React.ReactNode, label: string, content: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
        {icon}
        {label}
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed">
        {content}
      </p>
    </div>
  );
}
