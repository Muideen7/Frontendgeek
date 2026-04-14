import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="w-full relative px-8 md:px-16 lg:px-24">
      <Hero />
      <About />
      <Experience />
      <Work />
      <Contact />
    </div>
  );
}
