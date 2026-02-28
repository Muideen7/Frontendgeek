"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  command?: string;
}

export function TerminalWindow({
  children,
  title = "bash",
  className,
  command,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-md border border-border bg-card overflow-hidden shadow-2xl glass",
        className
      )}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
          {title}
        </div>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Terminal Content */}
      <div className="p-6 font-mono text-sm leading-relaxed">
        {command && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-primary font-bold">➜</span>
            <span className="text-accent">~</span>
            <span className="text-foreground">{command}</span>
            <span className="w-2 h-4 bg-primary cursor-blink" />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
