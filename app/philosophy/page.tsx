'use client';

import { motion } from 'framer-motion';

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen w-full relative px-8 md:px-16 lg:px-24 py-32 md:py-48 bg-background">
      
      {/* PHILOSOPHY SECTION */}
      <section id="philosophy" className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center max-w-7xl mx-auto">
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

            <div className="max-w-xl text-md md:text-lg text-foreground/80 leading-relaxed md:leading-loose space-y-8 font-normal">
                 <p>
                    I believe that code is an extension of design, not just a way to implement it. To me, building means finding the perfect balance between architectural integrity and visual storytelling. My workflow isn&apos;t just about matching a mockup; it&apos;s about anticipating the user&apos;s focus, using motion to guide attention, and ensuring that every interaction feels intentional.
                 </p>
                 <p>
                    I build with a focus on high-fidelity execution, type-safety, and cinematic fluidity—where every bracket and every semicolon serves the purpose of creating a memorable digital footprint.
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
           className="relative aspect-[4/5] bg-foreground/5 rounded-sm overflow-hidden border border-foreground/10 group shadow-2xl"
           data-cursor="pointer"
         >
            <img 
               src="https://github.com/muideen7.png" 
               alt="Olayeye Muideen" 
               className="w-full h-full object-cover transition-all duration-1000 grayscale-0 group-hover:grayscale group-hover:scale-105"
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
