"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Music, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

export function MusicWidget({ className }: { className?: string }) {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });

  useEffect(() => {
    fetch("/api/youtube-music")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      });
  }, []);

  // Groups videos into chunks of 6
  const chunks = [];
  for (let i = 0; i < videos.length; i += 6) {
    chunks.push(videos.slice(i, i + 6));
  }

  return (
    <Card className={`${className} h-[450px] flex flex-col`}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Music className="w-5 h-5 text-red-400" />
          <h3 className="text-[11px] font-bold tracking-widest text-gray-300">
            RECENT MUSIC
          </h3>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden flex-1" ref={emblaRef}>
        <div className="flex h-full">
          {chunks.map((chunk, idx) => (
            <div
              key={idx}
              className="flex-[0_0_100%] min-w-0 grid grid-cols-3 grid-rows-2 gap-3 h-full"
            >
              {chunk.map((video: any) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  className="relative aspect-square rounded-md overflow-hidden border border-gray-800 group"
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-1 flex items-end">
                    <p className="text-[8px] text-white truncate">
                      {video.title}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
