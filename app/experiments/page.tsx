"use client";

import React from "react";
import { motion } from "framer-motion";
import { FlaskConical, Play, Github } from "lucide-react";

const EXPERIMENTS = [
  {
    title: "Runtime Optimization",
    description: "Exploring V8 engine internals and memory management patterns in Node.js.",
    status: "ongoing",
  },
  {
    title: "Rust-based Tooling",
    description: "Building developer utilities with Rust to improve local development speed.",
    status: "experimental",
  },
  {
    title: "Minimalist CSS Engine",
    description: "A proof-of-concept for a utility-first CSS engine built from scratch.",
    status: "completed",
  },
];

export default function ExperimentsPage() {
  return (
    <div className="p-8 md:p-16 lg:p-24 min-h-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-24"
      >
        <div className="flex items-center gap-3 mb-4">
          <FlaskConical className="text-accent-experiments" size={16} />
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-experiments">Lab & Experiments</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.8] mb-8">
          Technical <br />
          <span className="text-muted-foreground/20">Explorations</span>
        </h1>
        <p className="max-w-md text-muted-foreground text-sm leading-relaxed">
          Where I push the boundaries of my knowledge, test new technologies, 
          and build prototypes that might one day become something more.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EXPERIMENTS.map((exp, i) => (
          <motion.div 
            key={exp.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group relative overflow-hidden"
          >
            {/* Status indicator */}
            <div className="absolute top-0 right-0 p-4">
              <span className="text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-accent-experiments/20 text-accent-experiments bg-accent-experiments/5">
                {exp.status}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-4 italic group-hover:text-accent-experiments transition-colors">{exp.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-8">
              {exp.description}
            </p>

            <div className="flex items-center gap-4 mt-auto">
              <button className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold text-white hover:text-accent-experiments transition-colors">
                <Play size={10} /> Launch Lab
              </button>
              <button className="text-muted-foreground hover:text-white transition-colors">
                <Github size={14} />
              </button>
            </div>
            
            {/* Animated background glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent-experiments/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
