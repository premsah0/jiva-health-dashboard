"use client";

import { CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Payment {
  id: string;
  title: string;
  status: "Completed" | "Pending" | "Failed";
  details: string;
  date: string;
  previousAmount: string;
  totalAmount: string;
}

interface PaymentItemProps {
  payment: Payment;
  className?: string;
}

/**
 * Reusable Payment Record Card component.
 * Supports credit card icons, completed success badges, and right-aligned paid totals.
 */
export function PaymentItem({ payment, className }: PaymentItemProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl border border-zinc-100 bg-zinc-50/40 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/50 transition-all duration-150",
        className
      )}
    >
      {/* Left: Card Icon and Details */}
      <div className="flex gap-3 items-start sm:items-center">
        <div className="h-9 w-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400">
          <CreditCard className="h-4 w-4" />
        </div>
        <div className="space-y-1 leading-tight">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[13px] font-semibold text-[#263238] dark:text-zinc-50">
              {payment.title}
            </span>
            <Badge
              variant="success"
              className="text-[10px] font-medium px-1.5 py-0 border-none rounded-md"
            >
              {payment.status}
            </Badge>
          </div>
          <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
            {payment.details}
          </p>
          <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
            <span>{payment.date}</span>
            <span>•</span>
            <span className="line-through">
              ₹{payment.previousAmount}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Paid Total Amount */}
      <div className="self-end sm:self-auto text-right font-semibold text-[16px] text-[#263238] dark:text-zinc-50 select-none shrink-0">
        ₹ {payment.totalAmount}
      </div>
    </div>
  );
}
