"use client";

import React from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

export default function PageReveal({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      animate={{ 
        opacity: isLoaded ? 1 : 0,
        scale: isLoaded ? 1 : 0.98,
        filter: isLoaded ? "blur(0px)" : "blur(10px)",
        transition: { 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1],
          delay: 0.2 // Small offset from preloader exit
        }
      }}
    >
      {children}
    </motion.div>
  );
}
