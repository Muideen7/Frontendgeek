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
    id: 'mindflow',
    name: 'MindFlow',
    description: 'A cognitive productivity platform harmonizing AI-driven task management with deep-work focus sessions.',
    url: 'https://mlndflow.vercel.app/',
    tags: ['Next.js 15', 'Framer Motion', 'Zustand'],
    year: '2025',
    role: 'Frontend / UI Design',
    get image() {
      return ogUrl(this.name, this.description, this.tags);
    },
    remoteImage: 'https://mlndflow.vercel.app/opengraph-image.png',
  },
  {
    id: 'lexiclear',
    name: 'LexiClear',
    description: 'High-fidelity legal contract analysis platform using heuristic verification and AI-powered clarity metrics.',
    url: 'https://lexi-clear-legal.vercel.app/',
    tags: ['Prisma', 'Next.js', 'Legal Tech'],
    year: '2025',
    role: 'Full Stack / UX',
    get image() {
      return ogUrl(this.name, this.description, this.tags);
    },
    remoteImage: 'https://lexi-clear-legal.vercel.app/opengraph-image.png',
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
    id: 'devmentor',
    name: 'DevMentor',
    description: 'An interactive ecosystem bridging experienced software architects with aspiring engineers.',
    url: 'https://dev-mentor-nu.vercel.app/',
    tags: ['React', 'TypeScript', 'Mentorship'],
    year: '2025',
    role: 'Product Design / Dev',
    get image() {
      return ogUrl(this.name, this.description, this.tags);
    },
    remoteImage: 'https://dev-mentor-nu.vercel.app/opengraph-image.png',
  },
  {
    id: 'crdev',
    name: 'CRDev Hub',
    description: 'A creative developer repository and technical showcase platform for high-end digital footprints.',
    url: 'https://crdev.vercel.app/',
    tags: ['UX/UI', 'Next.js', 'Showcase'],
    year: '2024',
    role: 'Design System / Dev',
    get image() {
      return ogUrl(this.name, this.description, this.tags);
    },
    remoteImage: 'https://crdev.vercel.app/opengraph-image.png',
  },
];
