# 🎨 Portfolio - Olayeye Muideen Ayomide

A modern, interactive developer portfolio built with Next.js 16, featuring dynamic content from GitHub, AniList, and YouTube Music APIs. Showcasing professional projects with 3D flip animations and real-time data integration.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## 📸 Preview

> A sleek, responsive portfolio with animated widgets showcasing projects, skills, music taste, and favorite anime.

## ✨ Features

### 🎯 Core Features
- **3D Flip Card Animations** - Interactive cards with smooth flip transitions using Framer Motion
- **Dynamic Project Showcase** - Automatically fetches and displays GitHub repositories tagged with `portfolio-feature`
- **Real-time GitHub Stats** - Live contribution graphs, achievements, and commit history
- **YouTube Music Integration** - Displays your music playlist with carousel navigation
- **Anime Collection** - Pulls favorite anime from AniList with detailed synopses
- **Responsive Bento Grid Layout** - Adaptive masonry-style grid that works on all devices
- **Dark Theme** - Professional dark mode design following modern UI principles

### 🔥 Advanced Features
- **Server-Side Rendering (SSR)** - Optimized performance with Next.js 16 App Router
- **Dynamic OG Images** - Auto-generated Open Graph images for projects
- **Error Boundaries** - Graceful error handling with retry mechanisms
- **Accessibility First** - WCAG 2.1 AA compliant with full keyboard navigation
- **Loading States** - Professional loading spinners and skeleton screens
- **Embla Carousel** - Smooth, touch-friendly carousels for media content

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Carousel:** [Embla Carousel](https://www.embla-carousel.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend & APIs
- **GitHub API** - Repository data, contributions, and commit history
- **AniList GraphQL API** - Anime list and details
- **YouTube Data API v3** - Music playlist integration
- **Vercel OG** - Dynamic Open Graph image generation

### Tools & Libraries
- **Image Optimization:** Next.js Image component
- **Utilities:** clsx, tailwind-merge
- **Code Quality:** ESLint, Prettier
- **Version Control:** Git

## 📦 Installation

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, pnpm, or bun
- Git

### Clone the Repository
```bash
git clone https://github.com/Muideen7/portfolio.git
cd portfolio
```

### Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# ============================================
# PERSONAL INFORMATION
# ============================================
NEXT_PUBLIC_YOUR_NAME="Olayeye Muideen Ayomide"
NEXT_PUBLIC_YOUR_ROLE="Full Stack Developer"
NEXT_PUBLIC_YOUR_EMAIL="your.email@example.com"
NEXT_PUBLIC_YOUR_TIMEZONE="America/Los_Angeles"

# ============================================
# GITHUB API (Required)
# ============================================
NEXT_PUBLIC_GITHUB_USERNAME="Muideen7"
GITHUB_TOKEN="ghp_your_github_personal_access_token_here"

# ============================================
# ANILIST API (Optional)
# ============================================
NEXT_PUBLIC_ANILIST_USERNAME="your_anilist_username"

# ============================================
# YOUTUBE MUSIC API (Optional)
# ============================================
NEXT_PUBLIC_YOUTUBE_API_KEY="your_youtube_api_key_here"
NEXT_PUBLIC_YOUTUBE_MUSIC_PLAYLIST_ID="your_playlist_id"

# ============================================
# SOCIAL LINKS
# ============================================
NEXT_PUBLIC_GITHUB_URL="https://github.com/Muideen7"
NEXT_PUBLIC_LINKEDIN_URL="https://linkedin.com/in/your-username"
NEXT_PUBLIC_TWITTER_URL="https://twitter.com/your-handle"
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/your-username"

# ============================================
# SITE METADATA
# ============================================
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### API Setup Guides

#### 1. GitHub Personal Access Token
1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Select scopes: `read:user`, `repo`
4. Copy token and add to `.env.local`

#### 2. AniList Username
1. Sign up at [AniList.co](https://anilist.co/signup)
2. Add anime to your list
3. Use your username in `.env.local`

#### 3. YouTube Data API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable **YouTube Data API v3**
4. Create API credentials (API Key)
5. Add key and playlist ID to `.env.local`

## 🚀 Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── api/                    # API routes
│   │   ├── og/route.tsx        # Dynamic OG images
│   │   ├── github/             # GitHub API endpoints
│   │   ├── anilist/route.ts    # AniList API
│   │   └── youtube-music/route.ts
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/
│   ├── ui/                     # Base UI components
│   │   ├── Card.tsx
│   │   ├── FlipCard.tsx
│   │   ├── Button.tsx
│   │   └── Badge.tsx
│   └── sections/               # Feature components
│       ├── ProfileCard.tsx
│       ├── ProjectCard.tsx
│       ├── MusicWidget.tsx
│       ├── AnimeWidget.tsx
│       ├── GitHubActivity.tsx
│       └── AchievementTracking.tsx
├── lib/
│   ├── utils.ts                # Utility functions
│   └── config.ts               # Site configuration
└── public/                     # Static assets
```

## 🎨 Customization

### Tagging Projects for Display

Add the `portfolio-feature` topic to your GitHub repositories:
1. Go to your repository settings
2. Add `portfolio-feature` in the **Topics** section
3. The most recently updated featured project will appear

### Modifying Widgets

All widgets are in `components/sections/`. Edit these files to customize:
- Widget content and styling
- API endpoints
- Animation behavior
- Layout and spacing

### Theme Colors

Primary colors are defined in `tailwind.config.ts`:
- **Emerald** (`#10b981`) - Primary actions
- **Purple** (`#a855f7`) - Anime/media content
- **Red** (`#ef4444`) - Music/YouTube
- **Blue** (`#3b82f6`) - Links and accents

## 📱 Responsive Design

Breakpoints:
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

Grid adapts automatically:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Muideen7/portfolio)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables on Vercel

Add all variables from `.env.local` in:
**Project Settings → Environment Variables**

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

**Olayeye Muideen Ayomide**

- GitHub: [@Muideen7](https://github.com/Muideen7)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/Muideen7)
- Twitter: [@YourHandle](https://twitter.com/OlayeyeMuideen)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Vercel](https://vercel.com/) - Hosting and deployment
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide](https://lucide.dev/) - Beautiful icons
- Design inspiration from [Bestfolios](https://www.bestfolios.com/)

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/Muideen7/portfolio?style=social)
![GitHub forks](https://img.shields.io/github/forks/Muideen7/portfolio?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/Muideen7/portfolio?style=social)

---

<p align="center">Made with ❤️ and ☕ by Olayeye Muideen Ayomide</p>