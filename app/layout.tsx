import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://frontendgeek.vercel.app"),

  title: {
    default: "Olayeye Muideen | Creative Developer & Anime Archivist",
    template: "%s | Olayeye Muideen",
  },

  description:
    "Bento-style portfolio showcasing curated GitHub projects, AniList archives, and musical taste.",

  keywords: [
    "Software Engineer",
    "Frontend Developer",
    "Creative Developer",
    "Anime Archivist",
    "Next.js Developer",
    "Bento Grid Portfolio",
  ],

  authors: [{ name: "Olayeye Muideen" }],

  alternates: {
    canonical: "https://frontendgeek.vercel.app",
  },

  openGraph: {
    title: "Olayeye Muideen | Creative Developer & Anime Archivist",
    description:
      "Exploring the intersection of code, design, and culture.",
    url: "https://frontendgeek.vercel.app",
    siteName: "FrontendGeek Portfolio",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Olayeye Muideen Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Olayeye Muideen | Creative Developer & Anime Archivist",
    description:
      "Bento-style portfolio showcasing curated GitHub projects and AniList archives.",
    images: ["/api/og"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}