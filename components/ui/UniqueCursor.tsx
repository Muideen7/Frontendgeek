'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

export default function UniqueCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia?.('(min-width: 768px) and (hover: hover) and (pointer: fine)')?.matches ?? true;
    }
    return true;
  });

  // Smooth springs for the cursor components
  const springConfig = { damping: 25, stiffness: 450 };
  const quickSpringConfig = { damping: 20, stiffness: 800 };

  const dotX = useSpring(mouseX, quickSpringConfig);
  const dotY = useSpring(mouseY, quickSpringConfig);
  
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mql = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)');
      const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
      mql.addEventListener('change', handler);
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!isVisible) setIsVisible(true);
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };

      const handleMouseDown = () => setIsClicking(true);
      const handleMouseUp = () => setIsClicking(false);

      const handleMouseEnter = () => {
        const interactables = document.querySelectorAll('a, button, [data-cursor="pointer"], .project-card');
        interactables.forEach(el => {
          el.addEventListener('mouseenter', () => setIsHovered(true));
          el.addEventListener('mouseleave', () => setIsHovered(false));
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      
      // Initial scan and continuous observer for dynamic elements
      handleMouseEnter();
      const observer = new MutationObserver(handleMouseEnter);
      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        mql.removeEventListener('change', handler);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        observer.disconnect();
      };
    }
  }, [isVisible, mouseX, mouseY]);

  if (typeof window === 'undefined' || !isDesktop) return null;

  return (
    <AnimatePresence>
      {isVisible && isDesktop && (
        <div className="fixed inset-0 z-[10000] pointer-events-none">
          {/* Selective Lens - only visible on hover */}
          <motion.div
            className="absolute top-0 left-0 w-16 h-16 rounded-full border border-primary/40 bg-primary/5 backdrop-blur-[1px]"
            style={{
              x: ringX,
              y: ringY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isHovered ? 1.5 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
