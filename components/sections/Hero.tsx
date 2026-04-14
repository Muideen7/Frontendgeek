"use client";

import React from "react";
import { motion } from "framer-motion";

const SKILLS = [
  {
    category: "Frontend",
    items: ["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Prisma", "Python", "PostgreSQL"]
  },
  {
    category: "Tools & Environment",
    items: ["Git / GitHub", "Bash / Shell", "Vercel", "Figma", "VS Code"]
  }
];

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen py-32 md:py-48 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 relative"
    >
      <div className="flex flex-col justify-center space-y-6">
        <div className="space-y-0 text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[12vw] md:text-[8vw] font-light leading-[0.9] tracking-tighter uppercase select-none cursor-default text-primary"
          >
            OLAYEYE <br /> MUIDEEN
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-[9px] md:text-[10px] tracking-[0.6em] uppercase text-muted-foreground mt-6 block"
          >
            Fullstack developer / UX architect
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-24 space-y-4"
        >
          <p className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
            For business inquiries
          </p>
          <a
            href="mailto:olayeyeayomide2@gmail.com"
            className="text-lg md:text-xl font-light hover:text-primary underline underline-offset-8 transition-all"
            data-cursor="pointer"
          >
            olayeyeayomide2@gmail.com
          </a>
        </motion.div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {SKILLS.map((cat, i) => (
            <motion.div 
              key={cat.category} 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              className="space-y-6"
            >
              <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/50 border-b border-border pb-2 inline-block">
                {cat.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 border border-border rounded-full text-[9px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
