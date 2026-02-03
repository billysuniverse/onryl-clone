"use client";

import { cn } from "@/lib/utils";
import { SideNav } from "./SideNav";
import { TopBar } from "./TopBar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex flex-1 flex-col overflow-hidden bg-background text-foreground">
        <TopBar />
        <main
          className={cn(
            "flex-1 overflow-y-auto px-6 pb-12 pt-6 md:px-8 md:pt-8"
          )}
        >
          <div className="mx-auto max-w-7xl">{children}</div>
          <Toaster />
          <Sonner />
        </main>
      </div>
    </div>
  );
}
