"use client";

import { Bell, ChevronDown, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const workspaces = [
  { id: "ws_9k2z", name: "Northwind Health" },
  { id: "ws_41v8", name: "Harbor Dental" },
  { id: "ws_7b1q", name: "Kite Logistics" },
];

export function TopBar() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-card px-6 py-4 md:px-8">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <p className="text-xs font-medium uppercase text-muted-foreground">
            Workspace
          </p>
          <div className="flex items-center gap-2">
            <Select defaultValue={workspaces[0].id}>
              <SelectTrigger className="h-9 w-[240px]">
                <SelectValue placeholder="Select workspace" />
              </SelectTrigger>
              <SelectContent>
                {workspaces.map((workspace) => (
                  <SelectItem key={workspace.id} value={workspace.id}>
                    {workspace.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="rounded-full border px-2 py-1 text-xs text-muted-foreground">
              {workspaces[0].id}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle dark mode"
          onClick={() => setIsDark((prev) => !prev)}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-muted" />
          <div className="text-left text-sm">
            <p className="font-medium">Avery Hill</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}
