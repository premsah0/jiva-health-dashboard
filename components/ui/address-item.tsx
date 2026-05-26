import * as React from "react";
import { Home, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Address {
  id: string;
  type: string;
  isDefault?: boolean;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface AddressItemProps {
  address: Address;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

/**
 * Reusable Address Card component.
 * Custom built to support type labels (Home, Work), default indicators, and pencil/trash action overrides.
 */
export function AddressItem({ address, onEdit, onDelete, className }: AddressItemProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/50 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/50 transition-all duration-150",
        className
      )}
    >
      {/* Left: Home Icon, Title, and Address Description */}
      <div className="flex gap-3 items-start">
        <div className="h-8.5 w-8.5 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-400 shrink-0 shadow-xs dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-500">
          <Home className="h-4.5 w-4.5" />
        </div>
        <div className="space-y-1 leading-tight">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200">
              {address.type}
            </span>
            {address.isDefault && (
              <Badge variant="neutral" className="text-[9px] font-bold py-0 px-1.5 rounded-md border-none bg-zinc-200/60 dark:bg-zinc-800">
                Default
              </Badge>
            )}
          </div>
          <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 leading-normal max-w-sm sm:max-w-md mt-1">
            {address.line1}
            {address.line2 && <span className="block">{address.line2}</span>}
            <span className="block">
              {address.city}, {address.state} {address.zip}
            </span>
            <span className="block text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold mt-0.5">
              {address.country}
            </span>
          </p>
        </div>
      </div>

      {/* Right: Actions triggers (Edit and destructive Delete) */}
      <div className="flex items-center gap-1.5 self-end sm:self-start">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit?.(address.id)}
          className="h-8 w-8 p-0 hover:border-zinc-300 dark:hover:border-zinc-700"
          title="Edit address"
        >
          <Pencil className="h-3.5 w-3.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete?.(address.id)}
          className="h-8 w-8 p-0 border-red-100 hover:bg-red-50 dark:border-red-950/30 dark:hover:bg-red-950/20"
          title="Delete address"
        >
          <Trash2 className="h-3.5 w-3.5 text-red-500/80 hover:text-red-650" />
        </Button>
      </div>
    </div>
  );
}
