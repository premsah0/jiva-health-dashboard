import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost" | "prime";
  size?: "sm" | "md" | "lg";
}

/**
 * Reusable, customizable Button component styled with Tailwind CSS.
 * Heavy on clarity and light on complexity.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    // Map variant properties to Tailwind styling groups
    const variants = {
      primary: "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 focus:ring-slate-500 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200",
      secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:bg-zinc-300 focus:ring-zinc-500 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
      danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500",
      outline: "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 focus:ring-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800",
      ghost: "bg-transparent text-zinc-700 hover:bg-zinc-100 focus:ring-zinc-500 dark:text-zinc-300 dark:hover:bg-zinc-800",
      prime: "bg-gradient-to-r from-[#FE9A00] to-[#E17100] hover:opacity-95 text-white active:scale-95 transition-all font-medium shadow-xs border-none focus:ring-amber-500",
    };

    // Map size properties to Tailwind space dimensions (all aligned to text-sm 14px and font-medium)
    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-md",
      md: "px-4 py-2 text-sm rounded-lg",
      lg: "px-5 py-2.5 text-sm rounded-xl",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
