import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable wrapper for form inputs.
 * Binds accessible labels, required indicator stars, and validation error messages.
 */
export function FormField({ label, required = false, error, children, className }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full text-left", className)}>
      <label className="flex items-center gap-0.5 text-xs font-bold text-zinc-700 dark:text-zinc-300">
        <span>{label}</span>
        {required && <span className="text-red-500 font-extrabold">*</span>}
      </label>
      
      <div className="relative flex flex-col">
        {children}
      </div>

      {error && (
        <span className="text-[10px] font-bold text-red-500 leading-none mt-0.5 animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
}
