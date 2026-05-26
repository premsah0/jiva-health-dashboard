"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface SelectDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: "emerald" | "neutral";
  leftIcon?: React.ReactNode;
}

/**
 * Reusable Custom Select Dropdown component.
 * Features smooth drop lists, click-outside closures, and JivaHealth brand highlights.
 */
export function SelectDropdown({
  options,
  value,
  onChange,
  placeholder = "Select option",
  className,
  variant = "emerald",
  leftIcon,
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Retrieve current active label matching the value
  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setIsOpen(false);
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  // Selected variant configuration
  const selectedBg = variant === "emerald"
    ? "bg-[#e6f4ea] text-[#137333] dark:bg-emerald-950/40 dark:text-emerald-400"
    : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50";

  const checkColor = variant === "emerald" ? "text-[#137333] dark:text-emerald-400" : "text-zinc-900 dark:text-zinc-50";

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={cn("relative w-full text-left select-none font-medium", className)}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full h-10 bg-white border border-zinc-200 rounded-lg text-sm text-left text-zinc-700 flex items-center justify-between cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 relative",
          leftIcon ? "pl-9 pr-3.5" : "px-3.5",
          !selectedOption && "text-zinc-400 dark:text-zinc-500"
        )}
      >
        {leftIcon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
            {leftIcon}
          </div>
        )}
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-150", isOpen && "transform rotate-180")} />
      </button>

      {/* Options Dropdown Panel */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 z-50 max-h-56 overflow-y-auto rounded-lg border border-zinc-200/80 bg-white p-1.5 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 animate-scaleUp custom-scrollbar">
          {options.map((opt) => {
            const isSelected = opt.value === value;

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-normal tracking-wide transition-all duration-150 cursor-pointer",
                  isSelected
                    ? selectedBg
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                )}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className={cn("h-3.5 w-3.5", checkColor)} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
