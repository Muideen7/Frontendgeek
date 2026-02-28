"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const GLYPHS = ["{", "}", "(", ")", "/", "*", "#", "<", ">", "_", "!", "?"];

export default function Home() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-full flex flex-col">
      {/* Background Glyphs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {mounted && GLYPHS.map((glyph, i) => (
          <FloatingGlyph key={i} glyph={glyph} />
        ))}
      </div>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center z-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-home/20 bg-accent-home/5 text-accent-home text-[10px] uppercase font-mono tracking-widest animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-home" />
            Available for new opportunities
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
            SOFTWARE <br />
            <span className="text-muted-foreground/20">ENGINEER</span>
          </h1>

          <p className="max-w-xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed mb-12">
            Building high-performance web systems and developer-centric tools. 
            Focused on the intersection of <span className="text-white">systems engineering</span> and <span className="text-white">user experience</span>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded transition-colors hover:bg-accent-home"
            >
              Explore My Work
            </motion.button>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="text-[10px] uppercase tracking-widest font-mono">Connect:</span>
              <a href="#" className="hover:text-white transition-colors"><Github size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><Mail size={18} /></a>
            </div>
          </div>
        </motion.div>

        {/* Home Detail Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl z-10">
          <DetailCard 
            title="Core Tech"
            tags={["Next.js", "TypeScript", "Node.js", "Go"]}
            accent="var(--color-accent-blue)"
          />
          <DetailCard 
            title="Philosophy"
            text="Clean architecture, automated workflows, and brutalist performance optimizations."
            accent="var(--color-accent-home)"
          />
          <DetailCard 
            title="Current Status"
            text="Lagos, Nigeria · GMT+1"
            subText={mounted ? time.toLocaleTimeString() : "--:--:--"}
            accent="var(--color-accent-experiments)"
          />
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="px-6 py-20 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-black tracking-tighter mb-4 uppercase">Let's build <br /> something great</h2>
            <p className="text-muted-foreground text-sm max-w-sm">
              Currently accepting freelance projects and collaboration opportunities.
            </p>
          </div>
          <motion.a 
            href="mailto:olayeyeayomide2000@gmail.com"
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 group"
          >
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <Mail size={24} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">Get in touch</span>
              <p className="text-xl font-bold">olayeyeayomide2000@gmail.com</p>
            </div>
          </motion.a>
        </div>
      </section>
    </div>
  );
}

function FloatingGlyph({ glyph }: { glyph: string }) {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDuration = 10 + Math.random() * 20;

  return (
    <motion.div
      initial={{ left: `${randomX}%`, top: `${randomY}%`, opacity: 0 }}
      animate={{ 
        y: [0, -20, 0],
        rotate: [0, 90, 180, 270, 360],
        opacity: [0.1, 0.4, 0.1]
      }}
      transition={{ 
        duration: randomDuration, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="absolute text-white/10 font-mono text-2xl select-none"
    >
      {glyph}
    </motion.div>
  );
}

function DetailCard({ title, tags, text, subText, accent }: { title: string, tags?: string[], text?: string, subText?: string, accent: string }) {
  return (
    <div className="p-6 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: accent }} />
        <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">{title}</span>
      </div>
      {tags && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="text-xs font-bold px-2 py-1 bg-white/5 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
      {text && <p className="text-sm font-bold text-white leading-tight">{text}</p>}
      {subText && <p className="text-lg font-mono text-accent-home mt-2 tabular-nums">{subText}</p>}
    </div>
  );
}
