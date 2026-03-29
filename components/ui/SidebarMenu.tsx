'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function SidebarMenu() {
  const { activeSection, setActiveSection } = useStore();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;
    const sections = ['home', 'work', 'about'];
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveSection, pathname]);

  const NavLink = ({ id, label, href }: { id: string, label: string, href?: string }) => {
    const isActive = href ? pathname === href : activeSection === id && pathname === '/';
    
    return (
      <Link 
        href={href || `/#${id}`} 
        className={`hover:text-primary transition-all py-1 relative block group ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
      >
        {label}
        <motion.div 
          initial={false}
          animate={{ width: isActive ? '100%' : '0%' }}
          className="absolute -bottom-1 left-0 h-px bg-primary shadow-[0_0_8px_rgba(255,255,255,0.4)]"
        />
      </Link>
    );
  };

  return (
    <aside className="fixed left-0 top-0 h-24 md:h-full w-full md:w-32 z-50 flex flex-row md:flex-col justify-between items-center md:items-start p-6 md:py-20 md:px-8 border-b md:border-b-0 md:border-r border-border pointer-events-none bg-background/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
       
       <div className="flex flex-row md:flex-col items-center md:items-start gap-8 md:gap-20 pointer-events-auto">
          {/* Nav Tabs */}
          <div className="flex flex-row md:flex-col gap-6 md:gap-10 font-mono text-[9px] tracking-[0.4em] uppercase select-none">
             <NavLink id="home" label="Home" href="/" />
             <NavLink id="work" label="Works" href="/works" />
             <NavLink id="philosophy" label="Philosophy" href="/philosophy" />

          </div>

          {/* Socials - Directly Under Nav */}
          <div className="flex flex-row md:flex-col gap-5 md:gap-8 opacity-100">
             <a href="https://linkedin.com/in/muideen7" target="_blank" className="hover:text-primary transition-all transform hover:scale-110"><Linkedin size={20} strokeWidth={1} /></a>
             <a href="https://x.com/OlayeyeMuideen" target="_blank" className="hover:text-primary transition-all transform hover:scale-110"><Twitter size={20} strokeWidth={1} /></a>
             <a href="https://github.com/muideen7" target="_blank" className="hover:text-primary transition-all transform hover:scale-110"><Github size={20} strokeWidth={1} /></a>
             <a href="mailto:olayeyeayomide2@gmail.com" className="hover:text-primary transition-all transform hover:scale-110"><Mail size={20} strokeWidth={1} /></a>
          </div>
       </div>

    </aside>
  );
}


