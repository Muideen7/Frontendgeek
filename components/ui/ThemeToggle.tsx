'use client';

import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useStore();

  return (
    <div 
      onClick={toggleTheme}
      className="w-14 h-7 rounded-full border-2 border-foreground/40 p-1 flex items-center bg-foreground/5 cursor-pointer relative group transition-colors duration-500 overflow-hidden"
    >

      {/* Animated Background Slide */}
      <motion.div 
        animate={{ x: theme === 'dark' ? '0%' : '100%' }}
        className="absolute inset-0 bg-primary/10 -translate-x-full transition-transform"
      />
      
      {/* The Knob */}
      <motion.div 
        initial={false}
        animate={{ 
          x: theme === 'dark' ? 0 : 28,
          backgroundColor: theme === 'dark' ? '#F3F4F4' : '#2C2C2C'
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="w-5 h-5 rounded-full z-10 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
      />
    </div>
  );
}
