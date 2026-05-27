"use client";

import * as React from "react";
import { Filter, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface FigmaFilterDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

/**
 * FigmaFilterDropdown - A pixel-perfect, reusable dropdown component designed
 * to match the Jiva Health Figma design specification exactly.
 *
 * Spacing, sizing, borders, colors, shadow, font (Lato), check icon alignment, and hover/selected
 * states are handcrafted to reflect the high-fidelity UI requirements.
 */
export function FigmaFilterDropdown({
  options,
  value,
  onChange,
  placeholder = "All Status",
  className,
  isOpen,
  onToggle,
  onClose,
}: FigmaFilterDropdownProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Retrieve current active label matching the value
  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption && selectedOption.value !== "all" ? selectedOption.label : placeholder;

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={cn("relative w-full sm:w-[160px] text-left select-none", className)}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "w-full h-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[8px] text-[13px] text-left text-zinc-700 dark:text-zinc-300 flex items-center justify-between cursor-pointer focus:outline-hidden transition-all duration-150 relative pl-[34px] pr-[12px] font-medium font-sans hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30",
          isOpen && "border-zinc-300 dark:border-zinc-700 shadow-xs"
        )}
      >
        {/* Left Funnel Filter Icon */}
        <div className="absolute left-[12px] top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
          <Filter className="h-[14px] w-[14px]" />
        </div>

        {/* Selected / Placeholder Text (using Lato or standard dashboard sans) */}
        <span className="truncate select-none font-sans text-[#263238] dark:text-zinc-100 font-medium">
          {displayLabel}
        </span>

        {/* Right Chevron Down Icon */}
        <ChevronDown
          className={cn(
            "h-[15px] w-[15px] text-zinc-400 dark:text-zinc-500 shrink-0 transition-transform duration-200 ml-1.5",
            isOpen && "transform rotate-180"
          )}
        />
      </button>

      {/* Options Dropdown Panel */}
      {isOpen && (
        <div
          className={cn(
            "absolute left-0 right-0 mt-[6px] z-50 max-h-[300px] overflow-y-auto rounded-[8px] border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-[6px] shadow-[0px_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0px_4px_24px_rgba(0,0,0,0.4)] custom-scrollbar origin-top transition-all duration-200 animate-scaleUp"
          )}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  onClose();
                }}
                className={cn(
                  "w-full h-[38px] flex items-center justify-between rounded-[6px] px-[14px] text-left text-[13px] font-sans transition-all duration-150 cursor-pointer mb-[2px] last:mb-0",
                  isSelected
                    ? "bg-[#F4F4F5] dark:bg-zinc-800 text-[#263238] dark:text-zinc-50 font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-[#F4F4F5]/60 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-100 font-normal"
                )}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && (
                  <Check className="h-[14px] w-[14px] text-[#263238] dark:text-zinc-50 shrink-0 stroke-[2.5]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
