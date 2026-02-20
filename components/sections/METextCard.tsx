"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const contentItems = [
  {
    id: "philosophy",
    title: "💭 Design Philosophy",
    content:
      "I believe in creating systems that are both beautiful and functional. Every pixel has a purpose, every interaction tells a story.",
  },
  {
    id: "process",
    title: "⚡ My Process",
    content:
      "Start with research, iterate quickly, test constantly, and never stop learning. Great design is an evolution, not a destination.",
  },
  {
    id: "passion",
    title: "🎨 What Drives Me",
    content:
      "The intersection of technology and creativity. Building experiences that make people's lives better, one interaction at a time.",
  },
];

export function METextCard({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = (direction: "prev" | "next" | "shuffle") => {
    if (direction === "shuffle") {
      const randomIndex = Math.floor(Math.random() * contentItems.length);
      setCurrentIndex(randomIndex);
    } else if (direction === "prev") {
      setCurrentIndex(
        (prev) => (prev - 1 + contentItems.length) % contentItems.length,
      );
    } else {
      setCurrentIndex((prev) => (prev + 1) % contentItems.length);
    }
  };

  const currentItem = contentItems[currentIndex];

  return (
    <Card id="me-text-card" className={className}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">ME.TXT</h3>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("prev")}
            className="p-2 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => navigate("shuffle")}
            className="p-2 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Shuffle"
          >
            <Shuffle className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => navigate("next")}
            className="p-2 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[200px] flex flex-col justify-center"
        >
          <h4 className="text-2xl font-bold text-white mb-4">
            {currentItem.title}
          </h4>
          <p className="text-gray-400 leading-relaxed text-lg">
            {currentItem.content}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-2 mt-6">
        {contentItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 flex-1 rounded-full transition-all ${
              index === currentIndex ? "bg-emerald-500" : "bg-gray-800"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </Card>
  );
}
