"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Music,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Play,
  Disc3,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  url: string;
  duration?: string;
}

interface MusicWidgetProps {
  className?: string;
}

type LoadingState = "idle" | "loading" | "success" | "error";

export function MusicWidget({ className }: MusicWidgetProps) {
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const [error, setError] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateScrollButtons();
    emblaApi.on("select", updateScrollButtons);
    emblaApi.on("reInit", updateScrollButtons);

    return () => {
      emblaApi.off("select", updateScrollButtons);
      emblaApi.off("reInit", updateScrollButtons);
    };
  }, [emblaApi, updateScrollButtons]);

  const fetchMusic = useCallback(async () => {
    setLoadingState("loading");
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch("/api/youtube-music", {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `Failed to fetch music playlist (${response.status})`,
        );
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid playlist response format");
      }

      const validTracks = data
        .filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item): item is any =>
            item?.id && item?.title && item?.thumbnail && item?.url,
        )
        .map((item) => ({
          id: item.id,
          title: item.title,
          artist: item.channelTitle || item.artist || "Unknown Artist",
          thumbnail: item.thumbnail,
          url: item.url,
          duration: item.duration,
        }));

      setTracks(validTracks);
      setLoadingState("success");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.name === "AbortError"
            ? "Request timeout. Please check your connection."
            : err.message
          : "Failed to load music playlist. Please try again.";

      console.error("[MusicWidget] Fetch error:", {
        error: err,
        timestamp: new Date().toISOString(),
        endpoint: "/api/youtube-music",
      });

      setError(errorMessage);
      setLoadingState("error");
    }
  }, []);

  useEffect(() => {
    fetchMusic();
  }, [fetchMusic]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const pages: MusicTrack[][] = [];
  for (let i = 0; i < tracks.length; i += 6) {
    pages.push(tracks.slice(i, i + 6));
  }

  if (loadingState === "loading") {
    return (
      <Card
        className={cn(
          "h-112.5 flex flex-col items-center justify-center border-zinc-800 bg-zinc-950",
          className,
        )}
        role="status"
        aria-live="polite"
        aria-label="Loading music playlist"
      >
        <div className="relative w-16 h-16 mb-4">
          <Disc3
            className="w-16 h-16 text-red-500 animate-spin"
            style={{ animationDuration: "3s" }}
          />
        </div>
        <p className="text-sm text-zinc-500 font-medium">
          Loading your music...
        </p>
      </Card>
    );
  }

  if (loadingState === "error") {
    return (
      <Card
        className={cn(
          "h-112.5 flex flex-col items-center justify-center text-center p-8 border-red-900/30 bg-red-950/20",
          className,
        )}
        role="alert"
        aria-live="assertive"
      >
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-zinc-100 mb-2">
          Unable to Load Playlist
        </h3>
        <p className="text-sm text-zinc-400 mb-6 max-w-md">{error}</p>
        <Button
          onClick={fetchMusic}
          className="gap-2 bg-zinc-800 hover:bg-zinc-700 text-white"
          aria-label="Retry loading music playlist"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      </Card>
    );
  }

  if (tracks.length === 0) {
    return (
      <Card
        className={cn(
          "h-112.5 flex flex-col items-center justify-center text-center p-8 border-zinc-800 bg-zinc-950",
          className,
        )}
      >
        <Music className="w-16 h-16 text-zinc-700 mb-4" />
        <h3 className="text-lg font-semibold text-zinc-300 mb-2">
          No Music in Playlist
        </h3>
        <p className="text-sm text-zinc-500 max-w-md mb-1">
          Configure your YouTube Music playlist in{" "}
          <code className="px-2 py-1 bg-zinc-900 rounded text-xs font-mono">
            .env.local
          </code>
        </p>
        <p className="text-xs text-zinc-600 mt-2 mb-4">
          Add{" "}
          <code className="px-1.5 py-0.5 bg-zinc-900 rounded font-mono">
            NEXT_PUBLIC_YOUTUBE_MUSIC_PLAYLIST_ID
          </code>
        </p>
        <Button
          onClick={fetchMusic}
          variant="secondary"
          className="gap-2"
          aria-label="Retry loading music"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </Button>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "h-112.5 flex flex-col border-zinc-800 bg-zinc-950",
        className,
      )}
      role="region"
      aria-label="YouTube Music playlist"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Music className="w-5 h-5 text-red-400" aria-hidden="true" />
          <h3 className="text-[11px] font-bold tracking-widest text-gray-300">
            MY MUSIC PLAYLIST
          </h3>
          <span className="text-[9px] text-zinc-600 font-mono">
            {tracks.length} {tracks.length === 1 ? "track" : "tracks"}
          </span>
        </div>

        {pages.length > 1 && (
          <div
            className="flex gap-1"
            role="group"
            aria-label="Playlist navigation"
          >
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className={cn(
                "p-1.5 rounded-full transition-all",
                canScrollPrev
                  ? "hover:bg-white/10 text-white"
                  : "text-zinc-700 cursor-not-allowed",
              )}
              aria-label="Previous page"
              type="button"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className={cn(
                "p-1.5 rounded-full transition-all",
                canScrollNext
                  ? "hover:bg-white/10 text-white"
                  : "text-zinc-700 cursor-not-allowed",
              )}
              aria-label="Next page"
              type="button"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="overflow-hidden flex-1" ref={emblaRef}>
        <div className="flex h-full">
          {pages.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className="flex-[0_0_100%] min-w-0 grid grid-cols-3 grid-rows-2 gap-3 h-full px-1"
              role="group"
              aria-label={`Music page ${pageIndex + 1} of ${pages.length}`}
            >
              {page.map((track, trackIndex) => (
                <a
                  key={track.id}
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square rounded-lg overflow-hidden border border-zinc-800 group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-all hover:border-red-500/50"
                  aria-label={`Play ${track.title} by ${track.artist}`}
                >
                  <div className="relative w-full h-full bg-zinc-900">
                    <Image
                      src={track.thumbnail}
                      alt={`Album art for ${track.title}`}
                      fill
                      sizes="(max-width: 768px) 33vw, 200px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      loading={
                        pageIndex === 0 && trackIndex < 3 ? "eager" : "lazy"
                      }
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-red-600 shadow-lg shadow-red-600/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/95 via-black/70 to-transparent p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-[11px] text-white font-semibold line-clamp-2 leading-tight mb-1">
                        {track.title}
                      </p>
                      <p className="text-[9px] text-zinc-400 truncate flex items-center gap-1">
                        <Music className="w-2.5 h-2.5" />
                        {track.artist}
                      </p>
                    </div>

                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-7 h-7 rounded-full bg-red-600/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <ExternalLink className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>

                    {track.duration && (
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm">
                        <span className="text-[9px] text-white font-mono">
                          {track.duration}
                        </span>
                      </div>
                    )}
                  </div>
                </a>
              ))}

              {page.length < 6 &&
                Array.from({ length: 6 - page.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="aspect-square rounded-lg border border-dashed border-zinc-800 bg-zinc-900/30 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Music className="w-8 h-8 text-zinc-800" />
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {pages.length > 1 && (
        <div
          className="flex justify-center gap-1.5 mt-4"
          role="group"
          aria-label="Playlist page indicators"
        >
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                emblaApi?.selectedScrollSnap() === index
                  ? "w-6 bg-red-500"
                  : "w-1.5 bg-zinc-700 hover:bg-zinc-600",
              )}
              aria-label={`Go to page ${index + 1}`}
              aria-current={
                emblaApi?.selectedScrollSnap() === index ? "true" : "false"
              }
              type="button"
            />
          ))}
        </div>
      )}
    </Card>
  );
}
