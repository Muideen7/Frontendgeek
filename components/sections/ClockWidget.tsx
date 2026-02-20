"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

interface ClockWidgetProps {
  className?: string;
}

export function ClockWidget({ className }: ClockWidgetProps) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: SITE_CONFIG.timezone,
    });
  };

  const day = mounted
    ? time
        .toLocaleDateString("en-US", {
          weekday: "short",
          timeZone: SITE_CONFIG.timezone,
        })
        .toUpperCase()
    : "--";

  const cityName =
    SITE_CONFIG.timezone.split("/")[1]?.replace("_", " ").toUpperCase() ||
    "LOCAL";

  return (
    <Card
      onClick={scrollToTop}
      // Added min-h-[180px] to help match mobile heights of other widgets
      className={cn(
        "cursor-pointer group relative flex flex-col items-center justify-center overflow-hidden transition-all duration-300",
        className,
      )}
    >
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-4">
        {/* Location Label */}
        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-[10px] font-bold text-blue-400/80 tracking-[0.3em] uppercase">
            {cityName} • {day}
          </span>
        </div>

        {/* Time Display */}
        <div
          className="text-5xl md:text-6xl font-black tracking-tighter tabular-nums text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          {mounted ? formatTime(time) : "00:00:00"}
        </div>

        {/* Scroll Hint */}
        <div className="mt-4 text-[9px] font-bold text-white/30 tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          CLICK TO SCROLL UP ↑
        </div>
      </div>

      {/* SNAKE XENZIA ANIMATION LAYER */}
      <div className="absolute bottom-6 left-0 w-full h-1 overflow-hidden pointer-events-none opacity-40">
        <div className="snake-container flex absolute top-0">
          <div className="h-1 w-4 bg-emerald-500 rounded-full mr-1 shadow-[0_0_8px_#10b981]" />
          <div className="h-1 w-2 bg-emerald-500/50 rounded-full mr-1" />
          <div className="h-1 w-1 bg-emerald-500/20 rounded-full" />
        </div>
      </div>

      <style jsx>{`
        .snake-container {
          animation: snakeMove 8s linear infinite;
        }
        @keyframes snakeMove {
          0% {
            left: -20%;
          }
          100% {
            left: 110%;
          }
        }
      `}</style>
    </Card>
  );
}
