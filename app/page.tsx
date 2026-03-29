export default function Home() {
  return (
    <div className="w-full relative px-8 md:px-16 lg:px-24">
      {/* 1. HERO & ABOUT ME (Kentokawazoe Layout) */}
      <section
        id="home"
        className="min-h-screen py-32 md:py-48 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 relative"
      >
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-0">
            <h1 className="text-[12vw] md:text-[8vw] font-light leading-[0.9] tracking-tighter uppercase select-none cursor-default text-primary">
              OLAYEYE <br /> MUIDEEN
            </h1>
            <p className="font-mono text-[9px] md:text-[10px] tracking-[0.6em] uppercase text-muted-foreground mt-6 block">
              Fullstack developer / UX architect
            </p>
          </div>

          <div className="pt-24 space-y-4">
            <p className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
              For business inquiries
            </p>
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
          <div className="space-y-6" id="about">
            <div className="w-full h-px bg-border relative">
              <span className="absolute -top-4 left-0 font-mono text-[8px] tracking-[0.4em] uppercase text-muted-foreground">
                About Me
              </span>
            </div>

            <div className="max-w-xl text-md md:text-lg text-foreground/80 leading-relaxed md:leading-loose space-y-8 font-normal">
              <p>
                I&apos;m a Fullstack Developer and UX Architect with a focus on building
                high-fidelity digital experiences. I specialize in bridging the gap
                between technical precision and creative expression to build products
                that are as functional as they are memorable.
              </p>
              <p>
                My work is anchored in a deep appreciation for motion, performance,
                and pixel-perfect execution. I enjoy solving complex problems and
                crafting interaction-heavy interfaces that feel fluid and alive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SKILLS SECTION (Kentokawazoe Layout) */}

      <section className="py-32 md:py-48">
        <div className="w-full h-px bg-border relative mb-24">
          <span className="absolute -top-4 left-0 font-mono text-[8px] tracking-[0.4em] uppercase text-muted-foreground">
            Mastery
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
          <SkillCategory
            title="Frontend"
            skills={[
              "React / Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
              "GSAP"
            ]}
          />
          <SkillCategory
            title="Backend"
            skills={[
              "Node.js", 
              "Express", 
              "Prisma", 
              "Python", 
              "PostgreSQL"
            ]}
          />
          <SkillCategory
            title="Tools & Environment"
            skills={[
              "Git / GitHub",
              "Bash / Shell",
              "Vercel",
              "Figma",
              "VS Code"
            ]}
          />
        </div>
      </section>
    </div>
  );
}

function SkillCategory({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="space-y-8 group transition-all duration-700">
      <h4 className="text-xl md:text-2xl font-light uppercase tracking-tighter border-b border-border pb-4 inline-block">
        {title}
      </h4>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
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
