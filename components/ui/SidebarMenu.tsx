'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Github, Linkedin, Mail, Twitter, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const NavLink = ({ 
  id, 
  label, 
  href,
  pathname,
  activeSection,
  setIsOpen
}: { 
  id: string, 
  label: string, 
  href?: string,
  pathname: string,
  activeSection: string,
  setIsOpen: (v: boolean) => void
}) => {
  const isActive = href ? pathname === href : activeSection === id && pathname === '/';
  
  return (
    <Link 
      href={href || `/#${id}`} 
      onClick={() => setIsOpen(false)}
      className={`hover:text-primary transition-all py-2 md:py-1 relative block group ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
    >
      {label}
      <motion.div 
        initial={false}
        animate={{ width: isActive ? '100%' : '0%' }}
        className="absolute bottom-0 md:-bottom-1 left-0 h-px bg-primary shadow-[0_0_8px_rgba(255,255,255,0.4)]"
      />
    </Link>
  );
};

export default function SidebarMenu() {
  const { activeSection, setActiveSection } = useStore();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    if (pathname !== '/') return;
    const sections = ['about', 'experience', 'work', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
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


  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full h-24 z-[60] flex justify-between items-center px-8 border-b border-border bg-background/80 backdrop-blur-md pointer-events-auto">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={48} />
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Desktop Sidebar & Mobile Menu Overlay */}
      <aside className={`fixed left-0 top-24 md:top-0 h-[calc(100vh-6rem)] md:h-full w-full md:w-32 z-40 md:z-50 flex flex-col justify-center md:justify-start items-center md:items-start p-6 md:py-20 md:px-8 border-r-0 md:border-r border-border pointer-events-auto md:pointer-events-none md:bg-transparent bg-background md:backdrop-blur-none transition-all duration-500 ease-in-out md:translate-y-0 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-[120%] md:translate-y-0 opacity-0 md:opacity-100'}`}>
         <div className="flex flex-col items-center md:items-start gap-12 md:gap-20 pointer-events-auto h-full justify-center md:justify-start w-full">
          {/* Logo - Desktop only here */}
          <div className="hidden md:block">
            <Logo size={48} />
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-10 md:gap-10 font-mono text-[16px] md:text-[9px] tracking-[0.4em] md:tracking-[0.4em] uppercase select-none items-center md:items-start text-center md:text-left">
             <NavLink id="about" label="01. About" href="/#about" pathname={pathname} activeSection={activeSection} setIsOpen={setIsOpen} />
             <NavLink id="experience" label="02. Experience" href="/#experience" pathname={pathname} activeSection={activeSection} setIsOpen={setIsOpen} />
             <NavLink id="work" label="03. Work" href="/#work" pathname={pathname} activeSection={activeSection} setIsOpen={setIsOpen} />
             <NavLink id="contact" label="04. Contact" href="/#contact" pathname={pathname} activeSection={activeSection} setIsOpen={setIsOpen} />
          </div>



          {/* Socials - Directly Under Nav on desktop, bottom on mobile */}
          <div className="flex flex-row md:flex-col gap-8 md:gap-8 opacity-100 mt-auto md:mt-0 mb-12 md:mb-0">
             <a href="https://linkedin.com/in/muideen7" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"><Linkedin size={24} strokeWidth={1.5} className="md:w-5 md:h-5 md:stroke-1" /></a>
             <a href="https://x.com/OlayeyeMuideen" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"><Twitter size={24} strokeWidth={1.5} className="md:w-5 md:h-5 md:stroke-1" /></a>
             <a href="https://github.com/muideen7" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"><Github size={24} strokeWidth={1.5} className="md:w-5 md:h-5 md:stroke-1" /></a>
             <button 
                onClick={() => {
                  navigator.clipboard.writeText('olayeyeayomide2@gmail.com');
                  alert('Email copied to clipboard!');
                }}
                className="hover:text-primary transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 cursor-pointer"
                title="Copy Email"
             >
                <Mail size={24} strokeWidth={1.5} className="md:w-5 md:h-5 md:stroke-1" />
             </button>
          </div>
       </div>

    </aside>
    </>
  );
}


