"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

const messagingServices = [
  {
    name: "Default Messaging Service for Conversations",
    sid: "MG68266bf9a248ad8d30d4b36adb752706",
    inboundRequest: "https://onryl.app/webhooks/twilio/inbound",
    linkShorteningDomain: "short.onryl.app",
  },
  {
    name: "Customer Care A2P Messaging Service",
    sid: "MGf0f492f616a93cfd65347426a88f334a",
    inboundRequest: "https://onryl.app/webhooks/twilio/inbound",
    linkShorteningDomain: "short.onryl.app",
  },
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

        <Card className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Twilio Connection</h2>
              <p className="text-sm text-muted-foreground">
                Connect your Twilio account once and re-use it across every channel.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Connected
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase text-muted-foreground">
                Account SID
              </label>
              <Input placeholder="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase text-muted-foreground">
                Auth Token
              </label>
              <Input placeholder="••••••••••••••••••••••••••••••" type="password" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase text-muted-foreground">
                Messaging Service SID (optional)
              </label>
              <Input placeholder="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase text-muted-foreground">
                Webhook Base URL
              </label>
              <Input placeholder="https://app.example.com/webhooks/twilio" />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button>Save & Verify</Button>
            <Button variant="outline">Send Test SMS</Button>
            <p className="text-xs text-muted-foreground">
              We’ll validate credentials and confirm webhook reachability.
            </p>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Messaging Services</h2>
              <p className="text-sm text-muted-foreground">
                Bundle sender numbers and inbound routing into a Twilio Messaging Service.
              </p>
            </div>
            <Button>Create Messaging Service</Button>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex flex-1 flex-wrap items-center gap-3">
              <div className="min-w-[240px] flex-1">
                <Input placeholder="Search by SID" />
              </div>
              <Button variant="outline">Search</Button>
            </div>
            <div className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
              10 per page
            </div>
          </div>
          <div className="mt-5 overflow-hidden rounded-xl border">
            <div className="grid grid-cols-4 gap-4 border-b bg-muted/30 px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">
              <span>Name</span>
              <span>SID</span>
              <span>Inbound Request Config</span>
              <span>Link Shortening Domain</span>
            </div>
            {messagingServices.map((service) => (
              <div
                key={service.sid}
                className="grid grid-cols-4 gap-4 border-b px-4 py-4 text-sm last:border-b-0"
              >
                <div className="space-y-1">
                  <p className="font-medium text-primary">{service.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Manage senders and opt-out handling.
                  </p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">{service.sid}</span>
                <span className="text-sm text-muted-foreground">{service.inboundRequest}</span>
                <span className="text-sm text-muted-foreground">
                  {service.linkShorteningDomain}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Sticky Sender</h2>
            <p className="text-sm text-muted-foreground">
              Keep each contact paired with the same sender number for consistent
              conversations and higher deliverability.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="text-sm font-medium">Enable sticky sender per contact</p>
              <p className="text-xs text-muted-foreground">
                New contacts are assigned a sender number on first send.
              </p>
            </div>
            <Checkbox defaultChecked />
          </div>
        </Card>

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
