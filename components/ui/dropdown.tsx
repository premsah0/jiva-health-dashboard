import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: DropdownOption[];
  leftIcon?: React.ReactNode;
}

/**
 * Reusable, Tailwind-styled Dropdown Select component.
 * Features customizable left icons and right chevron triggers with standard select tags.
 */
export const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  ({ className, options, leftIcon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full sm:w-auto min-w-[140px]">
        {leftIcon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
            {leftIcon}
          </div>
        )}
        <select
          ref={ref}
          className={cn(
            "w-full h-10 pr-10 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-700 font-medium cursor-pointer appearance-none focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300",
            leftIcon ? "pl-10" : "pl-3.5",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
