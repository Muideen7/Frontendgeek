"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";

export default function LoadingScreen() {
  const { setLoaded } = useStore();
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Simulate a loading time for the entrance animation to finish
    const timer = setTimeout(() => {
      setLoaded(true);
      setTimeout(() => setShow(false), 800); // Buffer for final exit animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [setLoaded]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[999] bg-background flex flex-center justify-center items-center overflow-hidden"
        >
          <div className="relative flex items-center justify-center">
            {/* The "O" - Circular Outline */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 100 100"
              className="relative"
            >
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary/20"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, rotate: -90 }}
                animate={{ 
                  pathLength: 1, 
                  rotate: 270,
                  transition: { 
                    pathLength: { duration: 2, ease: "easeInOut" },
                    rotate: { duration: 2, ease: "easeInOut" }
                  }
                }}
                className="text-primary"
              />
            </motion.svg>

            {/* The "M" - Minimalist Monogram */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="font-sans font-black text-3xl tracking-tighter text-primary select-none">
                M
              </span>
            </motion.div>
          </div>

          
          {/* Background Reveal Stripes */}
          <motion.div 
            initial={{ scaleY: 0 }}
            exit={{ 
              scaleY: 1,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }}
            className="absolute inset-0 bg-primary/5 origin-top pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
