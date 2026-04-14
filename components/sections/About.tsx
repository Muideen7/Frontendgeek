"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-32 md:py-48 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16 md:gap-32 items-center">
      <div className="space-y-12">
        <div className="space-y-6">
          <div className="w-full h-px bg-border relative">
            <span className="absolute -top-4 left-0 font-mono text-[8px] tracking-[0.4em] uppercase text-muted-foreground">
              01. About Me
            </span>
          </div>
        </div>


        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-xl text-md md:text-lg text-foreground/80 leading-relaxed md:leading-loose space-y-8 font-normal"
        >
          <p>
            My journey into tech started with pure curiosity. Back in 2019, I&apos;d spend hours watching my elder brother relentlessly go through YouTube tutorials, and I just wanted to build something I could show off to my friends—or anyone else who would listen.
          </p>
          <p>
            What started as a hobby quickly turned into a genuine love for Frontend development. There&apos;s something special about bringing a static idea to life through smooth animations and designs that look and feel just right. 
          </p>
          <p>
            For me, tech wasn&apos;t a calculated career move; it was just something I fell in love with because I liked the process of creating.
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative aspect-square md:aspect-[4/5] bg-foreground/5 rounded-sm overflow-hidden border border-foreground/10 group shadow-2xl"
      >
        <Image 
          src="https://github.com/muideen7.png" 
          alt="Olayeye Muideen" 
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-all duration-1000 grayscale-0 group-hover:grayscale-0 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <div className="p-8 border border-white/20 text-white font-mono text-[10px] tracking-[0.6em] uppercase">Visual Identity</div>
        </div>
      </motion.div>
    </section>
  );
}
