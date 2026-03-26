'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { FEATURED_PROJECTS } from '@/lib/constants';

const PROJECTS = FEATURED_PROJECTS;

export default function WorksPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastWheelTime = useRef(0);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= PROJECTS.length || isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 900);
  }, [isTransitioning]);

  // Smooth wheel-based navigation (single-finger trackpad only)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Skip: pinch-zoom (2+ fingers on macOS)
      if (e.ctrlKey) return;
      // Skip: mouse wheel (line/page mode)  
      if (e.deltaMode !== 0) return;
      // Debounce — only one transition per 900ms
      const now = Date.now();
      if (now - lastWheelTime.current < 900) return;

      if (Math.abs(e.deltaY) < 5) return; // ignore micro nudges

      lastWheelTime.current = now;
      if (e.deltaY > 0) goTo(activeIndex + 1);
      else goTo(activeIndex - 1);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(activeIndex + 1);
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goTo(activeIndex - 1);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKey);
    return () => {
      el.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeIndex, goTo]);

  const project = PROJECTS[activeIndex];

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-hidden bg-background text-foreground relative"
    >
      {/* ── Fixed: Top-left Index Counter ── */}
      <div className="fixed top-12 left-[8.5rem] md:left-48 z-50 pointer-events-none select-none">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-baseline gap-2"
        >
          <span className="text-5xl font-light tracking-tighter tabular-nums">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-muted-foreground">
            / {String(PROJECTS.length).padStart(2, '0')}
          </span>
        </motion.div>
      </div>

      {/* ── Fixed: Vertical Dot Stepper (right edge) ── */}
      <div className="fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-none">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="pointer-events-auto w-1 rounded-full transition-all duration-500 cursor-pointer"
            style={{
              height: i === activeIndex ? 28 : 6,
              background: i === activeIndex ? 'var(--primary)' : 'var(--muted-foreground)',
              opacity: i === activeIndex ? 1 : 0.25,
            }}
          />
        ))}
      </div>

      {/* ── Main Slide Area ── */}
      <AnimatePresence mode="wait">
        <motion.section
          key={project.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="h-screen w-full flex items-center justify-center px-8 md:px-24 relative overflow-hidden"
        >
          {/* Giant index watermark */}
          <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden">
            <motion.span
              key={activeIndex + '-wm'}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 0.025, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[28vw] font-black italic uppercase leading-none tracking-tighter pr-8 md:pr-16"
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </motion.span>
          </div>

          {/* ── Two-column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-center w-full max-w-7xl relative z-10">

            {/* Left — Project metadata */}
            <div className="space-y-10">
              {/* Meta row */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-6 font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground"
              >
                <span>{project.year}</span>
                <span className="w-6 h-px bg-border" />
                <span>{project.role}</span>
              </motion.div>

              {/* Project name */}
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-[11vw] lg:text-[6.5vw] font-light tracking-tighter uppercase leading-[0.85]">
                  {project.name}
                </h1>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="h-px bg-border origin-left"
              />

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-base lg:text-lg text-muted-foreground font-light italic leading-relaxed max-w-md"
              >
                {project.description}
              </motion.p>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-2"
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 border border-border rounded-full font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="inline-flex items-center gap-3 group font-mono text-[10px] tracking-[0.4em] uppercase hover:text-primary transition-colors duration-300"
                >
                  <span className="border-b border-current pb-px">View Live Project</span>
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.5}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  />
                </a>
              </motion.div>
            </div>

            {/* Right — Preview image */}
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="pointer"
              className="group relative block"
            >
              {/* Aspect container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-foreground/5 border border-border">
                {/* Remote OG image with generated fallback */}
                <img
                  src={project.remoteImage}
                  alt={project.name}
                  onError={(e) => {
                    // Fallback to dynamically generated OG image
                    (e.currentTarget as HTMLImageElement).src = project.image;
                  }}
                  className="w-full h-full object-cover grayscale transition-all duration-[2s] group-hover:grayscale-0 group-hover:scale-[1.03]"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="font-mono text-[10px] tracking-[0.5em] uppercase border border-foreground/20 text-foreground px-6 py-3">
                    Open Project
                  </span>
                </div>

                {/* Top-right corner accent */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight size={18} strokeWidth={1} />
                </div>
              </div>

              {/* Caption below image */}
              <div className="flex justify-between items-center mt-4">
                <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-muted-foreground">
                  {project.url.replace('https://', '').replace(/\/$/, '')}
                </span>
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-muted-foreground">
                  Preview
                </span>
              </div>
            </motion.a>
          </div>

          {/* Bottom scroll hint (only on first slide) */}
          {activeIndex === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            >
              <span className="font-mono text-[8px] tracking-[0.5em] uppercase text-muted-foreground">Scroll</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <ArrowDown size={12} strokeWidth={1} className="text-muted-foreground" />
              </motion.div>
            </motion.div>
          )}

          {/* Next project preview (bottom strip) */}
          {activeIndex < PROJECTS.length - 1 && (
            <button
              onClick={() => goTo(activeIndex + 1)}
              className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-center gap-4 border-t border-border/50 text-muted-foreground hover:text-foreground transition-colors duration-300 group pointer-events-auto"
            >
              <span className="font-mono text-[8px] tracking-[0.4em] uppercase">
                Next — {PROJECTS[activeIndex + 1].name}
              </span>
              <ArrowDown size={10} strokeWidth={1} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
          )}
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
