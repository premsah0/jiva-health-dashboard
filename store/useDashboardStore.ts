import { create } from "zustand";
import { User } from "@/types";
import { mockUsers } from "@/data/mockUsers";

interface DashboardState {
  // Sidebar state
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;

  // Theme state
  theme: "light" | "dark";
  isHydrated: boolean;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
  setHydrated: (isHydrated: boolean) => void;

  // Users state
  users: User[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addUser: (user: Omit<User, "id" | "createdAt" | "lastActive">) => void;
  deleteUser: (id: string) => void;
}

/**
 * Zustand global store for state management.
 * Designed to be highly readable and easy for beginners.
 */
export const useDashboardStore = create<DashboardState>((set) => ({
  // Sidebar initialization
  isSidebarOpen: false, // Default closed on mobile, handled by CSS on desktop
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  // Theme initialization & mutations
  theme: "light",
  isHydrated: false,
  toggleTheme: () => set((state) => {
    const nextTheme = state.theme === "light" ? "dark" : "light";
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", nextTheme);
      const root = document.documentElement;
      if (nextTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
    return { theme: nextTheme };
  }),
  setTheme: (newTheme) => set(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      const root = document.documentElement;
      if (newTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
    return { theme: newTheme };
  }),
  setHydrated: (isHydrated) => set({ isHydrated }),

  // Users data initialization
  users: mockUsers,
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),

  addUser: (newUserData) =>
    set((state) => {
      const newUser: User = {
        ...newUserData,
        id: String(state.users.length + 1),
        createdAt: new Date().toISOString().split("T")[0],
        lastActive: "Just now",
      };
      return { users: [...state.users, newUser] };
    }),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
}));
