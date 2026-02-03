"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BadgeCheck, Phone, Search } from "lucide-react";

export default function LookupsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Lookups</h1>
          <p className="text-sm text-muted-foreground">
            Validate numbers and check carrier or line type.
          </p>
        </div>

        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Enter phone number" />
            </div>
            <Button>Lookup</Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">+1 (415) 555-0184</p>
              <p className="text-xs text-muted-foreground">Carrier: Verizon · Line type: Mobile</p>
            </div>
            <div className="ml-auto flex items-center gap-2 text-xs text-emerald-600">
              <BadgeCheck className="h-4 w-4" />
              Valid
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
