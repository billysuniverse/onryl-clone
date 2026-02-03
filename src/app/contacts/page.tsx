"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";

const contacts = [
  { name: "Jordan Matthews", phone: "+1 (202) 555-0121", status: "Active", tags: ["VIP"] },
  { name: "Nina Alvarez", phone: "+1 (415) 555-0184", status: "Stopped", tags: ["Stop"] },
  { name: "Devon Park", phone: "+1 (312) 555-0140", status: "Active", tags: ["Demo"] },
];

export default function ContactsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Contacts</h1>
            <p className="text-sm text-muted-foreground">
              Manage contacts, flags, and stop list status.
            </p>
          </div>
          <Button>Add Contact</Button>
        </div>

        <Card className="p-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search contacts..." />
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {contacts.map((contact) => (
            <Card key={contact.phone} className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">{contact.phone}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{contact.status}</Badge>
                {contact.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
