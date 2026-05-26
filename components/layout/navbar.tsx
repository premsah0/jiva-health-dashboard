"use client";

import { Menu, Bell, Moon, Sun, Search, SidebarOpen } from "lucide-react";
import { useState } from "react";
import { useDashboardStore } from "@/store/useDashboardStore";
import { Input } from "@/components/ui/input";
import { ProfileDropdown } from "@/components/layout/profile-dropdown";

export function Navbar() {
  const { toggleSidebar, theme, toggleTheme, searchQuery, setSearchQuery, isHydrated } = useDashboardStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-950">
      {/* Left side: Sidebar Toggle & Menu Indicator */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 focus:outline-hidden dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5 lg:hidden" />
          <SidebarOpen className="h-4.5 w-4.5 hidden lg:block text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300" />
        </button>
      </div>

      {/* Center: Search input perfectly centered (aligned with Figma design) */}
      <div className="flex-1 max-w-[388px] mx-auto w-full">
      <div className="relative flex items-center w-full h-[35px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <div className="absolute left-3 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search patient, doctor, or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full pl-9 pr-3 bg-transparent text-[14px] font-medium text-[#263238] dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 placeholder:font-normal placeholder:text-[13px] focus:outline-hidden rounded-lg transition-all"
          />
        </div>
      </div>

      {/* Right side: Actions & Circular Admin initials */}
      <div className="flex items-center gap-3.5">
        {/* Dark mode moon/sun icon trigger */}
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 transition-colors"
          aria-label="Toggle Theme"
        >
          {!isHydrated ? (
            <div className="h-4.5 w-4.5" />
          ) : theme === "dark" ? (
            <Sun className="h-4.5 w-4.5 text-amber-400 hover:text-amber-500 transition-transform hover:rotate-45" />
          ) : (
            <Moon className="h-4.5 w-4.5 text-zinc-400 hover:text-zinc-600 transition-transform hover:-rotate-12" />
          )}
        </button>

        {/* Notifications bell icon with a red circle badge "1" */}
        <button
          type="button"
          className="relative rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 transition-colors"
          aria-label="Open notifications"
        >
          <Bell className="h-4.5 w-4.5 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500" />
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white leading-none shadow-xs border border-white">
            1
          </span>
        </button>

        {/* User initials circle (matches Figma rightmost avatar circle) with active Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="h-8.5 w-8.5 rounded-full bg-[#137333] flex items-center justify-center text-white font-extrabold text-xs select-none shadow-xs cursor-pointer hover:opacity-90 active:scale-95 transition-all focus:outline-hidden"
          >
            AD
          </button>
          <ProfileDropdown isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
        </div>
      </div>
    </header>
  );
}
