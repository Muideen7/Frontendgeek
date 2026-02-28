"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectSection } from "@/components/sections/project-section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Twitter, ChevronRight, Terminal as TerminalIcon, Code2, User, Briefcase, FolderGit2 } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURED_PROJECTS = [
  {
    id: "nike-t3",
    title: "Nike E-Commerce",
    tags: ["Next.js", "T3 Stack", "TypeScript", "Tailwind"],
    situation: "Need for a high-performance, modern e-commerce interface to showcase premium products.",
    task: "Develop a full-stack e-commerce experience with seamless navigation and responsive design.",
    action: "Architected the frontend using the T3 stack (Next.js, Prisma, Tailwind) and optimized for rapid page loads.",
    result: "Achieved sub-1s page transitions and a 95+ Lighthouse score for performance and SEO.",
    repoUrl: "https://github.com/muideen7/Nike",
    liveUrl: "#"
  },
  {
    id: "dojo-blog",
    title: "Dojo Blogging Platform",
    tags: ["React", "Firebase", "Real-time"],
    situation: "Complexity in managing state and real-time data sync for a multi-user blog.",
    task: "Build a persistent, real-time blogging environment with secure authentication.",
    action: "Integrated Firebase Firestore for real-time updates and utilized React hooks for efficient state management.",
    result: "Reduced data latency by 40% and simplified the publication workflow for contributors.",
    repoUrl: "https://github.com/muideen7/dojo-blog",
    liveUrl: "#"
  },
  {
    id: "stock-tracker",
    title: "Stockify Tracker",
    tags: ["TypeScript", "API", "Data Vis"],
    situation: "Market volatility requires real-time monitoring and clear data visualization for traders.",
    task: "Create a dynamic dashboard to track and visualize stock market trends efficiently.",
    action: "Implemented real-time API polling and used specialized charting libraries for high-fidelity visualization.",
    result: "Enabled traders to respond to market changes 30% faster through intuitive visual cues.",
    repoUrl: "https://github.com/Muideen7/Stock-tracker-app",
    liveUrl: "#"
  }
];

const ARTICLES = [
  {
    title: "15 Must-Have VSCode Extensions for Web Development 💻💡",
    url: "https://medium.com/@Frontendgeek/15-must-have-vscode-extensions-for-web-development-9feb43978b1d",
    platform: "Medium"
  },
  {
    title: "From Beginner to Web Developer: A Practical Guide",
    url: "https://medium.com/@Frontendgeek/from-beginner-to-web-developer-a-practical-guide-to-building-your-career-in-web-development-fb3cf90505bc",
    platform: "Medium"
  },
  {
    title: "Transitioning from CRA to Vite: The Ultimate Guide",
    url: "https://medium.com/@Frontendgeek/enhancing-react-development-the-ultimate-guide-to-transitioning-from-create-react-app-to-vite-573013b5a885",
    platform: "Medium"
  }
];

const TECH_STACK = [
  "TypeScript", "Next.js", "React", "Node.js", "Go", "Python", 
  "TailwindCSS", "PostgreSQL", "MongoDB", "Docker", "Shell", "Figma"
];

const SECTIONS = ["about", "experience", "projects", "skills", "articles"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -65% 0px", // Focus on the middle-upper part of the screen
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        sectionRefs.current[id] = el;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 180; // Precise alignment with nav links
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto p-4 md:p-8 gap-8 lg:gap-12 relative overflow-x-hidden">
      
      {/* LEFT COLUMN: Sticky Header & Navigation */}
      <header className="md:w-1/3 lg:w-1/4 md:sticky md:top-8 md:h-[calc(100vh-64px)] flex flex-col justify-between py-4">
        <div>
          <div className="flex items-center gap-2 text-primary mb-4">
            <TerminalIcon size={20} />
            <span className="font-bold tracking-tighter text-lg uppercase">User@Muideen</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
            Olamide Muideen
          </h1>
          <h2 className="text-xl text-foreground font-semibold mb-4 text-accent/90">
            Software Engineer
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-8">
            Specializing in high-performance web systems, systems engineering, and user-centric architecture.
          </p>

          <nav className="flex flex-col gap-4">
            <NavItem 
              icon={<User size={16} />} 
              label="01. About" 
              href="#about" 
              isActive={activeSection === "about"}
              onClick={(e) => scrollToSection(e, "about")}
            />
            <NavItem 
              icon={<Briefcase size={16} />} 
              label="02. Experience" 
              href="#experience" 
              isActive={activeSection === "experience"}
              onClick={(e) => scrollToSection(e, "experience")}
            />
            <NavItem 
              icon={<FolderGit2 size={16} />} 
              label="03. Projects" 
              href="#projects" 
              isActive={activeSection === "projects"}
              onClick={(e) => scrollToSection(e, "projects")}
            />
             <NavItem 
              icon={<Code2 size={16} />} 
              label="04. Skills" 
              href="#skills" 
              isActive={activeSection === "skills"}
              onClick={(e) => scrollToSection(e, "skills")}
            />
          </nav>
        </div>

        <div className="flex gap-4 mt-8 md:mt-0">
          <SocialIcon icon={<Github size={20} />} href="https://github.com/Muideen7" />
          <SocialIcon icon={<Linkedin size={20} />} href="https://linkedin.com/in/Muideen7" />
          <SocialIcon icon={<Twitter size={20} />} href="https://twitter.com/OlayeyeMuideen" />
          <SocialIcon icon={<Mail size={20} />} href="mailto:olayeyeayomide2000@gmail.com" />
        </div>
      </header>

      {/* RIGHT COLUMN: Scrolling Content */}
      <div className="flex-1 flex flex-col gap-32 py-4 md:py-8 lg:pl-12 border-l border-border/50">
        
        {/* SECTION: ABOUT */}
        <SectionWrapper id="about">
          <div className="flex items-center gap-4 mb-8">
            <Badge variant="outline" className="border-primary/50 text-primary font-mono lowercase">whoami</Badge>
            <Separator className="flex-1 opacity-20" />
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-sm lg:text-base">
            <p>
              I am a software engineer focused on building robust, scalable applications. My approach combines systems thinking with a deep appreciation for terminal-centric workflows and automation.
            </p>
            <p>
              My technical foundation was built through rigorous programs at <span className="text-white">ALX Software Engineering</span> and <span className="text-white">Andela</span>, where I mastered both low-level systems and high-level web architectures.
            </p>
            <p>
              I am also the founder of <span className="text-white">TechLync</span>, an initiative dedicated to helping self-taught learners navigate the complexities of the tech industry through education and community support.
            </p>
          </div>
        </SectionWrapper>

        {/* SECTION: EXPERIENCE */}
        <SectionWrapper id="experience">
          <div className="flex items-center gap-4 mb-8">
            <Badge variant="outline" className="border-accent/50 text-accent font-mono lowercase">history --all</Badge>
            <Separator className="flex-1 opacity-20" />
          </div>
          <div className="space-y-12">
            <ExperienceItem 
              company="Andela"
              role="React Developer Program"
              period="2023"
              description="Developed advanced frontend applications using React and integrated modern professional workflows and testing strategies."
            />
            <ExperienceItem 
              company="Holberton School / ALX"
              role="Software Engineering Fellow"
              period="2023 — 2024"
              description="Mastered C, Python, and systems engineering. Built complex full-stack projects and participated in rigorous peer-learning environments."
            />
            <ExperienceItem 
              company="Devcareer"
              role="Product Design Intern"
              period="2022"
              description="Honed user experience and interface design skills, bridging the gap between creative vision and technical implementation."
            />
          </div>
        </SectionWrapper>

        {/* SECTION: PROJECTS */}
        <SectionWrapper id="projects">
          <div className="flex items-center gap-4 mb-8">
            <Badge variant="outline" className="border-primary/50 text-primary font-mono lowercase">git log --featured</Badge>
            <Separator className="flex-1 opacity-20" />
          </div>
          
          <div className="flex flex-col gap-20">
            {FEATURED_PROJECTS.map((project) => (
              <ProjectSection key={project.id} project={project} />
            ))}
          </div>
        </SectionWrapper>

        {/* SECTION: SKILLS */}
        <SectionWrapper id="skills">
          <div className="flex items-center gap-4 mb-8">
            <Badge variant="outline" className="border-accent/50 text-accent font-mono lowercase">system --info</Badge>
            <Separator className="flex-1 opacity-20" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {TECH_STACK.map((skill) => (
              <div key={skill} className="flex items-center gap-2 p-3 border border-border/50 hover:bg-muted/30 transition-colors rounded-sm group">
                <ChevronRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground group-hover:text-white">{skill}</span>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* SECTION: ARTICLES */}
        <SectionWrapper id="articles">
          <div className="flex items-center gap-4 mb-8">
            <Badge variant="outline" className="border-primary/50 text-primary font-mono lowercase">cat articles.txt</Badge>
            <Separator className="flex-1 opacity-20" />
          </div>
          <div className="flex flex-col gap-6">
            {ARTICLES.map((article) => (
              <a 
                key={article.title} 
                href={article.url} 
                target="_blank" 
                className="group flex flex-col gap-1 p-4 border border-border/30 hover:border-primary/50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{article.title}</h4>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">{article.platform}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-tighter">Read on {article.platform} →</p>
              </a>
            ))}
          </div>
        </SectionWrapper>

        {/* Footer */}
        <footer className="pt-24 pb-12 text-center opacity-50">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Built with Next.js 16 + shadcn/ui + Tailwind 4
          </p>
        </footer>
      </div>
    </main>
  );
}

function SectionWrapper({ children, id }: { children: React.ReactNode, id: string }) {
  const [showFlash, setShowFlash] = useState(false);

  return (
    <motion.section 
      id={id} 
      className="scroll-mt-32 relative"
      onViewportEnter={() => setShowFlash(true)}
      onViewportLeave={() => setShowFlash(false)}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {showFlash && <div className="terminal-flash-overlay absolute inset-0 z-10" />}
      <motion.div 
        className="relative terminal-text-entry"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

function NavItem({ icon, label, href, isActive, onClick }: { icon: React.ReactNode, label: string, href: string, isActive?: boolean, onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className={cn(
        "group flex items-center gap-4 transition-all py-2",
        isActive ? "text-primary translate-x-2" : "text-muted-foreground hover:text-primary"
      )}
    >
      <span className={cn(
        "transition-all text-primary",
        isActive ? "opacity-100 scale-150 -ml-4" : "opacity-0 -ml-6 scale-100 group-hover:opacity-100 group-hover:scale-125"
      )}>
        <ChevronRight size={14} />
      </span>
      <span className={cn(
        "text-sm font-mono tracking-widest uppercase flex items-center gap-3 transition-colors",
        isActive ? "text-white font-bold" : ""
      )}>
        {icon}
        {label}
      </span>
    </a>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a href={href} target="_blank" className="text-muted-foreground hover:text-white transition-colors p-2 -ml-2 rounded-md hover:bg-muted/50">
      {icon}
    </a>
  );
}

function ExperienceItem({ company, role, period, description }: { company: string, role: string, period: string, description: string }) {
  return (
    <div className="group relative pl-4 border-l border-border hover:border-primary transition-colors">
      <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors" />
      <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">{period}</span>
      <h3 className="text-lg font-bold text-white mt-1">{role} · {company}</h3>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
