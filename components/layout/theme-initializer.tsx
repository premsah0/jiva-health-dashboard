"use client";

import { useEffect } from "react";
import { useDashboardStore } from "@/store/useDashboardStore";

/**
 * Initializes and persists the dark/light mode selection on mount.
 * Prevents Next.js Server-Side Rendering mismatch warnings by executing entirely on the client.
 */
export function ThemeInitializer() {
  const setTheme = useDashboardStore((state) => state.setTheme);
  const setHydrated = useDashboardStore((state) => state.setHydrated);

  useEffect(() => {
    // 1. Detect saved theme first
    const cached = localStorage.getItem("theme") as "light" | "dark" | null;
    
    // 2. Fallback to system preference
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    
    // 3. Fallback priority
    const activeTheme = cached || system;
    
    // 4. Apply class directly to document.documentElement
    const root = document.documentElement;
    if (activeTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // 5. Update store and set hydration state to true
    setTheme(activeTheme);
    setHydrated(true);
  }, [setTheme, setHydrated]);

  return null;
}
