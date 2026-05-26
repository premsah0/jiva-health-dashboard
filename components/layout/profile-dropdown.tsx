"use client";

import * as React from "react";
import Link from "next/link";
import { User, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

/**
 * Reusable dropdown selector aligned for the Navbar admin initials triggers.
 * Automatically hooks up click-outside listeners to close itself.
 */
export function ProfileDropdown({ isOpen, onClose, className }: ProfileDropdownProps) {
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside its boundaries or pressing ESC
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    { label: "Profile", href: "/dashboard/users/1", icon: User },
    { label: "Dashboard", href: "/dashboard/users", icon: LayoutDashboard },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "absolute right-0 top-11 z-50 w-48 rounded-xl border border-zinc-200/80 bg-white p-1.5 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 animate-scaleUp",
        className
      )}
    >
      <div className="space-y-0.5">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors"
          >
            <item.icon className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            <span>{item.label}</span>
          </Link>
        ))}

        <hr className="my-1 border-zinc-100 dark:border-zinc-800" />

        <button
          type="button"
          onClick={() => {
            alert("Logging out JivaHealth environment...");
            onClose();
          }}
          className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50/50 dark:text-red-400 dark:hover:bg-red-950/20 transition-colors text-left"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
