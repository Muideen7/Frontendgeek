import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold",
        variant === "default" &&
          "bg-gray-800 text-gray-300 border border-gray-700",
        variant === "outline" &&
          "bg-transparent text-gray-400 border border-gray-700",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
