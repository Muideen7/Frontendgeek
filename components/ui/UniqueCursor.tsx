'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';

const NAME = "MUIDEEN";

interface Letter {
  id: number;
  char: string;
  x: number;
  y: number;
}

export default function UniqueCursor() {
  const { theme } = useStore();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [letters, setLetters] = useState<Letter[]>([]);
  const letterIndex = useRef(0);
  const lastSpawnPos = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Track number of fingers currently on the trackpad
  const activeTouches = useRef(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Theme-aware colors — no mix-blend-difference needed
  const isDark = theme === 'dark';
  const dotColor = isDark ? '#FFFFFF' : '#000000';
  const ringColor = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)';
  const letterColor = isDark ? '#FFFFFF' : '#1a1a1a';

  const spawnLetter = (x: number, y: number) => {
    const char = NAME[letterIndex.current];
    const id = Date.now() + Math.random();
    setLetters(prev => [...prev.slice(-15), { id, char, x, y }]);
    letterIndex.current = (letterIndex.current + 1) % NAME.length;
    lastSpawnPos.current = { x, y };
  };

  useEffect(() => {
    // ── Touch tracking for multi-finger detection ──
    const handleTouchStart = (e: TouchEvent) => {
      activeTouches.current = e.touches.length;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      activeTouches.current = e.touches.length;
    };
    const handleTouchCancel = () => {
      activeTouches.current = 0;
    };

    // ── Mouse movement → letter trail ──
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const dist = Math.hypot(
        e.clientX - lastSpawnPos.current.x,
        e.clientY - lastSpawnPos.current.y
      );
      if (dist > 100) {
        spawnLetter(e.clientX, e.clientY);
      }
    };

    // ── Wheel → letter trail (single-finger trackpad only) ──
    // Blocked by:
    //   • ctrlKey          → macOS pinch-to-zoom (2+ fingers)
    //   • activeTouches ≥ 2 → physical 2-finger scroll gesture
    //   • deltaMode !== 0   → hardware mouse wheel (line/page mode)
    //   • |deltaY| > 40     → fast mouse wheel spin
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      if (activeTouches.current >= 2) return;
      if (e.deltaMode !== 0) return;
      if (Math.abs(e.deltaY) > 40) return;
      spawnLetter(mouseX.get(), mouseY.get());
    };

    const handleHover = () => setIsHovered(true);
    const handleUnhover = () => setIsHovered(false);

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchCancel, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleWheel, { passive: true });

    const interactables = document.querySelectorAll('a, button, [data-cursor="pointer"]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleUnhover);
    });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchCancel);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, []);

  return (
    <>
      {/* Primary Dot — theme-aware, no blend mode */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full z-[10000] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovered ? 4 : 1,
          backgroundColor: dotColor,
          // Soft invert blend only in dark mode for the glowing effect
          mixBlendMode: isDark ? 'difference' : 'normal',
        }}
        transition={{ scale: { type: 'spring', damping: 20, stiffness: 300 } }}
      />

      {/* Letter Trail — theme-aware colors */}
      <AnimatePresence>
        {letters.map((letter) => (
          <motion.div
            key={letter.id}
            initial={{ opacity: 0.9, scale: 0.8, y: 0, rotate: -10 }}
            animate={{ opacity: 0, scale: 2.2, y: -140, rotate: 10 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 pointer-events-none z-[9999] font-mono text-6xl md:text-8xl font-black uppercase tracking-tighter select-none"
            style={{
              left: letter.x,
              top: letter.y,
              translateX: '-50%',
              translateY: '-50%',
              color: letterColor,
              // In dark: invert blend creates a striking glowing effect
              // In light: normal rendering as dark ink
              mixBlendMode: isDark ? 'difference' : 'multiply',
            }}
          >
            {letter.char}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Outer Ring — theme-aware */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full z-[9998] pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovered ? 0 : 1,
          border: `1px solid ${ringColor}`,
        }}
        transition={{ type: 'spring', damping: 15, stiffness: 250 }}
      />
    </>
  );
}
