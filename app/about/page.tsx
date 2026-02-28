"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <div className="p-8 md:p-16 lg:p-24 min-h-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-24"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent-about mb-4 block">About Me</span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.8] mb-8">
          The <br />
          <span className="text-muted-foreground/20">Engineer</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6 text-muted-foreground text-sm md:text-base leading-relaxed">
            <p>
              I am Olamide Muideen Ayomide, a software engineer with a passion for building high-performance, scalable web systems. My journey in tech is driven by a curiosity for how complex systems interact and a desire to create tools that empower others.
            </p>
            <p>
              With a background rooted in systems engineering (ALX) and advanced frontend development (Andela), I bridge the gap between low-level performance and high-level user experience. I believe in clean architecture, automated workflows, and the power of well-designed developer tools.
            </p>
            <p>
              Outside of my core engineering work, I am the founder of <span className="text-white">TechLync</span>, where I dedicate my time to mentoring aspiring developers and building a supportive community for self-taught learners.
            </p>
          </div>

          <div className="space-y-12">
            <AboutSection title="Foundations">
              <div className="flex flex-wrap gap-2">
                {["ALX SE", "Andela", "Systems Design", "Performance Optimization"].map((tag) => (
                  <Badge key={tag} variant="outline" className="border-accent-about/20 text-accent-about font-mono uppercase text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </AboutSection>

            <AboutSection title="Personal stack">
               <p className="text-sm text-muted-foreground italic">
                "Code is poetry, but performance is the truth."
               </p>
            </AboutSection>

            <AboutSection title="Experience">
              <div className="space-y-4">
                <div className="border-l-2 border-accent-about/20 pl-4 py-2">
                  <h4 className="text-white font-bold text-sm">TechLync Founder</h4>
                  <p className="text-[10px] text-muted-foreground uppercase font-mono">2023 - Present</p>
                </div>
                <div className="border-l-2 border-accent-about/20 pl-4 py-2 opacity-50">
                   <h4 className="text-white font-bold text-sm">Freelance Web Architect</h4>
                  <p className="text-[10px] text-muted-foreground uppercase font-mono">2022 - 2023</p>
                </div>
              </div>
            </AboutSection>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AboutSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/50">{title}</h3>
      {children}
    </div>
  );
}
