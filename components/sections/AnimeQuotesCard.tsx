"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { RefreshCw, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface QuoteData {
  content: string;
  character: { name: string };
  anime: { name: string };
}

const FALLBACK_QUOTE: QuoteData = {
  content:
    "Whatever you lose, you'll find it again. But what you throw away you'll never get back.",
  character: { name: "Kenshin Himura" },
  anime: { name: "Rurouni Kenshin" },
};

export function AnimeQuotesCard({
  className,
  id,
}: {
  className?: string;
  id?: string;
}) {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/anime-quote");
      const result = await res.json();

      // Matches the mapping we set in the API Route
      if (result.status === "success" && result.data) {
        setQuote(result.data);
      } else {
        setQuote(FALLBACK_QUOTE);
      }
    } catch (err) {
      console.error("Failed to fetch anime quote:", err);
      setQuote(FALLBACK_QUOTE);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <Card
      id={id}
      className={cn(
        "group min-h-55 transition-all duration-300 relative overflow-hidden",
        className,
      )}
    >
      {/* Decorative background icon */}
      <Quote className="absolute -right-4 -top-4 w-24 h-24 text-white/8 -rotate-12 pointer-events-none" />

      <div className="flex flex-col h-full justify-between relative z-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase px-2 py-0.5 bg-blue-400/10 rounded border border-blue-400/20">
              Anime Archive
            </span>
            <button
              onClick={fetchQuote}
              disabled={loading}
              title="Refresh Quote"
              className="text-gray-500 hover:text-white transition-all active:scale-90 disabled:opacity-50"
            >
              <RefreshCw
                className={cn("w-3.5 h-3.5", loading && "animate-spin")}
              />
            </button>
          </div>

          <div className="min-h-20">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3 animate-pulse"
                >
                  <div className="h-3 bg-white/10 rounded w-full" />
                  <div className="h-3 bg-white/10 rounded w-5/6" />
                  <div className="h-3 bg-white/10 rounded w-2/3" />
                </motion.div>
              ) : (
                <motion.p
                  key={quote?.content}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[17px] font-medium text-gray-200 leading-relaxed italic selection:bg-blue-500/30"
                >
                  "{quote?.content}"
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-white/5 flex justify-between items-end">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-zinc-100 font-bold uppercase tracking-wider">
              {loading ? "---" : `— ${quote?.character.name}`}
            </span>
            <span className="text-[10px] text-zinc-500 font-medium">
              {loading ? "---" : quote?.anime.name}
            </span>
          </div>

          <div className="relative flex h-2 w-2 mb-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </div>
        </div>
      </div>
    </Card>
  );
}
