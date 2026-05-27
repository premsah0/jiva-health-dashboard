import { User, PatientStats } from "@/types";

/**
 * Clean mock data representing patients and healthcare staff.
 */
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: "Patient",
    status: "Active",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    createdAt: "2025-01-10",
    lastActive: "2026-05-26 14:35",
    bio: "Regular patient, scheduled for quarterly check-ups."
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    role: "Doctor",
    status: "Active",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    createdAt: "2025-02-15",
    lastActive: "2026-05-27 09:12",
    bio: "General Practitioner with expertise in internal medicine."
  },
  {
    id: "3",
    name: "Marcus Vance",
    email: "marcus.vance@example.com",
    role: "Doctor",
    status: "Active",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    createdAt: "2026-05-01",
    lastActive: "2026-05-27",
    bio: "Senior cardiologist reviewing patient diagnostics."
  },
  {
    id: "4",
    name: "Emily Watson",
    email: "emily.watson@example.com",
    role: "Nurse",
    status: "Active",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    createdAt: "2025-06-20",
    lastActive: "2026-05-25 18:45",
    bio: "Registered nurse assisting with outpatient consultations."
  },
  {
    id: "5",
    name: "David Kim",
    email: "david.kim@example.com",
    role: "Patient",
    status: "Inactive",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    createdAt: "2025-09-05",
    lastActive: "2026-04-10 11:20",
    bio: "Former patient, relocated to another city."
  }
];

/**
 * Calculated mock patient statistics.
 */
export const mockStats: PatientStats = {
  totalUsers: mockUsers.length,
  primeUsers: 2,
  nonPrimeUsers: 3,
  totalFamilyMembers: 12,
};
