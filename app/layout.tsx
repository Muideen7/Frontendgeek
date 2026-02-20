import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Olayeye Muideen | Creative Developer & Anime Archivist",
  description:
    "Bento-style portfolio showcasing curated GitHub projects, AniList archives, and musical taste.",
  metadataBase: new URL("https://your-portfolio-domain.com"),
  keywords: [
    "Software Engineer",
    "Frontend Developer",
    "Bento Grid Portfolio",
    "Next.js 15",
  ],
  authors: [{ name: "Olayeye Muideen" }],
  openGraph: {
    title: "YourName | Digital Portfolio",
    description: "Exploring the intersection of code, design, and culture.",
    url: "https://your-portfolio-domain.com",
    siteName: "YourName Portfolio",
    images: [
      {
        url: "/og-preview.png", // Place a 1200x630 image in your /public folder
        width: 1200,
        height: 630,
        alt: "Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YourName | Portfolio",
    description: "Developer Portfolio & Anime Archive",
    images: ["/og-preview.png"],
    creator: "@your_handle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
}: Readonly<{
  children: React.ReactNode;
}>) {
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
