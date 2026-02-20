import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Coffee } from "lucide-react";

export function ThoughtsCard({ className }: { className?: string }) {
  return (
    <Card id="thoughts-card" className={className}>
      <div className="flex items-center gap-3 mb-4">
        <Coffee className="w-5 h-5 text-gray-400" />
        <span className="text-[11px] font-bold tracking-[0.1em] text-gray-400">
          THOUGHTS OF
        </span>
        <Badge
          variant="outline"
          className="text-[10px] text-emerald-400 border-emerald-400/30"
        >
          {process.env.NEXT_PUBLIC_YOUR_NAME?.split(" ")
            .map((n) => n[0])
            .join("") || "PORTFOLIO"}
        </Badge>
      </div>

      <p className="text-[15px] text-gray-300 leading-relaxed mb-5">
        Instead of making a 'traditional' portfolio website, I'd like to utilize
        this digital space to share a bit more about myself. My goal is to
        design & develop a digital 'system' that grows overtime.
      </p>

      <p className="text-xs text-gray-500 leading-relaxed">
        This website was inspired by{" "}
        <span className="text-gray-400">bestfolios.com</span>, built with{" "}
        <span className="text-gray-400">Next.js 16</span>, powered by{" "}
        <span className="text-gray-400">TypeScript</span>, and styled with{" "}
        <span className="text-gray-400">Tailwind CSS</span>.
      </p>
    </Card>
  );
}
