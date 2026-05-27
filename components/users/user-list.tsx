"use client";

import React, { useState } from "react";
import { Search, Filter, Plus, Users, UserCheck, UserPlus, HelpCircle } from "lucide-react";
import { figmaUsers, figmaStats, FigmaUser } from "@/data/figmaUsers";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserCard } from "@/components/users/user-card";
import { AddUserModal } from "@/components/users/add-user-modal";
import { FigmaFilterDropdown } from "@/components/ui/figma-filter-dropdown";
import { useRouter } from "next/navigation";
import { useDashboardStore } from "@/store/useDashboardStore";

export function UserList() {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    genderAgeFilter,
    setGenderAgeFilter,
    resetFilters,
  } = useDashboardStore();

  const [users, setUsers] = useState<FigmaUser[]>(figmaUsers);

  // Track active open dropdown: "genderAge" | "status" | null
  const [openDropdown, setOpenDropdown] = useState<"genderAge" | "status" | null>(null);

  // Dialog Modals State
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<FigmaUser | null>(null);

  // Form Fields State (New User / Editing)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<FigmaUser["role"]>("Patient");
  const [status, setStatus] = useState<FigmaUser["status"]>("Active");
  const [type, setType] = useState<FigmaUser["type"]>("Normal User");
  const [appointmentsCount, setAppointmentsCount] = useState(0);

  // Calculate live statistics dynamically
  const liveTotal = users.length;
  const livePrime = users.filter((u) => u.isPrime).length;
  const liveNonPrime = users.filter((u) => !u.isPrime).length;

  // Handles adding a user
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser: FigmaUser = {
      id: String(Date.now()),
      name,
      email,
      phone: phone || "+1 (555) 000-0000",
      role,
      status,
      type,
      joinedDate: new Date().toISOString().split("T")[0],
      lastActiveDate: new Date().toISOString().split("T")[0],
      appointmentsCount: appointmentsCount || 0,
      isPrime: type === "Prime User",
    };

    setUsers([newUser, ...users]);
    resetForm();
    setShowAddModal(false);
  };

  const handleAddUserFromModal = (userData: {
    name: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    bloodGroup: string;
    areaDetail: string;
    pinCode: string;
    city: string;
    state: string;
    country: string;
  }) => {
    let age = 30; // default fallback
    if (userData.dob) {
      const birthDate = new Date(userData.dob);
      if (!isNaN(birthDate.getTime())) {
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          calculatedAge--;
        }
        age = calculatedAge;
      }
    }

    const newUser: FigmaUser = {
      id: String(Date.now()),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || "+91 98765 43210",
      role: "Patient",
      status: "Active",
      type: "Normal User",
      joinedDate: new Date().toISOString().split("T")[0],
      lastActiveDate: new Date().toISOString().split("T")[0],
      appointmentsCount: 0,
      isPrime: false,
      gender: userData.gender as "Male" | "Female" | "Other",
      age: age,
    };

    setUsers([newUser, ...users]);
    setShowAddModal(false);
  };

  // Handles updating/editing a user
  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const updated = users.map((u) =>
      u.id === editingUser.id
        ? {
          ...u,
          name,
          email,
          phone,
          role,
          status,
          type,
          appointmentsCount,
          isPrime: type === "Prime User",
        }
        : u
    );

    setUsers(updated);
    resetForm();
    setEditingUser(null);
  };

  // Upgrades a user directly to Prime
  const handleUpgrade = (id: string) => {
    const updated = users.map((u) =>
      u.id === id ? { ...u, isPrime: true, type: "Prime User" as const } : u
    );
    setUsers(updated);
  };

  // Deletes a user record
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user record?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setRole("Patient");
    setStatus("Active");
    setType("Normal User");
    setAppointmentsCount(0);
  };

  // Populate form fields for editing
  const startEdit = (user: FigmaUser) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setRole(user.role);
    setStatus(user.status);
    setType(user.type);
    setAppointmentsCount(user.appointmentsCount);
  };

  // Filtering Logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      user.status.toLowerCase() === statusFilter.toLowerCase();

    let matchesGenderAge = true;
    if (genderAgeFilter !== "all") {
      if (genderAgeFilter === "Male") {
        matchesGenderAge = user.gender === "Male";
      } else if (genderAgeFilter === "Female") {
        matchesGenderAge = user.gender === "Female";
      } else if (genderAgeFilter === "13–17 years") {
        matchesGenderAge = !!user.age && user.age >= 13 && user.age <= 17;
      } else if (genderAgeFilter === "18–35 years") {
        matchesGenderAge = !!user.age && user.age >= 18 && user.age <= 35;
      } else if (genderAgeFilter === "36–59 years") {
        matchesGenderAge = !!user.age && user.age >= 36 && user.age <= 59;
      } else if (genderAgeFilter === "60+ years") {
        matchesGenderAge = !!user.age && user.age >= 60;
      }
    }

    return matchesSearch && matchesStatus && matchesGenderAge;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header (Title, Subtitle, and Add User Button) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-2">
        <div className="leading-tight">
          <h1 className="text-[24px] font-semibold tracking-tight text-[#263238] dark:text-zinc-50">
            User Management
          </h1>
          <p className="text-[12px] font-normal text-zinc-400 dark:text-zinc-500 mt-1">
            Manage user accounts and permissions
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-900 text-white font-medium h-[33px] px-4 text-sm rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* 2. Reusable Statistics Cards Section (Figma Exact Metrics) */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total User */}
        <Card className="rounded-xl border border-zinc-100 shadow-none dark:border-zinc-800">
          <CardContent className="p-4">
            <span className="block text-[12px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wide uppercase mb-1">
              Total User
            </span>
            <h3 className="text-[28px] font-semibold text-[#263238] dark:text-zinc-50 mt-1 select-none leading-none">
              {liveTotal}
            </h3>
          </CardContent>
        </Card>

        {/* Card 2: Prime User (Green values) */}
        <Card className="rounded-xl border border-zinc-100 shadow-none dark:border-zinc-800">
          <CardContent className="p-4">
            <span className="block text-[12px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wide uppercase mb-1">
              Prime User
            </span>
            <h3 className="text-[28px] font-semibold text-[#72AC9C] mt-1 select-none leading-none">
              {figmaStats.primeUser + (livePrime - 3)} {/* Baseline adjusted for live upgrades */}
            </h3>
          </CardContent>
        </Card>

        {/* Card 3: Non-Prime User (Green values) */}
        <Card className="rounded-xl border border-zinc-100 shadow-none dark:border-zinc-800">
          <CardContent className="p-4">
            <span className="block text-[12px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wide uppercase mb-1">
              Non-Prime User
            </span>
            <h3 className="text-[28px] font-semibold text-[#72AC9C] mt-1 select-none leading-none">
              {figmaStats.nonPrimeUser + (liveNonPrime - 3)}
            </h3>
          </CardContent>
        </Card>

        {/* Card 4: Total Family Members (Green values) */}
        <Card className="rounded-xl border border-zinc-100 shadow-none dark:border-zinc-800">
          <CardContent className="p-4">
            <span className="block text-[12px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wide uppercase mb-1">
              Total Family members
            </span>
            <h3 className="text-[28px] font-semibold text-[#72AC9C] mt-1 select-none leading-none">
              {figmaStats.totalFamilyMembers}
            </h3>
          </CardContent>
        </Card>
      </div>

      {/* 3. Filter Section (Exact layout alignment) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Large keyword search input */}
        <div className="flex-1">
          <Input
            leftIcon={<Search className="h-4.5 w-4.5" />}
            placeholder="Search by patient, doctor, or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 text-xs placeholder:text-zinc-400 border-zinc-200"
          />
        </div>

        {/* Dropdown 1: Gender + Age Filter */}
        <FigmaFilterDropdown
          options={[
            { value: "all", label: "All Status" },
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "13–17 years", label: "13–17 years" },
            { value: "18–35 years", label: "18–35 years" },
            { value: "36–59 years", label: "36–59 years" },
            { value: "60+ years", label: "60+ years" },
          ]}
          value={genderAgeFilter}
          onChange={setGenderAgeFilter}
          placeholder="All Status"
          isOpen={openDropdown === "genderAge"}
          onToggle={() => setOpenDropdown(openDropdown === "genderAge" ? null : "genderAge")}
          onClose={() => setOpenDropdown(null)}
        />

        {/* Dropdown 2: Status Filter */}
        <FigmaFilterDropdown
          options={[
            { value: "all", label: "All Status" },
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
          value={statusFilter}
          onChange={setStatusFilter}
          placeholder="All Status"
          isOpen={openDropdown === "status"}
          onToggle={() => setOpenDropdown(openDropdown === "status" ? null : "status")}
          onClose={() => setOpenDropdown(null)}
        />
      </div>

      {/* 4. User List Directory display */}
      <div className="space-y-3.5">
        {filteredUsers.length === 0 ? (
          <Card className="text-center p-12 shadow-none border-zinc-200">
            <CardContent className="flex flex-col items-center justify-center gap-3">
              <p className="text-sm font-semibold text-zinc-400">
                No matching user records exist in JivaHealth cache.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="text-xs h-8 cursor-pointer"
              >
                Reset Filter Queries
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onUpgrade={handleUpgrade}
              onView={(id) => router.push(`/dashboard/users/${id}`)}
              onEdit={(id) => {
                const u = users.find((x) => x.id === id);
                if (u) startEdit(u);
              }}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* 5. ADD USER MODAL (Figma high-fidelity implementation) */}
      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddUserFromModal}
      />

      {/* 6. EDIT USER MODAL (Clean slide-open layout card overlay) */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 p-4 backdrop-blur-xs">
          <Card className="w-full max-w-lg shadow-xl border-zinc-200 dark:border-zinc-800 bg-white">
            <CardHeader className="flex flex-row justify-between items-start">
              <div>
                <CardTitle>Edit User Profile</CardTitle>
                <CardDescription>Modify settings for this member profile.</CardDescription>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-800"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEditUser} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-9.5 px-3 text-xs bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-hidden dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-9.5 px-3 text-xs bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-hidden dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-9.5 px-3 text-xs bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-hidden dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1">
                        System Role
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as FigmaUser["role"])}
                        className="w-full h-9.5 px-2 text-xs bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-hidden dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 font-medium"
                      >
                        <option value="Patient">Patient</option>
                        <option value="Nurse">Nurse</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1">
                        Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as FigmaUser["status"])}
                        className="w-full h-9.5 px-2 text-xs bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-hidden dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 font-medium"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1">
                      User Type / Tier
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as FigmaUser["type"])}
                      className="w-full h-9.5 px-2 text-xs bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-hidden dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 font-medium"
                    >
                      <option value="Normal User">Normal User</option>
                      <option value="Support Staff">Support Staff</option>
                      <option value="Prime User">Prime User</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1">
                      Appointments
                    </label>
                    <input
                      type="number"
                      value={appointmentsCount}
                      onChange={(e) => setAppointmentsCount(Number(e.target.value))}
                      className="w-full h-9.5 px-3 text-xs bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-hidden dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 font-medium"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <Button variant="outline" size="sm" onClick={() => setEditingUser(null)} className="h-9 px-4 text-xs font-bold">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="h-9 px-5 text-xs font-bold bg-slate-900">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
