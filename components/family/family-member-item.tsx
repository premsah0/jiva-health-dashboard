"use client";

import { Phone, Calendar, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  dob: string;
}

interface FamilyMemberItemProps {
  member: FamilyMember;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

/**
 * Reusable Family Member Card component.
 * Custom built to support initials avatars, relationship tags, contact logs, and edit/delete actions.
 */
export function FamilyMemberItem({ member, onEdit, onDelete, className }: FamilyMemberItemProps) {
  // Extract initials dynamically from member's name
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/50 hover:bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/50 transition-all duration-150",
        className
      )}
    >
      {/* Left: Blue Avatar Initials and Family Info */}
      <div className="flex gap-3.5 items-start sm:items-center">
        {/* Figma circular initials avatar in solid blue */}
        <div className="h-11 w-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shrink-0 select-none shadow-xs">
          {initials}
        </div>
        <div className="space-y-1.5 leading-tight">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-extrabold text-zinc-900 dark:text-zinc-50">
              {member.name}
            </span>
          </div>
          {/* Grey Relationship Badge */}
          <div>
            <Badge
              variant="neutral"
              className="text-[9px] font-bold px-2 py-0.5 border-none rounded-md bg-zinc-100 dark:bg-zinc-850"
            >
              {member.relationship}
            </Badge>
          </div>
          {/* Phone Details Row */}
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
            <Phone className="h-3.5 w-3.5 text-zinc-400" />
            <span className="tracking-wide">{member.phone}</span>
          </div>
          {/* Date of Birth Details Row */}
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
            <Calendar className="h-3.5 w-3.5 text-zinc-400" />
            <span>{member.dob}</span>
          </div>
        </div>
      </div>

      {/* Right: Actions selectors (Edit and Delete) */}
      <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit?.(member.id)}
          className="h-8 w-8 p-0 hover:border-zinc-300 dark:hover:border-zinc-700"
          title="Edit member details"
        >
          <Pencil className="h-3.5 w-3.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete?.(member.id)}
          className="h-8 w-8 p-0 border-red-100 hover:bg-red-50 dark:border-red-950/30 dark:hover:bg-red-950/20"
          title="Delete member record"
        >
          <Trash2 className="h-3.5 w-3.5 text-red-500/85 hover:text-red-700" />
        </Button>
      </div>
    </div>
  );
}
