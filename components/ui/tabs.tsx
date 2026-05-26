import * as React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

/**
 * Reusable, Tailwind-styled Tabs component.
 * Supports left-aligned icons and high-fidelity active underline indicators.
 */
export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("border-b border-zinc-200/80 dark:border-zinc-800 w-full overflow-x-auto custom-scrollbar", className)}>
      <nav className="flex space-x-6 px-1" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                "flex items-center gap-2 py-3 px-1 border-b-2 text-sm font-medium transition-all duration-150 shrink-0",
                isActive
                  ? "border-[#137333] text-[#137333] dark:border-emerald-400 dark:text-emerald-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
            >
              {tab.icon && (
                <span className={cn(
                  "h-4 w-4 shrink-0",
                  isActive ? "text-[#137333] dark:text-emerald-400" : "text-zinc-400 dark:text-zinc-500"
                )}>
                  {tab.icon}
                </span>
              )}
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
