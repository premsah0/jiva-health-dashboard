import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes conditionally, resolving conflicts efficiently.
 * Useful for building reusable, customizable UI components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
