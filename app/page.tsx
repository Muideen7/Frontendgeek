export default function Home() {
  return (
    <div className="w-full relative px-8 md:px-16 lg:px-24">
      
      {/* 1. HERO & ABOUT ME (Kentokawazoe Layout) */}
      <section id="home" className="min-h-screen py-32 md:py-48 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 relative">
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-0">
             <h1 className="text-[12vw] md:text-[8vw] font-light leading-[0.9] tracking-tighter uppercase select-none cursor-default text-primary">
                OLAYEYE <br /> MUIDEEN
             </h1>
             <p className="font-mono text-[9px] md:text-[10px] tracking-[0.6em] uppercase text-muted-foreground mt-6 block">
                Frontend Engineer / UX Architect
             </p>
          </div>
          
          <div className="pt-24 space-y-4">
            <p className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">For business inquiries</p>
            <a 
              href="mailto:olayeyeayomide2@gmail.com" 
              className="text-lg md:text-xl font-light hover:text-primary underline underline-offset-8 transition-all"
              data-cursor="pointer"
            >
              olayeyeayomide2@gmail.com
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-12">
           <div className="space-y-6">
              <div className="w-full h-px bg-border relative">
                 <span className="absolute -top-4 left-0 font-mono text-[8px] tracking-[0.4em] uppercase text-muted-foreground">About Me</span>
              </div>

              <div className="max-w-xl text-md md:text-lg text-muted-foreground leading-relaxed space-y-8 font-light italic">
                 <p>
                    I am a results-driven Frontend Engineer bridging technical precision with creative expression. I specialize in building high-fidelity user experiences and digital storytelling using Next.js, Framer Motion, and GSAP.
                 </p>
                 <p>
                    I am dedicated to refining both technical execution and design sensitivity, constantly experimenting with innovative micro-interactions to create unique, impactful digital footprints.
                 </p>
              </div>

           </div>
        </div>
      </section>

      {/* 3. SKILLS SECTION (Kentokawazoe Layout) */}

      <section className="py-32 md:py-48">
         <div className="w-full h-px bg-border relative mb-24">
            <span className="absolute -top-4 left-0 font-mono text-[8px] tracking-[0.4em] uppercase text-muted-foreground">Mastery</span>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
             <SkillCategory title="Frontend" skills={['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP']} />
             <SkillCategory title="Backend" skills={['Node.js', 'Express', 'Prisma', 'MongoDB', 'PostgreSQL']} />
             <SkillCategory title="Tools" skills={['VS Code', 'Git / GitHub', 'Figma', 'Vercel', 'Linux Shell']} />
         </div>
      </section>

    </div>
  );
}

function SkillCategory({ title, skills }: { title: string, skills: string[] }) {
  return (
    <div className="space-y-8 group transition-all duration-700">
       <h4 className="text-xl md:text-2xl font-light uppercase tracking-tighter border-b border-border pb-4 inline-block">{title}</h4>
       <div className="flex flex-wrap gap-3">
          {skills.map(skill => (
            <span 
               key={skill} 
               className="px-4 py-2 border border-border rounded-full text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground hover:border-foreground/20 hover:bg-foreground/5 transition-all cursor-default"
            >
               {skill}
            </span>
          ))}
       </div>
    </div>
  );
}
