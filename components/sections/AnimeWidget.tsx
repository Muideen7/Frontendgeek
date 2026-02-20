/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import {
  Film,
  Star,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

export function AnimeWidget({ className }: { className?: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnime, setSelectedAnime] = useState<any | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 3,
  });

  useEffect(() => {
    fetch("/api/anilist")
      .then((res) => res.json())
      .then((data) => {
        setAnimeList(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Card
      id="anime-widget"
      className={cn(
        className,
        "h-112 flex flex-col p-5 relative overflow-hidden",
      )}
    >
      <AnimatePresence mode="wait">
        {!selectedAnime ? (
          // GRID VIEW (Carousel)
          <motion.div
            key="grid"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-purple-400" />
                <h3 className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                  Favorite Anime
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => emblaApi?.scrollPrev()}
                  className="p-1.5 hover:bg-zinc-800 rounded-full border border-zinc-800 cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-zinc-100" />
                </button>
                <button
                  onClick={() => emblaApi?.scrollNext()}
                  className="p-1.5 hover:bg-zinc-800 rounded-full border border-zinc-800 cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-zinc-100" />
                </button>
              </div>
            </div>

            <div className="overflow-hidden flex-1" ref={emblaRef}>
              <div className="flex gap-3 h-full">
                {loading
                  ? [...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-[0_0_calc(33.333%-0.5rem)] bg-zinc-900 rounded-xl animate-pulse"
                      />
                    ))
                  : animeList.map((anime) => (
                      <motion.div
                        key={anime.id}
                        onClick={() => setSelectedAnime(anime)}
                        className="flex-[0_0_calc(33.333%-0.5rem)] relative aspect-2/3 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 group cursor-pointer"
                      >
                        <Image
                          src={anime.image}
                          alt={anime.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 33vw, 20vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent p-2 flex flex-col justify-end">
                          <p className="text-[10px] font-bold text-white truncate">
                            {anime.title}
                          </p>
                        </div>
                      </motion.div>
                    ))}
              </div>
            </div>
          </motion.div>
        ) : (
          // DETAILED VIEW (Occupies full card)
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col h-full gap-4 relative"
          >
            <button
              onClick={() => setSelectedAnime(null)}
              className="absolute top-0 right-0 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-full z-20 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="flex gap-4 h-full">
              {/* Left Side: Large Poster */}
              <div className="relative w-1/3 h-full rounded-xl overflow-hidden border border-zinc-800">
                <Image
                  src={selectedAnime.image}
                  alt={selectedAnime.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right Side: Synopsis */}
              <div className="w-2/3 flex flex-col">
                <h4 className="text-lg font-bold text-white mb-2 leading-tight">
                  {selectedAnime.title}
                </h4>
                <div className="flex items-center gap-3 mb-4 text-xs">
                  <span className="flex items-center gap-1 text-yellow-500 font-bold">
                    <Star className="w-3 h-3 fill-yellow-500" />{" "}
                    {selectedAnime.score}
                  </span>
                  <span className="text-zinc-500 font-medium">
                    AniList Entry
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                  <p className="text-sm text-zinc-400 leading-relaxed italic">
                    {selectedAnime.description?.replace(/<[^>]*>?/gm, "") ||
                      "No synopsis found."}
                  </p>
                </div>
                <a
                  href={selectedAnime.url}
                  target="_blank"
                  className="mt-4 flex items-center justify-center gap-2 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" /> View Full Info
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
