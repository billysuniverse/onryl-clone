"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Activity,
  BadgeCheck,
  CreditCard,
  Database,
  FileClock,
  Flag,
  Link,
  Lock,
  PhoneOff,
  Settings,
  Shield,
  Users,
  Webhook,
} from "lucide-react";

const settingsCards = [
  { title: "Users", description: "Invite users and manage roles.", icon: Users },
  { title: "Workspace Flags", description: "Create flag labels for channels.", icon: Flag },
  { title: "Blocked Numbers", description: "Manage suppression list.", icon: PhoneOff },
  { title: "Billing", description: "Usage, invoices, and limits.", icon: CreditCard },
  { title: "Settings", description: "Timezone, safe mode defaults, sticky sender.", icon: Settings },
  { title: "Message Management", description: "Compliance warnings and blacklists.", icon: Shield },
  { title: "API", description: "Generate and rotate API keys.", icon: Lock },
  { title: "Webhooks", description: "Outbound event subscriptions.", icon: Webhook },
  { title: "10DLC", description: "Brand + campaign registration status.", icon: BadgeCheck },
  { title: "Integrations", description: "CRM connectors and data sync.", icon: Link },
  { title: "Logs", description: "Audit log viewer.", icon: FileClock },
  { title: "CRM Management", description: "Webhook auth + field mapping.", icon: Database },
];

export default function WorkspacePage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Workspace Settings</h1>
          <p className="text-sm text-muted-foreground">
            Configure your workspace, compliance controls, and integrations.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {settingsCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="flex flex-col justify-between gap-6 p-5">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{card.title}</h2>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                  </div>
                </div>
                <Button variant="outline" className="self-start">
                  Manage
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
