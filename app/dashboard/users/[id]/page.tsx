"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Activity,
  ShoppingBag,
  Stethoscope,
  CreditCard,
  Mail,
  Phone,
  User,
  Heart,
  Pill,
  Shield,
  Plus,
  Pencil,
  Crown
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { InfoRow } from "@/components/ui/info-row";
import { SelectDropdown } from "@/components/ui/select-dropdown";
import { figmaUsers } from "@/data/figmaUsers";
import { AddressItem, Address } from "@/components/ui/address-item";
import { OrderItem, Order } from "@/components/orders/order-item";
import { PaymentItem, Payment } from "@/components/payments/payment-item";
import { FamilyMemberItem, FamilyMember } from "@/components/family/family-member-item";
import { Modal } from "@/components/ui/modal";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params?.id as string;

  // Find user dynamically from figmaUsers seed records
  const user = React.useMemo(() => {
    return figmaUsers.find((u) => u.id === userId) || figmaUsers[0];
  }, [userId]);

  // Manage dynamic stats state
  const [isPrime, setIsPrime] = useState(user.isPrime);
  const [userStatus, setUserStatus] = useState(user.status);

  // Sync state if user records change
  React.useEffect(() => {
    setIsPrime(user.isPrime);
    setUserStatus(user.status);
  }, [user]);
  
  // Default active tab to "overview" so personal info shows first on load
  const [activeTab, setActiveTab] = useState("overview");

  // Mock addresses list state
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "addr-1",
      type: "Home",
      isDefault: true,
      line1: "Flat 301, Sunshine Apartments, MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400001",
      country: "India"
    },
    {
      id: "addr-2",
      type: "Home",
      isDefault: false,
      line1: "Flat 301, Sunshine Apartments, MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400001",
      country: "India"
    }
  ]);

  // Seed exact mock orders from the Figma screenshot
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ord-1",
      orderNumber: "1",
      status: "Delivered",
      productName: "Paracetamol 500mg",
      quantityDetails: "30 tablets",
      orderDate: "March 28, 2026",
      price: "250.00",
    },
    {
      id: "ord-2",
      orderNumber: "1",
      status: "Delivered",
      productName: "Paracetamol 500mg",
      quantityDetails: "30 capsules",
      orderDate: "March 28, 2026",
      price: "250.00",
    }
  ]);

  // Seed exact mock payments from the Figma screenshot
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "pay-1",
      title: "Consultation Fee",
      status: "Completed",
      details: "Paracetamol 500mg - 30 tablets",
      date: "March 28, 2026",
      previousAmount: "250.00",
      totalAmount: "150.00",
    },
    {
      id: "pay-2",
      title: "Lab Test",
      status: "Completed",
      details: "Paracetamol 500mg - 30 capsules",
      date: "March 28, 2026",
      previousAmount: "250.00",
      totalAmount: "80.00",
    }
  ]);

  // Seed exact mock family members from the Figma screenshot
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: "fam-1",
      name: "John Williams",
      relationship: "Son",
      phone: "+1 (555) 111-1112",
      dob: "3/20/1988",
    },
    {
      id: "fam-2",
      name: "John Williams",
      relationship: "Son",
      phone: "+1 (555) 111-1112",
      dob: "3/20/1988",
    }
  ]);

  // Add Member Modal State
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberRelationship, setMemberRelationship] = useState("Son");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberDob, setMemberDob] = useState("");

  // Handles adding a family member dynamically
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName) return;

    const newMember: FamilyMember = {
      id: String(Date.now()),
      name: memberName,
      relationship: memberRelationship,
      phone: memberPhone || "+1 (555) 000-0000",
      dob: memberDob || "1/1/2000",
    };

    setFamilyMembers([...familyMembers, newMember]);
    setMemberName("");
    setMemberRelationship("Son");
    setMemberPhone("");
    setMemberDob("");
    setShowAddMemberModal(false);
  };

  // Handles deleting an individual family member record
  const handleDeleteMember = (id: string) => {
    if (confirm("Are you sure you want to remove this family member?")) {
      setFamilyMembers(familyMembers.filter((m) => m.id !== id));
    }
  };

  // Handles updating an individual order status dynamically
  const handleOrderStatusChange = (id: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  // Handles deleting an individual order record
  const handleDeleteOrder = (id: string) => {
    if (confirm("Are you sure you want to delete this order record?")) {
      setOrders(orders.filter((o) => o.id !== id));
    }
  };

  // Handle address deletions
  const handleDeleteAddress = (id: string) => {
    if (confirm("Are you sure you want to remove this address item?")) {
      setAddresses(addresses.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. Back Navigation */}
      <div>
        <Link
          href="/dashboard/users"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-zinc-400 hover:text-zinc-700 transition-colors dark:text-zinc-500 dark:hover:text-zinc-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to User Management
        </Link>
      </div>

      {/* 2. User Profile Header (flat layout matching Figma) */}
      <div className="px-1">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {/* Initials avatar in soft green circle */}
            <Avatar name={user.name} size="lg" variant="softGreen" />

            <div className="space-y-1.5 leading-tight">
              <h2 className="text-[28px] font-semibold text-[#263238] dark:text-zinc-50 tracking-tight leading-tight">
                {user.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                {/* Status indicator */}
                <Badge
                  variant={userStatus === "Active" ? "success" : "neutral"}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-md border-none bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                >
                  {userStatus}
                </Badge>

                {/* Role and tier tags */}
                <Badge variant="neutral" className="text-[10px] font-bold px-2 py-0.5 rounded-md border-none bg-zinc-100 dark:bg-zinc-800">
                  {user.role}
                </Badge>
                <Badge variant="neutral" className="text-[10px] font-bold px-2 py-0.5 rounded-md border-none bg-zinc-100 dark:bg-zinc-800">
                  {user.type}
                </Badge>
                
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500">
                  ID: #{user.id}
                </span>
              </div>

              {/* Calendars metadata */}
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-zinc-400 mt-2 dark:text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {user.joinedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5" />
                  Last active {user.lastActiveDate}
                </span>
              </div>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
            {isPrime ? (
              <Badge variant="success" className="text-[11px] font-semibold py-1.5 px-3 rounded-lg border-emerald-200 bg-emerald-50 text-emerald-700 select-none">
                Prime Member Active
              </Badge>
            ) : (
              <button
                onClick={() => setIsPrime(true)}
                className="h-[32px] px-3.5 rounded-lg bg-gradient-to-r from-[#FE9A00] to-[#E17100] hover:opacity-90 active:scale-[0.98] text-white text-[12px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer border-none shadow-xs"
              >
                <Crown className="h-3.5 w-3.5 text-white shrink-0" />
                Upgrade to Prime
              </button>
            )}

            {/* Status Picker Selector */}
            <SelectDropdown
              value={userStatus}
              onChange={(val) => setUserStatus(val as "Active" | "Inactive")}
              options={[
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
              ]}
              variant="neutral"
              className="w-28 text-xs font-semibold shrink-0"
            />
          </div>
        </div>
      </div>

      {/* 3. Reusable Statistics metric cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Orders */}
        <Card className="rounded-xl border border-zinc-100 shadow-none dark:border-zinc-800">
          <CardContent className="flex items-center justify-between p-4.5">
            <div>
              <span className="block text-[14px] font-normal text-zinc-400 dark:text-zinc-500 tracking-wide uppercase mb-1">
                Total Orders
              </span>
              <h3 className="text-[32px] font-semibold text-[#263238] dark:text-zinc-50 mt-1 select-none leading-none">
                {orders.length}
              </h3>
            </div>
            <div className="h-8.5 w-8.5 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-950/20 dark:border-blue-900/50 dark:text-blue-400">
              <ShoppingBag className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Total Bookings */}
        <Card className="rounded-xl border border-zinc-100 shadow-none dark:border-zinc-800">
          <CardContent className="flex items-center justify-between p-4.5">
            <div>
              <span className="block text-[14px] font-normal text-zinc-400 dark:text-zinc-500 tracking-wide uppercase mb-1">
                Total Booking & Appointment
              </span>
              <h3 className="text-[32px] font-semibold text-[#72AC9C] mt-1 select-none leading-none">
                5
              </h3>
            </div>
            <div className="h-8.5 w-8.5 rounded-lg bg-[#72AC9C]/10 border border-[#72AC9C]/20 flex items-center justify-center text-[#72AC9C] shrink-0">
              <Stethoscope className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Total Family Members (Baseline adjusted dynamically + added members) */}
        <Card className="rounded-xl border border-zinc-100 shadow-none dark:border-zinc-800">
          <CardContent className="p-4.5">
            <span className="block text-[14px] font-normal text-zinc-400 dark:text-zinc-500 tracking-wide uppercase mb-1">
              Total Family Member
            </span>
            <h3 className="text-[32px] font-semibold text-[#72AC9C] mt-1 select-none leading-none">
              {10 + (familyMembers.length - 2)}
            </h3>
          </CardContent>
        </Card>

        {/* Card 4: Total Spent */}
        <Card className="rounded-xl border border-zinc-100 shadow-none dark:border-zinc-800">
          <CardContent className="flex items-center justify-between p-4.5">
            <div>
              <span className="block text-[14px] font-normal text-zinc-400 dark:text-zinc-500 tracking-wide uppercase mb-1">
                Total Spent
              </span>
              <h3 className="text-[32px] font-semibold text-[#101828] mt-1 select-none leading-none">
                ₹24500.00
              </h3>
            </div>
            <div className="h-8.5 w-8.5 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400">
              <CreditCard className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. Tab Navigation Section */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: "overview", label: "Overview", icon: <User className="h-4 w-4" /> },
          { id: "orders", label: "Orders & Bookings", icon: <ShoppingBag className="h-4 w-4" /> },
          { id: "payments", label: "Payments", icon: <CreditCard className="h-4 w-4" /> },
          { id: "family", label: "Family Members", icon: <Heart className="h-4 w-4" /> },
        ]}
      />

      {/* 5. Tab Content rendering */}
      
      {/* Overview Tab Content */}
      {activeTab === "overview" && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* A. Personal Information Card */}
          <Card className="rounded-xl border border-zinc-200/60 shadow-none bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4 dark:border-zinc-800">
              <h3 className="text-[20px] font-semibold text-[#263238] dark:text-zinc-50">
                Personal Information
              </h3>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 h-8 px-3 hover:border-zinc-300 dark:hover:border-zinc-700"
                onClick={() => alert("Personal Info Edit trigger")}
              >
                <Pencil className="h-3.5 w-3.5 text-zinc-400" />
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Edit</span>
              </Button>
            </div>

            <div className="space-y-1">
              <InfoRow
                label="Email"
                value={user.email}
                icon={<Mail className="h-4 w-4 text-[#72AC9C] shrink-0" />}
              />
              <InfoRow
                label="Phone"
                value={user.phone}
                icon={<Phone className="h-4 w-4 text-[#72AC9C] shrink-0" />}
              />
              <InfoRow
                label="Date of Birth"
                value="5/15/1990"
                icon={<Calendar className="h-4 w-4 text-[#72AC9C] shrink-0" />}
              />
              <InfoRow
                label="Gender"
                value="Female"
                icon={<User className="h-4 w-4 text-[#72AC9C] shrink-0" />}
              />
              <InfoRow
                label="Blood Group"
                value="O+"
                icon={<Heart className="h-4 w-4 text-[#72AC9C] shrink-0" />}
              />
            </div>
          </Card>

          {/* B. Address Management Card */}
          <Card className="rounded-xl border border-zinc-200/60 shadow-none bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4 dark:border-zinc-800">
              <h3 className="text-[20px] font-semibold text-[#263238] dark:text-zinc-50">
                Addresses
              </h3>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 h-8 px-3 hover:border-zinc-300 dark:hover:border-zinc-700"
                onClick={() => alert("Add Address trigger")}
              >
                <Plus className="h-3.5 w-3.5 text-zinc-400" />
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Add</span>
              </Button>
            </div>

            <div className="space-y-3">
              {addresses.map((address) => (
                <AddressItem
                  key={address.id}
                  address={address}
                  onDelete={handleDeleteAddress}
                  onEdit={(id) => alert(`Edit address trigger for ID: ${id}`)}
                />
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Orders & Bookings Tab Content */}
      {activeTab === "orders" && (
        <Card className="rounded-xl border border-zinc-200/60 shadow-none bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="border-b border-zinc-100 pb-3.5 mb-4 dark:border-zinc-800">
            <h3 className="text-[20px] font-semibold text-[#263238] dark:text-zinc-50">
              Order History
            </h3>
          </div>

          <div className="space-y-3.5">
            {orders.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-xs font-bold text-zinc-400">No order history available for Alice Williams.</p>
              </div>
            ) : (
              orders.map((order) => (
                <OrderItem
                  key={order.id}
                  order={order}
                  onStatusChange={handleOrderStatusChange}
                  onDelete={handleDeleteOrder}
                />
              ))
            )}
          </div>
        </Card>
      )}

      {/* Payments Tab Content */}
      {activeTab === "payments" && (
        <Card className="rounded-xl border border-zinc-200/60 shadow-none bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
          {/* Card Title matches Payment History card heading */}
          <div className="border-b border-zinc-100 pb-3.5 mb-4 dark:border-zinc-800">
            <h3 className="text-[20px] font-semibold text-[#263238] dark:text-zinc-50">
              Payment History
            </h3>
          </div>

          <div className="space-y-3.5">
            {payments.map((payment) => (
              <PaymentItem
                key={payment.id}
                payment={payment}
              />
            ))}
          </div>
        </Card>
      )}

      {/* Family Members Tab Content (Matches figma Family Members screenshot exactly!) */}
      {activeTab === "family" && (
        <Card className="rounded-xl border border-zinc-200/60 shadow-none bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
          {/* Header Card Title matches Family Members card heading */}
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3.5 mb-4 dark:border-zinc-800">
            <h3 className="text-[20px] font-semibold text-[#263238] dark:text-zinc-50">
              Family Members
            </h3>
            <Button
              onClick={() => setShowAddMemberModal(true)}
              className="flex items-center gap-1.5 bg-slate-900 text-white font-bold h-8.5 px-3.5 text-xs rounded-lg hover:bg-slate-800 transition-colors shrink-0"
            >
              <Plus className="h-4 w-4" />
              Add Member
            </Button>
          </div>

          <div className="space-y-3.5">
            {familyMembers.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-xs font-bold text-zinc-400">No family members registered.</p>
              </div>
            ) : (
              familyMembers.map((member) => (
                <FamilyMemberItem
                  key={member.id}
                  member={member}
                  onDelete={handleDeleteMember}
                  onEdit={(id) => alert(`Edit family member ID: ${id}`)}
                />
              ))
            )}
          </div>
        </Card>
      )}

      {/* 6. ADD MEMBER MODAL FORM OVERLAY */}
      <Modal
        isOpen={showAddMemberModal}
        onClose={() => setShowAddMemberModal(false)}
        title="Add Family Member"
      >
        <form onSubmit={handleAddMember} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. John Williams"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                className="w-full h-9.5 px-3 text-xs bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-hidden dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1">
                  Relationship
                </label>
                <SelectDropdown
                  value={memberRelationship}
                  onChange={setMemberRelationship}
                  variant="neutral"
                  options={[
                    { value: "Son", label: "Son" },
                    { value: "Daughter", label: "Daughter" },
                    { value: "Spouse", label: "Spouse" },
                    { value: "Parent", label: "Parent" },
                    { value: "Sibling", label: "Sibling" },
                  ]}
                  className="text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1">
                  Date of Birth
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3/20/1988"
                  value={memberDob}
                  onChange={(e) => setMemberDob(e.target.value)}
                  className="w-full h-9.5 px-3 text-xs bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-hidden dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="e.g. +1 (555) 111-1112"
                value={memberPhone}
                onChange={(e) => setMemberPhone(e.target.value)}
                className="w-full h-9.5 px-3 text-xs bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-hidden dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 font-medium"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-3.5 border-t border-zinc-100 dark:border-zinc-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddMemberModal(false)}
              className="h-9 px-4 text-xs font-bold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="h-9 px-5 text-xs font-bold bg-slate-900"
            >
              Add Member
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
