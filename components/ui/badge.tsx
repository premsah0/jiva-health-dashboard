import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "danger" | "neutral" | "outline" | "primary";
}

/**
 * Reusable Badge/Chip component for rendering state tags (Active, Patient, Support Staff).
 */
export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  const variants = {
    primary: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50",
    warning: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50",
    danger: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50",
    neutral: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700",
    outline: "bg-transparent text-zinc-500 border-zinc-200 dark:text-zinc-400 dark:border-zinc-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium tracking-wide transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
