export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_YOUR_NAME || "Your Name",
  role: process.env.NEXT_PUBLIC_YOUR_ROLE || "Developer",
  email: process.env.NEXT_PUBLIC_YOUR_EMAIL || "",
  timezone: process.env.NEXT_PUBLIC_YOUR_TIMEZONE || "Africa/Lagos",

  github: {
    username: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Muideen7",
    token: process.env.GITHUB_TOKEN || "",
  },

  anilist: {
    username: process.env.NEXT_PUBLIC_ANILIST_USERNAME || "",
  },

  youtube: {
    apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || "",
    channelId: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || "",
    playlistId: process.env.NEXT_PUBLIC_YOUTUBE_MUSIC_PLAYLIST_ID || "",
  },

  social: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
    email: `mailto:${process.env.NEXT_PUBLIC_YOUR_EMAIL}`,
  },

  current: {
    company: process.env.NEXT_PUBLIC_CURRENT_COMPANY || "",
    companyUrl: process.env.NEXT_PUBLIC_CURRENT_COMPANY_URL || "",
    project: process.env.NEXT_PUBLIC_CURRENT_PROJECT || "",
  },

  previous: {
    company: process.env.NEXT_PUBLIC_PREVIOUS_COMPANY || "",
    companyUrl: process.env.NEXT_PUBLIC_PREVIOUS_COMPANY_URL || "",
  },

  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};
