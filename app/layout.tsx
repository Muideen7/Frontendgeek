import type { Metadata } from "next";
import { Syne, Geist_Mono } from "next/font/google";
import SidebarMenu from "@/components/ui/SidebarMenu";
import SmoothScroll from "@/components/ui/SmoothScroll";
import UniqueCursor from "@/components/ui/UniqueCursor";
import ThemeWrapper from "@/components/ui/ThemeWrapper";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LoadingScreen from "@/components/ui/LoadingScreen";
import PageReveal from "@/components/ui/PageReveal";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Olayeye Muideen (FrontendGeek)",
  description: "Frontend Developer who fell in love with code through curiosity. Focused on building smooth animations and pixel-perfect designs since 2019.",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <body
        className={`${syne.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground selection:bg-primary selection:text-background overflow-x-hidden`}
      >
        <ThemeWrapper>
          <div className="grain-overlay" />
          <UniqueCursor />
          
          <LoadingScreen />
          
          <PageReveal>
            <SmoothScroll>
              <SidebarMenu />
              <header className="hidden md:flex fixed top-0 right-0 w-full z-40 px-8 py-8 md:px-16 md:py-12 justify-end items-center pointer-events-none">
                <div className="pointer-events-auto">
                  <ThemeToggle />
                </div>
              </header>
              
              <main className="relative z-10 w-full min-h-screen pt-24 md:pt-0 pl-0 md:pl-32">
                {children}
              </main>
            </SmoothScroll>
          </PageReveal>

        </ThemeWrapper>
      </body>
    </html>
  );
}
