"use client";

import { Mail, Phone, Calendar, Eye, FileEdit, Award, Crown } from "lucide-react";
import { FigmaUser } from "@/data/figmaUsers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserCardProps {
  user: FigmaUser;
  onUpgrade?: (id: string) => void;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function UserCard({ user, onUpgrade, onView, onEdit }: UserCardProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-zinc-100 bg-white p-4 transition-all duration-200 hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/60 lg:flex-row lg:items-center lg:justify-between">
      {/* 1. Initials Avatar and Core Info */}
      <div className="flex items-center gap-3.5 shrink-0 lg:w-[22%]">
        <div className="h-10 w-10 rounded-full bg-[#1a73e8] flex items-center justify-center text-white font-bold text-[13px] shrink-0 select-none">
          {initials}
        </div>
        <div className="space-y-1 leading-tight">
          <h4 className="text-[15px] font-semibold text-[#263238] dark:text-zinc-50 tracking-tight">
            {user.name}
          </h4>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="neutral" className="text-[11px] font-medium px-1.5 py-0 rounded-md border-none bg-zinc-100 dark:bg-zinc-800">
              {user.role}
            </Badge>
            <Badge
              variant={user.status === "Active" ? "success" : "neutral"}
              className={user.status === "Active" 
                ? "text-[11px] font-medium px-1.5 py-0 rounded-md border-none bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                : "text-[11px] font-medium px-1.5 py-0 rounded-md border-none bg-zinc-100 text-zinc-500 dark:bg-zinc-800"
              }
            >
              {user.status}
            </Badge>
          </div>
          <div>
            <Badge variant="outline" className="text-[11px] font-medium text-zinc-400 px-1.5 py-0 border-zinc-200 dark:border-zinc-800">
              {user.type}
            </Badge>
          </div>
        </div>
      </div>

      {/* 2. Contact details */}
      <div className="grid gap-1.5 border-t border-zinc-100 pt-3 text-[12px] leading-none text-zinc-500 lg:border-t-0 lg:pt-0 lg:w-[22%] dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
          <a
            href={`mailto:${user.email}`}
            className="font-medium hover:text-blue-600 transition-colors truncate max-w-[180px] sm:max-w-none"
          >
            {user.email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            {user.phone}
          </span>
        </div>
      </div>

      {/* 3. Join / Active Details */}
      <div className="flex items-start gap-2 border-t border-zinc-100 pt-3 text-[12px] leading-normal text-zinc-500 lg:border-t-0 lg:pt-0 lg:w-[18%] dark:border-zinc-800">
        <Calendar className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
        <div>
          <span className="block text-[12px] font-normal text-zinc-500 dark:text-zinc-400 leading-none mb-1">
            Joined
          </span>
          <span className="block text-[13px] font-semibold text-[#263238] dark:text-zinc-200">
            {user.joinedDate}
          </span>
          <span className="block text-[11px] font-normal text-zinc-400 mt-0.5 dark:text-zinc-500">
            Last: {user.lastActiveDate}
          </span>
        </div>
      </div>

      {/* 4. Appointments counter */}
      <div className="flex flex-row justify-between items-center border-y border-zinc-100 py-3 lg:border-none lg:py-0 lg:flex-col lg:items-start lg:w-[13%] dark:border-zinc-800">
        <span className="text-[12px] font-normal text-zinc-500 dark:text-zinc-400 leading-none lg:mb-1">
          Appointments
        </span>
        <span className="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors border-b border-blue-100 hover:border-blue-400 cursor-pointer select-none leading-none pb-0.5 dark:text-blue-400 dark:border-blue-900">
          {user.appointmentsCount}
        </span>
      </div>

      {/* 5. Right Action Panel */}
      <div className="flex items-center justify-end gap-2 pt-1 lg:pt-0 lg:w-[22%]">
        {user.isPrime ? (
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 py-1 px-2.5 rounded-lg select-none dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50">
            <Award className="h-3.5 w-3.5" />
            <span>Prime Active</span>
          </div>
        ) : (
          <button
            onClick={() => onUpgrade?.(user.id)}
            className="h-[32px] px-3 rounded-lg bg-gradient-to-r from-[#FE9A00] to-[#E17100] hover:opacity-90 active:scale-[0.98] text-white text-[12px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer border-none shadow-xs shrink-0"
          >
            <Crown className="h-3.5 w-3.5 text-white shrink-0" />
            Upgrade to Prime
          </button>
        )}

        {/* View Profile */}
        <button
          onClick={() => onView?.(user.id)}
          className="h-[32px] px-2.5 border border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600 rounded-lg flex items-center justify-center gap-1 text-[12px] font-medium text-[#263238] dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
          title="View profile"
        >
          <Eye className="h-3.5 w-3.5 text-zinc-400" />
          <span>View</span>
        </button>

        {/* Edit Profile */}
        <button
          onClick={() => onEdit?.(user.id)}
          className="h-[32px] px-2.5 border border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600 rounded-lg flex items-center justify-center gap-1 text-[12px] font-medium text-[#263238] dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
          title="Edit profile"
        >
          <FileEdit className="h-3.5 w-3.5 text-zinc-400" />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
}
