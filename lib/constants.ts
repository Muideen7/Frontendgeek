const OG_BASE = '/api/og';

function ogUrl(name: string, description: string, tags: string[]): string {
  const params = new URLSearchParams({
    name,
    description,
    tags: tags.join(','),
  });
  return `${OG_BASE}?${params.toString()}`;
}

export const FEATURED_PROJECTS = [
  {
    id: 'devmentor',
    name: 'DevMentor',
    description: 'AI-powered mentorship for self-taught developers. Personalized roadmaps, code review, daily check-ins, and a mentor that remembers your entire journey.',
    url: 'https://dev-mentor-nu.vercel.app/',
    tags: ['React', 'TypeScript', 'Mentorship', 'Tailwind'],
    year: '2026',
    role: 'Product Design / Dev',
    get image() {
      return ogUrl(this.name, this.description, this.tags);
    },
    remoteImage: 'https://dev-mentor-nu.vercel.app/opengraph-image.png',
  },
  {
    id: 'lexiclear',
    name: 'LexiClear',
    description: 'LexiClear AI | An enterprise-grade AI contract intelligence platform. Featuring real-time neural risk detection and "Plain English" translation, LexiClear bridges the gap between complex legalese.',
    url: 'https://lexi-clear-legal.vercel.app/',
    tags: ['Prisma', 'Next.js', 'Legal Tech', 'AI'],
    year: '2026',
    role: 'Full Stack / UX',
    get image() {
      return ogUrl(this.name, this.description, this.tags);
    },
    remoteImage: 'https://lexi-clear-legal.vercel.app/opengraph-image.png',
  },
  {
    id: 'crdev',
    name: 'CRDev Hub',
    description: 'A creative developer repository and technical showcase platform for high-end digital footprints and modern UI.',
    url: 'https://crdev.vercel.app/',
    tags: ['Next.js', 'Framer Motion', 'Showcase', 'UI/UX'],
    year: '2026',
    role: 'Design System / Dev',
    get image() {
      return ogUrl(this.name, this.description, this.tags);
    },
    remoteImage: 'https://crdev.vercel.app/opengraph-image.png',
  },
  {
    id: 'mindflow',
    name: 'MindFlow',
    description: 'A production-ready SaaS platform for team collaboration and productivity. Built with modern technologies and best practices.',
    url: 'https://mlndflow.vercel.app/',
    tags: ['Next.js 15', 'Framer Motion', 'Zustand'],
    year: '2026',
    role: 'Frontend / UI Design',
    get image() {
      return ogUrl(this.name, this.description, this.tags);
    },
    remoteImage: 'https://mlndflow.vercel.app/opengraph-image.png',
  },
  {
    id: 'nova',
    name: 'Nova Industrial',
    description: 'A futuristic gaming e-commerce experience with cyber-industrial aesthetics and cinematic storytelling.',
    url: 'https://nova-chi-black.vercel.app/',
    tags: ['Tailwind v4', 'GSAP', 'E-commerce'],
    year: '2026',
    role: 'Frontend / Motion Design',
    get image() {
      return ogUrl(this.name, this.description, this.tags);
    },
    remoteImage: 'https://nova-chi-black.vercel.app/opengraph-image.png',
  },
  {
    id: 'petpeeps',
    name: 'PetPeeps',
    description: 'PetPeeps is a high-fidelity, modern landing page for a premier pet care platform. Designed with a focus on vibrant aesthetics, smooth interactions, and a professional-grade user experience, it serves as the digital storefront for a service that treats pets like family.',
    url: 'https://pet-peeps.vercel.app/',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'UI/UX'],
    year: '2026',
    role: 'Frontend / UI Design',
    get image() {
      return ogUrl(this.name, this.description, this.tags);
    },
    remoteImage: 'https://pet-peeps.vercel.app/opengraph-image.png',
  },
  {
    id: 'sagestream',
    name: 'SageStream',
    description: 'SageStream is a high-performance streaming platform dedicated to Anime and Donghua enthusiasts. It features a cinematic user interface, lightning-fast content delivery, and personalized discovery algorithms, providing a seamless viewing experience for global animation fans.',
    url: 'https://sage-stream-peach.vercel.app/',
    tags: ['Next.js', 'Tailwind CSS', 'Streaming', 'UI/UX'],
    year: '2026',
    role: 'Frontend / UX Design',
    get image() {
      return ogUrl(this.name, this.description, this.tags);
    },
    remoteImage: 'https://sage-stream-peach.vercel.app/opengraph-image.png',
  },
  {
    id: 'eteck',
    name: 'Eteck',
    description: 'A premium gadget e-commerce platform featuring a sleek, high-performance interface for tech enthusiasts. Built with a focus on speed, security, and a futuristic aesthetic.',
    url: 'https://eteck.vercel.app/',
    tags: ['Next.js', 'Tailwind CSS', 'E-commerce', 'Gadgets'],
    year: '2026',
    role: 'Frontend / UI Design',
    get image() {
      return ogUrl(this.name, this.description, this.tags);
    },
    remoteImage: 'https://eteck.vercel.app/opengraph-image.png',
  },
  {
    id: 'meensvarieties',
    name: 'Meensvarieties',
    description: 'A comprehensive student and home lifestyle store selling everything from academic kits to kitchen utilities, foils, and creative puzzle books.',
    url: 'https://meensvarieties.vercel.app/',
    tags: ['Next.js', 'Store', 'Lifestyle', 'Retail'],
    year: '2026',
    role: 'Full Stack Developer',
    get image() {
      return ogUrl(this.name, this.description, this.tags);
    },
    remoteImage: 'https://meensvarieties.vercel.app/opengraph-image.png',
  },
  {
    id: 'radiantpixels',
    name: 'Radiant Pixels',
    description: 'A world-class digital design agency crafting immersive visual identities and high-fidelity web experiences for brands that demand excellence.',
    url: 'https://radiant-pixels.vercel.app/',
    tags: ['Design Agency', 'Framer Motion', 'Visual Identity'],
    year: '2026',
    role: 'Lead Designer / Dev',
    get image() {
      return ogUrl(this.name, this.description, this.tags);
    },
    remoteImage: 'https://radiant-pixels.vercel.app/opengraph-image.png',
  },
];
