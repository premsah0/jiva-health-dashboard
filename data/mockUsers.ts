import { User, DashboardStats } from "@/types";

/**
 * Clean mock data representing users.
 */
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: "Admin",
    status: "Active",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    createdAt: "2025-01-10",
    lastActive: "2026-05-26 14:35",
    bio: "Lead Developer with 8 years of experience, passionate about system design and TypeScript."
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    role: "Editor",
    status: "Active",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    createdAt: "2025-02-15",
    lastActive: "2026-05-27 09:12",
    bio: "Content Strategist and Technical Writer. Enjoys translating complex technical topics."
  },
  {
    id: "3",
    name: "Marcus Vance",
    email: "marcus.vance@example.com",
    role: "Viewer",
    status: "Pending",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    createdAt: "2026-05-01",
    lastActive: "Never",
    bio: "Product analyst reviewing database logs and interface metrics."
  },
  {
    id: "4",
    name: "Emily Watson",
    email: "emily.watson@example.com",
    role: "User",
    status: "Active",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    createdAt: "2025-06-20",
    lastActive: "2026-05-25 18:45",
    bio: "UX Designer exploring responsive layout concepts and Tailwind integrations."
  },
  {
    id: "5",
    name: "David Kim",
    email: "david.kim@example.com",
    role: "Viewer",
    status: "Inactive",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    createdAt: "2025-09-05",
    lastActive: "2026-04-10 11:20",
    bio: "External consultant reviewing operational workflows."
  }
];

/**
 * Calculated mock dashboard statistics.
 */
export const mockStats: DashboardStats = {
  totalUsers: mockUsers.length,
  activeUsers: mockUsers.filter(u => u.status === "Active").length,
  pendingUsers: mockUsers.filter(u => u.status === "Pending").length,
  inactiveUsers: mockUsers.filter(u => u.status === "Inactive").length,
  growthRate: "+15.4%"
};
