import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Reusable, Tailwind-styled Textarea component.
 * Features rounded corners, gray borders, accessible focus rings, and dark mode styles.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows = 3, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "w-full px-3 py-2 bg-zinc-50 border border-zinc-200/80 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 dark:focus:bg-zinc-950 resize-none font-normal",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
