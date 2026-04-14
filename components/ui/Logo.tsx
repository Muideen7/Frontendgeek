"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Logo({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* The "O" - Circular Outline */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="relative"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary/20"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, rotate: -90 }}
          animate={{
            pathLength: 1,
            rotate: 270,
            transition: {
              pathLength: { duration: 1.5, ease: "easeInOut" },
              rotate: { duration: 1.5, ease: "easeInOut" },
            },
          }}
          className="text-primary"
        />
      </svg>

      {/* The "O.M" - Initials */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-sans font-black tracking-tighter text-primary select-none"
          style={{ fontSize: size * 0.35 }}
        >
          OM
        </span>
      </div>
    </div>
  );
}
