'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

export default function UniqueCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Smooth springs for the cursor components
  const springConfig = { damping: 25, stiffness: 450 };
  const quickSpringConfig = { damping: 20, stiffness: 800 };

  const dotX = useSpring(mouseX, quickSpringConfig);
  const dotY = useSpring(mouseY, quickSpringConfig);
  
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if the device is a desktop with a fine pointer
    if (typeof window !== 'undefined') {
      setIsDesktop(window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)').matches);
    }

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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [isVisible, mouseX, mouseY]);

  if (typeof window === 'undefined' || !isDesktop) return null;

  return (
    <AnimatePresence>
      {isVisible && isDesktop && (
        <div className="fixed inset-0 z-[10000] pointer-events-none mix-blend-difference">
          {/* Main Ring - Grows on hover, shrinks on click */}
          <motion.div
            className="absolute top-0 left-0 rounded-full border border-primary/40 bg-white/5"
            style={{
              x: ringX,
              y: ringY,
              translateX: '-50%',
              translateY: '-50%',
              width: isHovered ? 80 : 40,
              height: isHovered ? 80 : 40,
            }}
            transition={{
                width: { type: 'spring', damping: 20, stiffness: 200 },
                height: { type: 'spring', damping: 20, stiffness: 200 }
            }}
          />

          {/* Inner Dot - High precision pointer */}
          <motion.div
            className="absolute top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{
              x: dotX,
              y: dotY,
              translateX: '-50%',
              translateY: '-50%',
              scale: isClicking ? 0.5 : (isHovered ? 2.5 : 1),
            }}
          />

          {/* Velocity Line (Minimalist trail focus) */}
          <motion.div
            className="absolute top-0 left-0 w-px h-8 bg-gradient-to-t from-primary/30 to-transparent origin-bottom"
            style={{
              x: ringX,
              y: ringY,
              translateX: '-50%',
              translateY: '-50%',
              opacity: isHovered ? 0 : 0.4,
              scaleY: isClicking ? 0 : 1,
            }}
          />
          
          {/* Hover Label Hint (Optional, very subtle) */}
          {isHovered && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               className="absolute top-0 left-0"
               style={{
                 x: ringX,
                 y: ringY,
                 translateX: '40px',
                 translateY: '-40px',
               }}
             >
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/40 whitespace-nowrap">View</span>
             </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
