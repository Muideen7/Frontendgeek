"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Home, 
  User, 
  Briefcase, 
  Code2, 
  Mail, 
  Github, 
  Twitter, 
  Linkedin,
  Clock,
  MapPin
} from "lucide-react";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const [time, setTime] = React.useState(new Date());
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

const navItems = [
    { icon: <Home size={20} />, label: "Home", href: "/", color: "var(--color-accent-home)" },
    { icon: <User size={20} />, label: "About", href: "/about", color: "var(--color-accent-about)" },
    { icon: <Briefcase size={20} />, label: "Work", href: "/work", color: "var(--color-accent-work)" },
    { icon: <Code2 size={20} />, label: "Experiments", href: "/experiments", color: "var(--color-accent-experiments)" },
    { icon: <Mail size={20} />, label: "Contact", href: "/contact", color: "white" },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8 flex flex-col font-sans">
      {/* Window Frame */}
      <div className="flex-1 flex flex-col border border-white/5 rounded-xl overflow-hidden glass relative">
        
        {/* Top Bar */}
        <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 grayscale opacity-50">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
          </div>
          <div className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
            olamide <span className="text-white">{"<muideen />"}</span>
          </div>
          <div className="w-16" /> {/* Spacer for balance */}
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <aside className="w-16 border-r border-white/5 flex flex-col items-center py-6 gap-8 bg-white/[0.01]">
            {navItems.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                whileHover={{ scale: 1.1 }}
                className="text-muted-foreground hover:text-white transition-colors relative group"
                style={{ "--accent-color": item.color } as any}
              >
                {item.icon}
                <div className="absolute left-14 px-2 py-1 bg-white text-black text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
                {/* Glow pill on hover */}
                <div 
                  className="absolute inset-0 -z-10 blur-md opacity-0 group-hover:opacity-20 transition-opacity rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </motion.a>
            ))}
            
            <div className="mt-auto flex flex-col gap-6 pb-4">
              <a href="#" className="text-muted-foreground hover:text-white transition-colors"><Github size={18} /></a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors"><Twitter size={18} /></a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors"><Linkedin size={18} /></a>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto relative custom-scrollbar">
            {children}
          </main>
        </div>

        {/* Footer Status Bar */}
        <div className="h-10 border-t border-white/5 flex items-center justify-between px-4 text-[10px] font-mono text-muted-foreground bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 uppercase tracking-tighter">
              <span className="text-white/20">path:</span>
              <span className="text-white">~/portfolio/home</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <MapPin size={10} />
              <span className="uppercase tracking-tighter">Lagos, NG</span>
            </div>
            <div className="flex items-center gap-1.5 border-l border-white/10 pl-6">
              <Clock size={10} />
              <span className="uppercase tracking-tighter tabular-nums">
                {mounted ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "--:--:--"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
