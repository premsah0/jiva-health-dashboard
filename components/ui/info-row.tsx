import * as React from "react";
import { cn } from "@/lib/utils";

export interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Reusable layout row for key-value pair metadata.
 * Features left-aligned Lucide icons and distinct muted label/strong value typography.
 */
export function InfoRow({ label, value, icon, className }: InfoRowProps) {
  return (
    <div className={cn("flex items-center gap-2.5 py-1.5 text-[13px] leading-none", className)}>
      {icon && (
        <span className="text-[#72AC9C] dark:text-[#72AC9C] shrink-0 h-4.5 w-4.5 flex items-center justify-center">
          {icon}
        </span>
      )}
      <div className="flex flex-wrap items-center gap-1">
        <span className="text-[#72AC9C] font-medium dark:text-[#72AC9C]">{label}:</span>
        <span className="font-semibold text-[#263238] dark:text-zinc-200">{value}</span>
      </div>
    </div>
  );
}
