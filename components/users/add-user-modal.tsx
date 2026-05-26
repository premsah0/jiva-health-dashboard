"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectDropdown } from "@/components/ui/select-dropdown";
import { Button } from "@/components/ui/button";

export interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (userData: {
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
  }) => void;
}

export function AddUserModal({ isOpen, onClose, onAdd }: AddUserModalProps) {
  // Form Controlled State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [areaDetail, setAreaDetail] = useState("");
  
  // Pre-seed matching Figma screenshot
  const [pinCode, setPinCode] = useState("400001");
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("");
  const [country] = useState("India"); // Static read-only

  // Error validations state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form settings
  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDob("");
    setGender("");
    setBloodGroup("");
    setAreaDetail("");
    setPinCode("400001");
    setCity("Mumbai");
    setState("");
    setErrors({});
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  // Form validations & submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // 1. Required Full Name
    if (!name.trim()) {
      newErrors.name = "Full Name is required";
    }

    // 2. Required Email + email format validation
    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email format";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Dynamic submit callback
    onAdd({
      name,
      email,
      phone: phone || "+91 98765 43210", // Fallback to figma mockup value
      dob,
      gender: gender || "Not Specified",
      bloodGroup: bloodGroup || "Not Specified",
      areaDetail,
      pinCode,
      city,
      state: state || "Not Specified",
      country,
    });

    handleClose();
  };

  // Dropdown list options
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
  ];

  const stateOptions = [
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Delhi", label: "Delhi" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New User"
      className="max-w-[510.4px] w-full"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subtitle inline with header */}
        <p className="-mt-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 leading-normal block">
          Create a new user account with role and permissions
        </p>

        {/* 2-Column Responsive Form Fields */}
        <div className="grid gap-3.5 sm:grid-cols-2">
          {/* 1. Full Name */}
          <FormField label="Full Name" required error={errors.name}>
            <Input
              placeholder="e.g., John Smith"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              className="h-9.5 text-xs placeholder:text-zinc-400 border-zinc-200"
            />
          </FormField>

          {/* 2. Email */}
          <FormField label="Email" required error={errors.email}>
            <Input
              placeholder="john.smith@email.com"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              className="h-9.5 text-xs placeholder:text-zinc-400 border-zinc-200"
            />
          </FormField>

          {/* 3. Phone Number */}
          <FormField label="Phone Number">
            <Input
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-9.5 text-xs placeholder:text-zinc-400 border-zinc-200"
            />
          </FormField>

          {/* 4. Date of Birth */}
          <FormField label="Date of Birth">
            <Input
              type="text"
              placeholder="YYYY-MM-DD"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="h-9.5 text-xs placeholder:text-zinc-400 border-zinc-200"
            />
          </FormField>

          {/* 5. Gender custom dropdown */}
          <FormField label="Gender">
            <SelectDropdown
              options={genderOptions}
              value={gender}
              onChange={setGender}
              placeholder="Select gender"
              className="text-xs"
            />
          </FormField>

          {/* 6. Blood Group custom dropdown */}
          <FormField label="Blood Group">
            <SelectDropdown
              options={bloodGroupOptions}
              value={bloodGroup}
              onChange={setBloodGroup}
              placeholder="Select blood group"
              className="text-xs"
            />
          </FormField>

          {/* 7. Area Detail (Spans both columns) */}
          <FormField label="Area Detail" className="sm:col-span-2">
            <Textarea
              placeholder="House/Flat No., Building Name, Street"
              rows={2}
              value={areaDetail}
              onChange={(e) => setAreaDetail(e.target.value)}
              className="text-xs placeholder:text-zinc-400 border-zinc-200"
            />
          </FormField>

          {/* 8. Pin Code */}
          <FormField label="Pin Code">
            <Input
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="h-9.5 text-xs border-zinc-200"
            />
          </FormField>

          {/* 9. City */}
          <FormField label="City">
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="h-9.5 text-xs border-zinc-200"
            />
          </FormField>

          {/* 10. State custom dropdown */}
          <FormField label="State">
            <SelectDropdown
              options={stateOptions}
              value={state}
              onChange={setState}
              placeholder="Select state"
              className="text-xs"
            />
          </FormField>

          {/* 11. Country (Disabled read-only) */}
          <FormField label="Country">
            <Input
              value={country}
              disabled
              className="h-9.5 text-xs border-zinc-200 bg-zinc-50/50 cursor-not-allowed dark:bg-zinc-800 opacity-80"
            />
          </FormField>
        </div>

        {/* Action Buttons (Figma spacing bottom right) */}
        <div className="flex gap-2.5 justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClose}
            className="h-9 px-5 text-xs font-bold border-zinc-200 hover:bg-zinc-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="h-9 px-5 text-xs font-bold bg-slate-900 text-white"
          >
            Add User
          </Button>
        </div>
      </form>
    </Modal>
  );
}
