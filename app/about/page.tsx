'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full relative px-8 md:px-16 lg:px-24 py-32 md:py-48 bg-background">
      
      {/* MOTIVATION & ABOUT SECTION */}
      <section id="about" className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center max-w-7xl mx-auto">
         <motion.div 
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="space-y-12"
         >
            <div className="space-y-6">
               <div className="w-full h-px bg-border relative">
                  <span className="absolute -top-4 left-0 font-mono text-[8px] tracking-[0.4em] uppercase text-muted-foreground">Philosophy</span>
               </div>
               <h3 className="text-4xl md:text-6xl font-light tracking-tighter uppercase leading-none">
                  Merging <br /> <span className="text-primary italic">Logic</span> with <br /> <span className="text-primary/70">Aesthetic</span>
               </h3>
            </div>

            <div className="max-w-xl text-md md:text-lg text-muted-foreground leading-relaxed space-y-8 font-light italic">
                 <p>
                    I am a results-driven Frontend Engineer bridging technical precision with creative expression. I specialize in building high-fidelity user experiences and digital storytelling using Next.js, Framer Motion, and GSAP.
                 </p>
                 <p>
                    I am dedicated to refining both technical execution and design sensitivity, constantly experimenting with innovative micro-interactions to create unique, impactful digital footprints.
                 </p>
            </div>
            
            <div className="pt-12 grid grid-cols-2 gap-12">
               <div className="space-y-2">
                  <div className="text-3xl font-light tracking-tighter">05+</div>
                  <div className="font-mono text-[8px] tracking-[0.4em] uppercase text-muted-foreground">Years Experience</div>
               </div>
               <div className="space-y-2">
                  <div className="text-3xl font-light tracking-tighter">20+</div>
                  <div className="font-mono text-[8px] tracking-[0.4em] uppercase text-muted-foreground">Technical Labs</div>
               </div>
            </div>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="relative aspect-[4/5] bg-foreground/5 rounded-sm overflow-hidden border border-foreground/10 group"
           data-cursor="pointer"
         >
            <img 
               src="https://github.com/muideen7.png" 
               alt="Olayeye Muideen" 
               className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
               <div className="p-8 border border-white/20 text-white font-mono text-[10px] tracking-[0.6em] uppercase">Visual Identity</div>
            </div>
         </motion.div>
      </section>

      {/* ADDITIONAL CONTENT: SKILLS SUMMARY */}
      <section className="mt-48 pt-32 border-t border-border">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
            <div className="space-y-6">
               <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-muted-foreground">Technical Stack</span>
               <h2 className="text-5xl font-light tracking-tighter uppercase">The Toolkit</h2>
            </div>
            <div className="text-lg text-muted-foreground font-light leading-relaxed">
               I leverage a modern technological ecosystem to build scalable, high-performance web applications. My workflow is anchored in type-safety (TypeScript), modular architectures (Next.js), and cinematic fluidity (Framer Motion).
            </div>
         </div>
      </section>

    </div>
  );
}
