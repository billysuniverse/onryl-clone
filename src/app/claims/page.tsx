"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Phone, Search } from "lucide-react";

export default function ClaimsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Claims</h1>
          <p className="text-sm text-muted-foreground">
            Search, purchase, and assign phone numbers to your workspace.
          </p>
        </div>

        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search by area code or city" />
            </div>
            <Button>Search Numbers</Button>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {["+1 (312) 555-0133", "+1 (415) 555-0182", "+1 (917) 555-0174"].map(
            (number) => (
              <Card key={number} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{number}</p>
                    <p className="text-xs text-muted-foreground">Local SMS</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Claim
                </Button>
              </Card>
            )
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
