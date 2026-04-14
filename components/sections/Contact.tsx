"use client";

import React from "react";
import { Github, Twitter, ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <footer id="contact" className="relative z-20 px-0 py-24 md:py-32 border-t border-border bg-background overflow-hidden">
      <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/4 select-none pointer-events-none opacity-[0.03]">
        <span className="text-[20vw] font-black uppercase whitespace-nowrap leading-none block">
          MUIDEEN
        </span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 relative z-10">
        <div className="space-y-6">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground">
            04. Next Move
          </p>
          <p className="text-4xl md:text-5xl lg:text-6xl font-black max-w-xl tracking-tighter leading-[0.9] uppercase">
            READY TO SCALE <br /> & ESTABLISH.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 md:gap-12 font-mono text-[9px] tracking-widest uppercase items-center">
          <a
            href="https://github.com/muideen7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group hover:text-primary transition-colors text-muted-foreground"
          >
            <Github size={14} strokeWidth={1} /> GitHub
          </a>
          <a
            href="https://x.com/OlayeyeMuideen"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group hover:text-primary transition-colors text-muted-foreground"
          >
            <Twitter size={14} strokeWidth={1} /> Twitter
          </a>
          <a
            href="mailto:olayeyeayomide2@gmail.com"
            className="flex items-center gap-3 py-3 px-8 border border-border rounded-full hover:bg-primary hover:text-background transition-all duration-700 group"
          >
            CONTACT <ArrowUpRight size={14} strokeWidth={1} />
          </a>
        </div>
      </div>
      <p className="mt-40 font-mono text-[8px] tracking-[0.6em] opacity-10 uppercase select-none text-center">
        © 2026 O.M. — BUILT WITH CARE AND A LOT OF CURIOSITY
      </p>
    </footer>
  );
}
