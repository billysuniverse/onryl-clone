"use client";

import { cn } from "@/lib/utils";
import { SideNav } from "./SideNav";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main
        className={cn(
          "flex-1 overflow-y-auto bg-background text-foreground px-6 pt-6 pb-12 md:px-8 md:pt-8"
        )}
      >
        <div className="mx-auto max-w-7xl">{children}</div>
        <Toaster />
        <Sonner />
      </main>
    </div>
  );
}