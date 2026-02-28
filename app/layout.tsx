import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Olamide Muideen | Software Engineer",
    template: "%s | Olamide Muideen"
  },
  description: "Software Engineer specializing in high-performance web systems, systems engineering, and user-centric architecture. Explore the portfolio of Olamide Muideen.",
  keywords: ["Olamide Muideen", "Software Engineer", "Full Stack Developer", "Next.js", "TypeScript", "Terminal Portfolio", "ALX", "Andela"],
  authors: [{ name: "Olamide Muideen" }],
  creator: "Olamide Muideen",
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
        className={`${jetbrainsMono.variable} font-mono antialiased bg-black text-foreground`}
      >
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,100%_100%] pointer-events-none" />
        </div>
        {children}
      </body>
    </html>
  );
}
