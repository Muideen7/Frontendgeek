"use client";

import { forwardRef, HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
        className={cn(
          "relative rounded-3xl overflow-hidden transition-all duration-500",
          // SATIN GRADIENT: Mid-grey to deep charcoal (Professional & Readable)
          "bg-linear-to-b from-[#1c1c1c] via-[#141414] to-[#0a0a0a]",
          "backdrop-blur-xl border border-white/10",
          "w-full h-full flex flex-col",
          hover &&
            "hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]",
          className,
        )}
        {...props}
      >
        {/* SUBTLE INNER GLOW: Adds depth without being a "mesh" */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

        {/* REFINED GRAIN: Using an external SVG to fix your 404 error */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

        {/* CONTENT LAYER */}
        <div className="relative z-10 flex flex-col flex-1 p-6 overflow-hidden">
          {children}
        </div>
      </motion.div>
    );
  },
);

Card.displayName = "Card";
