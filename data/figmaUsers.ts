export interface FigmaUser {
  id: string;
  name: string;
  role: "Patient" | "Nurse" | "Doctor" | "Admin";
  status: "Active" | "Inactive";
  type: "Normal User" | "Support Staff" | "Prime User";
  email: string;
  phone: string;
  joinedDate: string;
  lastActiveDate: string;
  appointmentsCount: number;
  isPrime: boolean;
}

export interface FigmaStats {
  totalUser: number;
  primeUser: number;
  nonPrimeUser: number;
  totalFamilyMembers: number;
}

/**
 * Exact mock user records matching the Figma design screenshot.
 */
export const figmaUsers: FigmaUser[] = [
  {
    id: "1",
    name: "Eva Lopez",
    role: "Patient",
    status: "Active",
    type: "Normal User",
    email: "eva.lopez@email.com",
    phone: "+1 (555) 555-5555",
    joinedDate: "2025-07-18",
    lastActiveDate: "2026-03-21",
    appointmentsCount: 8,
    isPrime: false,
  },
  {
    id: "2",
    name: "Cecilia Smith",
    role: "Patient",
    status: "Inactive",
    type: "Normal User",
    email: "cecilia.smith@email.com",
    phone: "+1 (555) 333-3333",
    joinedDate: "2024-05-22",
    lastActiveDate: "2025-12-30",
    appointmentsCount: 5,
    isPrime: false,
  },
  {
    id: "3",
    name: "David Kim",
    role: "Nurse",
    status: "Active",
    type: "Support Staff",
    email: "david.kim@hospital.org",
    phone: "+1 (555) 444-4444",
    joinedDate: "2022-11-03",
    lastActiveDate: "2026-03-22",
    appointmentsCount: 30,
    isPrime: false,
  },
  {
    id: "4",
    name: "Marcus Vance",
    role: "Doctor",
    status: "Active",
    type: "Prime User",
    email: "marcus.vance@jivahealth.com",
    phone: "+1 (555) 123-4567",
    joinedDate: "2025-01-10",
    lastActiveDate: "2026-05-26",
    appointmentsCount: 12,
    isPrime: true,
  },
  {
    id: "5",
    name: "Sarah Chen",
    role: "Patient",
    status: "Active",
    type: "Prime User",
    email: "sarah.chen@example.com",
    phone: "+1 (555) 987-6543",
    joinedDate: "2025-03-12",
    lastActiveDate: "2026-05-27",
    appointmentsCount: 15,
    isPrime: true,
  },
  {
    id: "6",
    name: "Liam Sterling",
    role: "Admin",
    status: "Active",
    type: "Prime User",
    email: "liam.sterling@healthcare.com",
    phone: "+1 (555) 246-8101",
    joinedDate: "2023-06-15",
    lastActiveDate: "2026-05-27",
    appointmentsCount: 2,
    isPrime: true,
  }
];

/**
 * Exact mock statistics values shown on the Figma dashboard cards.
 */
export const figmaStats: FigmaStats = {
  totalUser: 6,
  primeUser: 5,
  nonPrimeUser: 10,
  totalFamilyMembers: 49,
};
