import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "blue" | "green" | "emerald";
  className?: string;
}

/**
 * Reusable Initials & Image Avatar component.
 * Custom built to support multiple brand coloring variants (Jiva green, primary blue, admin dark emerald).
 */
export function Avatar({ name, src, size = "md", variant = "blue", className }: AvatarProps) {
  // Extract initials (e.g. "Alice Williams" -> "AW")
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizes = {
    sm: "h-8 w-8 text-[11px] font-extrabold",
    md: "h-11 w-11 text-sm font-extrabold",
    lg: "h-16 w-16 text-lg font-black",
    xl: "h-20 w-20 text-2xl font-black",
  };

  const variants = {
    blue: "bg-blue-600 text-white dark:bg-blue-650",
    green: "bg-[#e6f4ea] text-[#137333] border border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/40",
    emerald: "bg-[#137333] text-white dark:bg-emerald-700",
  };

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center select-none shrink-0 overflow-hidden shadow-xs",
        sizes[size],
        variants[variant],
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={(e) => {
            // Fallback to initials on error
            (e.target as HTMLElement).style.display = "none";
          }}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
