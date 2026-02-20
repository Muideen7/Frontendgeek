"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  id?: string;
  className?: string;
  front: ReactNode;
  back: ReactNode;
  expandOnFlip?: boolean;
  trigger?: "click" | "hover";
  onFlip?: () => void;
}

export function FlipCard({
  id,
  className,
  front,
  back,
  expandOnFlip = false,
  trigger = "click",
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleInteraction = () => {
    if (trigger === "click") {
      setIsFlipped(!isFlipped);
    }
  };

  const handleHover = () => {
    if (trigger === "hover") {
      setIsFlipped(true);
    }
  };

  const handleLeave = () => {
    if (trigger === "hover") {
      setIsFlipped(false);
    }
  };

  return (
    <motion.div
      id={id}
      className={cn("relative preserve-3d cursor-pointer", className)}
      onClick={handleInteraction}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      animate={{
        scale: isFlipped && expandOnFlip ? 1.05 : 1,
        zIndex: isFlipped ? 50 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.3 }}
            className="backface-hidden"
          >
            {front}
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 0 }}
            transition={{ duration: 0.3 }}
            className="backface-hidden"
          >
            {back}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </motion.div>
  );
}
