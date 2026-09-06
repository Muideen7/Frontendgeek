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
    id: 'databes',
    name: 'DataBes',
    description: 'A Data Company — demos and utilities for data-driven workflows and ETL experiments.',
    url: 'https://databes.vercel.app',
    tags: ['Data', 'Next.js', 'Prisma'],
    year: '2026',
    role: 'Founder / Dev',
    get image() {
      return ogUrl(this.name, this.description, this.tags);
    },
    remoteImage: 'https://databes.vercel.app/opengraph-image.png',
  },
  {
    id: 'deepstyle',
    name: 'deepstyle',
    description: 'Deep-style image processing experiments — neural style transfer and generative pipelines for creative image synthesis.',
    url: 'https://deepstyle-seven.vercel.app',
    tags: ['AI', 'Image Processing', 'Deep Learning'],
    year: '2026',
    role: 'Research / Frontend',
    get image() {
      return ogUrl(this.name, this.description, this.tags);
    },
    remoteImage: 'https://deepstyle-seven.vercel.app/opengraph-image.png',
  },
  {
    id: 'mtnylink',
    name: 'MTNyLink',
    description: 'A lightweight browser extension for enriched link previews and OG helpers.',
    url: 'https://github.com/Muideen7/MTNyLink',
    tags: ['Extension', 'Browser', 'OG'],
    year: '2026',
    role: 'Author',
    get image() {
      // MTNyLink is not deployed — use the GitHub mark as the OG image as requested.
      return 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
    },
    remoteImage: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
  },
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
    description: 'LexiClear AI | An enterprise-grade AI contract intelligence platform. Featuring real-time neural risk detection and "Plain English" translation.',
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
    id: 'eteck',
    name: 'Eteck',
    description: 'A premium gadget e-commerce platform featuring a sleek, high-performance interface for tech enthusiasts.',
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
];
