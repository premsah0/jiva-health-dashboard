"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building,
  Users,
  Layers,
  Stethoscope,
  FileSpreadsheet,
  Pill,
  Truck,
  UsersRound,
  FileText,
  ShieldCheck,
  Settings,
  X,
  ChevronDown
} from "lucide-react";
import { useDashboardStore } from "@/store/useDashboardStore";
import { cn } from "@/lib/utils";

// Sidebar navigation modules
const navItems = [
  { label: "Dashboard", href: "/dashboard/overview", icon: LayoutDashboard },
  { label: "Organization", href: "/dashboard/organization", icon: Building },
  { label: "User Management", href: "/dashboard/users", icon: Users },
  { label: "Services", href: "/dashboard/services", icon: Layers, hasDropdown: true },
  { label: "Consultation", href: "/dashboard/consultation", icon: Stethoscope },
  { label: "Lab test Booking", href: "/dashboard/lab-tests", icon: FileSpreadsheet },
  { label: "Medicine Orders", href: "/dashboard/medicine-orders", icon: Pill },
  { label: "Ambulance booking", href: "/dashboard/ambulance", icon: Truck },
  { label: "Vendor & Partners", href: "/dashboard/vendors", icon: UsersRound },
  { label: "Report", href: "/dashboard/reports", icon: FileText },
  { label: "User Access", href: "/dashboard/access", icon: ShieldCheck },
  { label: "Setting", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, setSidebarOpen } = useDashboardStore();

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation Shell */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col border-r border-zinc-100 bg-white transition-transform duration-300 ease-in-out dark:border-zinc-800 dark:bg-zinc-950 lg:static lg:translate-x-0 shrink-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Area */}
        <div className="flex h-16 items-center border-b border-zinc-200 dark:border-zinc-800 px-[20px]">
          <Link
            href="/dashboard/users"
            className="flex items-center justify-center w-full"
            onClick={() => setSidebarOpen(false)}
          >
            <img
              src="/jiva-logo.png"
              alt="Jiva Health Logo"
              className="
        w-[105px]
        h-[72px]
        object-contain
        scale-[1.2]
        select-none
      "
            />
          </Link>

          {/* Close Sidebar Trigger (Mobile View) */}
          <button
            type="button"
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modules Scroll Area */}
        <nav className="flex-1 space-y-0.5 px-3 py-3 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href) || (item.label === "User Management" && pathname === "/dashboard/users");

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-[14px] font-medium transition-all duration-150",
                  isActive
                    ? "bg-[#e6f4ea] text-[#137333] dark:bg-emerald-950/30 dark:text-emerald-400"
                    : "text-[#263238] hover:bg-zinc-50 hover:text-[#263238] dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0",
                      isActive ? "text-[#137333] dark:text-emerald-400" : "text-zinc-400 dark:text-zinc-500"
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {item.hasDropdown && (
                  <ChevronDown className="h-3 w-3 text-zinc-400 dark:text-zinc-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Profile Details Section */}
        <div className="border-t border-zinc-100 p-3 dark:border-zinc-800">
          <div className="flex items-center gap-2.5 rounded-lg p-2 bg-zinc-50/60 border border-zinc-100 dark:bg-zinc-900/30 dark:border-zinc-800">
            <div className="h-8 w-8 rounded-full bg-[#137333] flex items-center justify-center text-white font-bold text-[10px] shrink-0 select-none">
              AD
            </div>
            <div className="overflow-hidden leading-tight">
              <p className="text-[12px] font-semibold text-[#263238] dark:text-zinc-50 truncate">Admin User</p>
              <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 truncate">admin@healthcare.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
