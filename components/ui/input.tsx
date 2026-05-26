import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Reusable, Tailwind-styled Input component.
 * Supports icons (like Search magnifier) placed cleanly inside the input wrapper.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative w-full flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            "w-full h-10 bg-zinc-50 border border-zinc-200/80 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 dark:focus:bg-zinc-950",
            leftIcon ? "pl-10" : "pl-3.5",
            rightIcon ? "pr-10" : "pr-3.5",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
