"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Folder } from "lucide-react";
import Image from "next/image";
import { FEATURED_PROJECTS } from "@/lib/constants";

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
  year: string;
  role: string;
  image: string;
  remoteImage: string;
}

export default function Work() {
  const featuredIds = ["devmentor", "eteck", "lexiclear", "mindflow"];
  
  // Sort and filter: DevMentor first, then LexiClear, then MindFlow
  const featured = featuredIds.map(id => 
    FEATURED_PROJECTS.find(p => p.id === id)
  ).filter(Boolean);

  const others = FEATURED_PROJECTS.filter(p => !featuredIds.includes(p.id));

  return (
    <section id="work" className="py-32 md:py-48 max-w-6xl mx-auto">
      <div className="w-full h-px bg-border relative mb-24">
        <span className="absolute -top-4 left-0 font-mono text-[8px] tracking-[0.4em] uppercase text-muted-foreground">
          03. Some Things I&apos;ve Built
        </span>
      </div>

      {/* Featured Projects */}
      <div className="space-y-32">
        {featured.map((project, i) => (
          <FeaturedProject 
            key={project!.id} 
            project={project!} 
            reverse={i % 2 !== 0} 
          />
        ))}
      </div>

      {/* Other Projects */}
      <div className="mt-48 text-center space-y-12">
        <h2 className="text-2xl font-light tracking-tighter uppercase">
          Other Noteworthy Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left mt-24">
          {others.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProject({ project, reverse }: { project: Project, reverse: boolean }) {
  return (
    <div className={`relative flex flex-col lg:flex-row items-center gap-8 ${reverse ? "lg:flex-row-reverse" : ""}`}>
      {/* Project Image */}
      <div className="relative w-full lg:w-[60%] aspect-video group overflow-hidden border border-border bg-foreground/5 mb-8 lg:mb-0">
        <Image
          src={project.image}
          alt={project.name}
          fill
          unoptimized
          className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
          <span className="text-2xl md:text-4xl font-black tracking-tighter uppercase text-muted-foreground/30 text-center px-4">
            {project.name}
          </span>
        </div>
        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* Project Info */}
      <div className={`w-full lg:w-[50%] lg:absolute z-10 flex flex-col ${reverse ? "lg:left-0 lg:items-start lg:text-left" : "lg:right-0 lg:items-end lg:text-right"}`}>
        <p className="font-mono text-[10px] tracking-widest uppercase text-primary mb-2">
          Featured Project
        </p>
        <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-6 drop-shadow-sm">
          {project.name}
        </h3>
        
        <div className="p-6 md:p-8 bg-foreground/5 backdrop-blur-xl border border-foreground/10 rounded shadow-2xl mb-6 relative group transform hover:-translate-y-1 transition-transform duration-500">
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        <ul className={`flex flex-wrap gap-4 font-mono text-[9px] tracking-widest uppercase text-muted-foreground/60 mb-8 ${reverse ? "justify-start" : "justify-end"}`}>
          {project.tags.map((tag: string) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className="flex gap-6 items-center">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Github size={20} strokeWidth={1.5} />
          </a>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <ExternalLink size={20} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-8 bg-foreground/[0.03] border border-border hover:border-primary/20 transition-all group flex flex-col h-full hover:-translate-y-2 duration-500"
    >
      <div className="flex justify-between items-start mb-8">
        <Folder className="text-primary" size={32} strokeWidth={1} />
        <div className="flex gap-4 items-center">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Github size={18} strokeWidth={1.5} />
          </a>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <ExternalLink size={18} strokeWidth={1.5} />
          </a>
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-4 tracking-tighter group-hover:text-primary transition-colors">
        {project.name}
      </h3>
      
      <p className="text-xs text-muted-foreground leading-relaxed flex-grow">
        {project.description}
      </p>
      
      <ul className="flex flex-wrap gap-4 mt-8 font-mono text-[8px] tracking-[0.2em] uppercase text-muted-foreground/40">
        {project.tags.map((tag: string) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </motion.div>
  );
}
