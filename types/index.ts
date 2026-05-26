import { LucideIcon } from "lucide-react";

/**
 * Represents a user in the system.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer" | "User";
  status: "Active" | "Inactive" | "Pending";
  avatarUrl?: string;
  createdAt: string;
  lastActive: string;
  bio?: string;
}

/**
 * Represents a single item in the sidebar navigation.
 */
export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/**
 * Represents core metrics displayed on the dashboard home.
 */
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  pendingUsers: number;
  inactiveUsers: number;
  growthRate: string; // e.g. "+12%"
}
