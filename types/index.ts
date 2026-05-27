import { LucideIcon } from "lucide-react";

/**
 * Represents a user/patient in the system.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: "Patient" | "Nurse" | "Doctor" | "Admin";
  status: "Active" | "Inactive";
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
 * Represents core patient metrics displayed on the user management page.
 */
export interface PatientStats {
  totalUsers: number;
  primeUsers: number;
  nonPrimeUsers: number;
  totalFamilyMembers: number;
}

