import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", as = "button", children, ...props },
    ref,
  ) => {
    const Component = as;

    return (
      <Component
        ref={ref as any}
        className={cn(
          "px-6 py-2.5 rounded-xl font-semibold transition-all duration-200",
          "hover:scale-105 active:scale-95",
          variant === "primary" &&
            "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20",
          variant === "secondary" &&
            "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700",
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Button.displayName = "Button";
