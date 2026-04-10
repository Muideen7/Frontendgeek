"use client";

import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { FEATURED_PROJECTS } from "@/lib/constants";

const MotionImage = motion.create(Image);

const PROJECTS = FEATURED_PROJECTS;

export default function WorksPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Accurate activeIndex calculation
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = PROJECTS.length;

    const current = Math.min(Math.floor(latest * total), total - 1);
    if (latest > 0.99) setActiveIndex(total - 1);
    else if (current !== activeIndex) setActiveIndex(current);
  });

  const scrollToProject = (index: number) => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll(".project-section");
    if (items[index]) {
      items[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden scroll-smooth bg-[radial-gradient(ellipse_at_top_right,_var(--primary-rgb),_transparent_40%)]">
      {/* ── Fixed: Navigation Counter ── */}
      <div className="fixed top-28 md:top-12 left-8 md:left-48 z-50 pointer-events-none select-none">
        <div className="flex items-center gap-4 md:gap-8">
          <button
            onClick={() => scrollToProject(activeIndex - 1)}
            disabled={activeIndex === 0}
            className={`pointer-events-auto p-2 transition-all duration-300 ${activeIndex === 0 ? "opacity-0 scale-50" : "text-muted-foreground hover:text-primary active:scale-90 opacity-70 hover:opacity-100"}`}
          >
            <ChevronLeft size={28} strokeWidth={1} />
          </button>

          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: -10, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-baseline gap-2 md:gap-4"
          >
            <span className="text-4xl md:text-6xl font-light tracking-tighter tabular-nums text-primary drop-shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground opacity-30">
              {String(PROJECTS.length).padStart(2, "0")}
            </span>
          </motion.div>

          <button
            onClick={() => scrollToProject(activeIndex + 1)}
            disabled={activeIndex === PROJECTS.length - 1}
            className={`pointer-events-auto p-2 transition-all duration-300 ${activeIndex === PROJECTS.length - 1 ? "opacity-0 scale-50" : "text-muted-foreground hover:text-primary active:scale-90 opacity-70 hover:opacity-100"}`}
          >
            <ChevronRight size={28} strokeWidth={1} />
          </button>
        </div>
      </div>

      {/* ── Fixed: Vertical Dot Stepper ── */}
      <div className="fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-none">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToProject(i)}
            className="pointer-events-auto w-1 rounded-full transition-all duration-500 cursor-pointer"
            style={{
              height: i === activeIndex ? 32 : 8,
              background:
                i === activeIndex
                  ? "var(--primary)"
                  : "var(--muted-foreground)",
              opacity: i === activeIndex ? 1 : 0.2,
            }}
          />
        ))}
      </div>

      {/* ── Main Linear Scroll Context ── */}
      <main ref={containerRef} className="relative w-full">
        {PROJECTS.map((project, i) => (
          <ProjectSection
            key={project.id}
            project={project}
            index={i}
          />
        ))}

        {/* Remainder space */}
        <section className="h-[50vh] w-full flex flex-col items-center justify-center border-t border-border/10 bg-background/50 backdrop-blur-3xl ml-24 md:ml-32">
          <div className="text-center space-y-6">
            <p className="font-mono text-[10px] tracking-[0.6em] text-muted-foreground uppercase opacity-50">
              END OF SHOWCASE
            </p>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase opacity-20">
              NEXT: CONTACT
            </h2>
            <div className="w-px h-24 bg-gradient-to-b from-primary/20 to-transparent mx-auto mt-12" />
          </div>
        </section>
      </main>
    </div>
  );
}

export interface ProjectProps {
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

function ProjectSection({
  project,
  index,
}: {
  project: ProjectProps;
  index: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [imgSrc, setImgSrc] = useState(project.remoteImage);

  // Transform logic for subtle background parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle internal parallax for the image remains to give it depth without blurring
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sectionRef}
      className="project-section relative min-h-[100dvh] w-full flex items-center justify-center py-32 md:py-0 border-t border-border/10 bg-background overflow-hidden"
    >
      <div className="w-full h-full flex flex-col justify-center px-4 lg:px-24 max-w-screen-2xl mx-auto relative z-10">
        {/* Background Index */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none opacity-20 dark:opacity-5 mix-blend-difference overflow-hidden">
          <motion.span
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[40vw] md:text-[30vw] font-black italic uppercase leading-none tracking-tighter pr-2 md:pr-16"
          >
            {index + 1}
          </motion.span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-center w-full max-w-7xl mx-auto relative z-10 px-0 md:px-12">
          {/* Project metadata */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-center gap-6 font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground"
            >
              <span>{project.year}</span>
              <span className="w-6 h-px bg-border" />
              <span>{project.role}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.3, once: true }}
              transition={{ duration: 0.85, delay: 0.15 }}
            >
              <h1 className="text-[11vw] lg:text-[6.5vw] font-light tracking-tighter uppercase leading-[0.85] text-foreground">
                {project.name}
              </h1>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="h-px bg-primary/20 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base lg:text-lg text-muted-foreground font-light italic leading-relaxed max-w-md"
            >
              {project.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-2"
            >
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-border/50 rounded-full font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 group font-mono text-[10px] tracking-[0.4em] uppercase hover:text-primary transition-colors duration-300"
              >
                <span className="border-b border-current pb-px">
                  View Live Project
                </span>
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </a>
            </motion.div>
          </div>

          {/* Preview image */}
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="group relative block w-full h-full"
          >
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-foreground/5 border border-border shadow-2xl">
              <MotionImage
                style={{ y: imgY, scale: 1.15 }}
                src={imgSrc}
                alt={project.name}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 60vw"
                onError={() => setImgSrc(project.image)}
                className="object-cover transition-all duration-700 group-hover:scale-[1.25] grayscale-[0.5] group-hover:grayscale-0 contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <span className="font-mono text-[10px] tracking-[0.5em] uppercase border border-foreground/30 text-foreground px-8 py-4 bg-background/50 backdrop-blur-md">
                  Open Project
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6 uppercase font-mono text-[9px] tracking-[0.4em] text-muted-foreground/60">
              <span>
                {project.url.replace("https://", "").replace(/\/$/, "")}
              </span>
              <div className="h-px w-24 bg-border/20 mx-4" />
              <span>Archive {project.year}</span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
