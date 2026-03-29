import type { Metadata } from "next";
import { Syne, Geist_Mono } from "next/font/google";
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import SidebarMenu from "@/components/ui/SidebarMenu";
import SmoothScroll from "@/components/ui/SmoothScroll";
import UniqueCursor from "@/components/ui/UniqueCursor";
import ThemeWrapper from "@/components/ui/ThemeWrapper";
import ThemeToggle from "@/components/ui/ThemeToggle";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Olayeye Muideen (FrontendGeek)",

  description: "Results-driven Frontend Engineer bridging technical precision with creative expression through high-fidelity digital storytelling.",
  icons: {
    icon: '/icon.png',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth cursor-none">
      <head />
      <body
        className={`${syne.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground selection:bg-primary selection:text-background overflow-x-hidden`}
      >
        <ThemeWrapper>
          <div className="grain-overlay" />
          <UniqueCursor />
          
          <SmoothScroll>
            <SidebarMenu />
            {/* Theme Toggle (Functional) */}
            <header className="fixed top-0 right-0 w-full z-40 px-8 py-8 md:px-16 md:py-12 flex justify-end items-center pointer-events-none">
               <div className="pointer-events-auto">
                  <ThemeToggle />
               </div>
            </header>
            
          <main className="relative z-10 w-full min-h-screen pt-24 md:pt-0 pl-0 md:pl-32">
            {children}
          </main>


            <footer className="relative z-20 px-8 py-24 md:px-16 md:py-32 border-t border-border bg-background ml-24 md:ml-32 overflow-hidden">
               <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/4 select-none pointer-events-none opacity-[0.03]">
                  <span className="text-[20vw] font-black uppercase whitespace-nowrap leading-none block">MUIDEEN</span>
               </div>

               <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 relative z-10">
                  <div className="space-y-6">
                     <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground">Next Move</p>
                     <p className="text-4xl md:text-5xl lg:text-6xl font-black max-w-xl tracking-tighter leading-[0.9] uppercase">
                        READY TO SCALE <br /> & ESTABLISH.
                     </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-8 md:gap-12 font-mono text-[9px] tracking-widest uppercase items-center">
                     <a href="https://github.com/muideen7" target="_blank" className="flex items-center gap-2 group hover:text-primary transition-colors text-muted-foreground">
                        <Github size={14} strokeWidth={1} /> GitHub
                     </a>
                     <a href="https://x.com/OlayeyeMuideen" target="_blank" className="flex items-center gap-2 group hover:text-primary transition-colors text-muted-foreground">
                        <Twitter size={14} strokeWidth={1} /> Twitter
                     </a>
                     <a href="mailto:olayeyeayomide2@gmail.com" className="flex items-center gap-3 py-3 px-8 border border-border rounded-full hover:bg-primary hover:text-background transition-all duration-700 group">
                        CONTACT <ArrowUpRight size={14} strokeWidth={1} />
                     </a>
                  </div>
               </div>
               <p className="mt-40 font-mono text-[8px] tracking-[0.6em] opacity-10 uppercase select-none text-center">© 2026 O.M. — CRAFTED WITH ARCHITECTURAL PRECISION</p>
            </footer>
          </SmoothScroll>
        </ThemeWrapper>
      </body>
    </html>
  );
}
