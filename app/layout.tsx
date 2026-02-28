import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import { Shell } from "@/components/Shell";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Olamide Muideen | Software Engineer",
    template: "%s | Olamide Muideen"
  },
  description: "Software Engineer specializing in high-performance web systems, systems engineering, and user-centric architecture. Explore the portfolio of Olamide Muideen Ayomide.",
  keywords: ["Olamide Muideen Ayomide", "Software Engineer", "Full Stack Developer", "Next.js", "TypeScript", "Terminal Portfolio", "ALX", "Andela"],
  authors: [{ name: "Olamide Muideen Ayomide" }],
  creator: "Olamide Muideen Ayomide",
  metadataBase: new URL("https://frontendgeek.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://frontendgeek.vercel.app",
    title: "Olamide Muideen | Software Engineer",
    description: "Software Engineer specializing in high-performance web systems and terminal-centric architectures.",
    siteName: "Olamide Muideen Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Olamide Muideen | Software Engineer",
    description: "Software Engineer specializing in high-performance web systems and terminal-centric architectures.",
    creator: "@OlayeyeMuideen",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jetbrainsMono.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
