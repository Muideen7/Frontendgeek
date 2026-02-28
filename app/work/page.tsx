"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: "01",
    title: "Nike E-Commerce",
    category: "Full Stack / T3 Stack",
    description: "High-performance ecommerce interface optimized for sub-1s page transitions and 95+ Lighthouse score.",
    tags: ["Next.js", "Prisma", "Tailwind"],
    repoUrl: "https://github.com/muideen7/Nike",
  },
  {
    id: "02",
    title: "Dojo Platform",
    category: "Real-time / React",
    description: "Multi-user blogging environment with Firebase Firestore for real-time data synchronization.",
    tags: ["React", "Firebase", "Real-time"],
    repoUrl: "https://github.com/muideen7/dojo-blog",
  },
  {
    id: "03",
    title: "Stockify Tracker",
    category: "Data Viz / API",
    description: "Dynamic dashboard for real-time stock market monitoring with high-fidelity visualizations.",
    tags: ["TypeScript", "API", "Data Vis"],
    repoUrl: "https://github.com/Muideen7/Stock-tracker-app",
  },
];

export default function WorkPage() {
  return (
    <div className="p-8 md:p-16 lg:p-24 min-h-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-24"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent-work mb-4 block">Selected Projects</span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.8] mb-8">
          Featured <br />
          <span className="text-muted-foreground/20">Work</span>
        </h1>
        <p className="max-w-md text-muted-foreground text-sm leading-relaxed">
          A collection of projects focusing on technical excellence, 
          clean architecture, and seamless user experiences.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="aspect-[16/10] bg-white/[0.03] rounded-lg border border-white/5 overflow-hidden relative mb-6">
        {/* Placeholder for project image/visual */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
          <span className="text-8xl font-black tracking-tighter uppercase font-mono italic">{project.id}</span>
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-accent-work/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl"
          >
            <ArrowUpRight size={24} />
          </motion.div>
        </div>
      </div>

      <div className="flex justify-between items-start gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">{project.category}</span>
          <h3 className="text-2xl font-black tracking-tighter uppercase italic group-hover:text-accent-work transition-colors">{project.title}</h3>
          <p className="text-muted-foreground text-sm mt-3 max-w-sm leading-relaxed">
            {project.description}
          </p>
        </div>
        <div className="flex gap-4">
          <a href={project.repoUrl} target="_blank" className="text-muted-foreground hover:text-white transition-colors">
            <Github size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
