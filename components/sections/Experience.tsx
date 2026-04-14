"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EXPERIENCES = [
  {
    company: "DevCareer",
    role: "Product Design Intern",
    period: "2023 - 2024",
    description: [
      "Augmented technical engineering skills with specialized UI/UX Product Design training.",
      "Mastered Figma for high-fidelity prototyping, wireframing, and interactive user flows.",
      "Collaborated on user-centered design solutions, bridging the gap between aesthetics and functional code requirements.",
      "Focused on design-to-code handoffs and implementing pixel-perfect interfaces in Next.js environments."
    ]
  },
  {
    company: "ALX Africa",
    role: "Software Engineering Intern",
    period: "2022 - 2023",
    description: [
      "Completed an intensive 12-month full-stack curriculum in partnership with Holberton School.",
      "Developed deep-level expertise in C programming, memory management, and data structures.",
      "Mastered Python and modern web frameworks for scalable system engineering.",
      "Engineered various complex projects including shell implementations and custom web servers, demonstrating rigorous technical precision."
    ]
  },
  {
    company: "Andela",
    role: "React Program Intern",
    period: "2023",
    description: [
      "Specialized in advanced React patterns and component-based architecture for enterprise-grade applications.",
      "Implemented complex state management solutions and optimized frontend performance.",
      "Built responsive, mobile-first interfaces using the latest hooks and context APIs.",
      "Focused on delivering high-fidelity user experiences with clean, type-safe code in TypeScript."
    ]
  },
  {
    company: "FreeCodeCamp",
    role: "Frontend Development Intern",
    period: "2021 - 2022",
    description: [
      "Established a foundational mastery of web standards and JavaScript algorithms.",
      "Earned certifications in Responsive Web Design and JavaScript Algorithms & Data Structures.",
      "Engineered several foundational web projects, mastering DOM manipulation and CSS layout engines.",
      "Initiated a journey into high-quality engineering by building and deploying functional web applications from scratch."
    ]
  }
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-32 md:py-48">
      <div className="w-full h-px bg-border relative mb-24">
        <span className="absolute -top-4 left-0 font-mono text-[8px] tracking-[0.4em] uppercase text-muted-foreground">
          02. Where I&apos;ve Worked
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16 min-h-[400px]">
        {/* Tabs List */}
        <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible no-scrollbar md:w-48 shrink-0">
          {EXPERIENCES.map((exp, i) => (
            <button
              key={exp.company}
              onClick={() => setActiveTab(i)}
              className={`
                px-6 py-4 text-[10px] font-mono tracking-widest uppercase border-b-2 md:border-b-0 md:border-l-2 text-left transition-all duration-300 whitespace-nowrap cursor-pointer
                ${
                  activeTab === i
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                }
              `}
            >
              {exp.company}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-light tracking-tight">
                  <span className="text-foreground">{EXPERIENCES[activeTab].role}</span>
                  <span className="text-primary font-medium"> @ {EXPERIENCES[activeTab].company}</span>
                </h3>
                <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                  {EXPERIENCES[activeTab].period}
                </p>
              </div>

              <ul className="space-y-4">
                {EXPERIENCES[activeTab].description.map((item, i) => (
                  <li key={i} className="flex gap-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1.5 shrink-0">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
