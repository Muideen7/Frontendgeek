import { HTMLAttributes, forwardRef, ElementType } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLAttributes<HTMLElement> {
  variant?: "primary" | "secondary";
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  // Adding type for buttons, optional for links
  type?: "button" | "submit" | "reset";
}

export const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    { className, variant = "primary", as = "button", children, ...props },
    ref,
  ) => {
    // Cast to ElementType to allow dynamic rendering
    const Component = as as ElementType;

    return (
      <Component
        ref={ref}
        className={cn(
          "px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2",
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
