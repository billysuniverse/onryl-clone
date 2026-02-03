"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ListFilter, Plus, Search } from "lucide-react";

const segments = [
  { name: "All Subscribers", count: 12840, type: "Default" },
  { name: "Retarget - No Reply 7d", count: 1840, type: "Retarget" },
  { name: "VIP Renewals", count: 320, type: "Manual" },
];

export default function SubscribersPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Subscribers</h1>
            <p className="text-sm text-muted-foreground">
              Build lists, segments, and manual filters for campaigns.
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Segment
          </Button>
        </div>

        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search segments..." />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <ListFilter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {segments.map((segment) => (
            <Card key={segment.name} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{segment.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {segment.count.toLocaleString()} subscribers
                  </p>
                </div>
                <Badge variant="secondary">{segment.type}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
