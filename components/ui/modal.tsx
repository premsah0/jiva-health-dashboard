import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable modal overlay component for dialogs.
 * Blurs the background canvas and handles close callbacks natively.
 */
export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  React.useEffect(() => {
    // Lock scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-xs animate-fadeIn">
      {/* Click outside backdrop mask to close */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      <Card className={cn("relative w-full max-w-md bg-white shadow-xl border-zinc-200/80 dark:border-zinc-800 dark:bg-zinc-900 z-10 animate-scaleUp", className)}>
        <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <CardTitle className="text-[24px] font-semibold text-zinc-900 dark:text-zinc-50">
            {title}
          </CardTitle>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </CardHeader>
        <CardContent className="pt-4">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
