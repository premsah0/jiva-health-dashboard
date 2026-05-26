"use client";

import { Pill, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SelectDropdown } from "@/components/ui/select-dropdown";

export interface Order {
  id: string;
  orderNumber: string;
  status: "Delivered" | "Pending" | "Cancelled";
  productName: string;
  quantityDetails: string;
  orderDate: string;
  price: string;
}

interface OrderItemProps {
  order: Order;
  onStatusChange?: (id: string, newStatus: Order["status"]) => void;
  onDelete?: (id: string) => void;
}

/**
 * Reusable Order Item component.
 * Supports status tag color coding, item descriptions, and status picker actions.
 */
export function OrderItem({ order, onStatusChange, onDelete }: OrderItemProps) {
  const badgeVariants = {
    Delivered: "success" as const,
    Pending: "warning" as const,
    Cancelled: "danger" as const,
  };

  const statusOptions = [
    { value: "Delivered", label: "Delivered" },
    { value: "Pending", label: "Pending" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl border border-zinc-100 bg-zinc-50/40 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/50 transition-all duration-150">
      {/* Left: Pill Icon and Order Information */}
      <div className="flex gap-3 items-start sm:items-center">
        <div className="h-9 w-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400">
          <Pill className="h-4 w-4" />
        </div>
        <div className="space-y-1 leading-tight">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[13px] font-semibold text-[#263238] dark:text-zinc-50">
              Order #{order.orderNumber}
            </span>
            <Badge
              variant={badgeVariants[order.status]}
              className="text-[10px] font-medium px-1.5 py-0 border-none rounded-md"
            >
              {order.status}
            </Badge>
          </div>
          <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
            {order.productName} - {order.quantityDetails}
          </p>
          <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
            <span>{order.orderDate}</span>
            <span>•</span>
            <span className="text-[#263238] dark:text-zinc-200 font-semibold">
              ₹{order.price}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Custom Dropdown Picker & Delete action */}
      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
        <SelectDropdown
          value={order.status}
          onChange={(val) => onStatusChange?.(order.id, val as Order["status"])}
          options={statusOptions}
          variant="neutral"
          className="w-28 text-xs font-medium shrink-0"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete?.(order.id)}
          className="h-8 w-8 p-0 border-red-100 hover:bg-red-50 dark:border-red-950/30 dark:hover:bg-red-950/20"
          title="Delete order record"
        >
          <Trash2 className="h-3.5 w-3.5 text-red-500/85 hover:text-red-700" />
        </Button>
      </div>
    </div>
  );
}
