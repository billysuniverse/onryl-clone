"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  MessageSquare,
  ListTodo,
  Users,
  MessageCircle,
  Settings,
  Layout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Campaigns", href: "/campaigns", icon: MessageCircle },
  { name: "Claims", href: "/claims", icon: ListTodo },
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "Workspace", href: "/workspace", icon: Settings },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col border-r bg-card px-3 py-4 md:px-6">
      <Link href="/" className="px-2 mb-6">
        <div className="flex items-center gap-2">
          <Image
            src="/purpleO.svg"
            width={34}
            height={34}
            alt="Onryl logo"
            className=""
          />
          <Image
            src="/purpleE.svg"
            width={28}
            height={28}
            alt="Onryl logo text"
            className="text-primary"
          />
          <span className="text-xl font-semibold text-primary ms-1">nryl</span>
        </div>
      </Link>
      <div className="flex grow flex-col gap-1">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Button
              key={link.name}
              variant={pathname === link.href ? "secondary" : "ghost"}
              className={cn(
                "mb-1 justify-start gap-3 text-left",
                pathname === link.href ? "bg-secondary font-medium" : "font-normal"
              )}
              asChild
            >
              <Link href={link.href}>
                <LinkIcon className="mr-2 h-5 w-5" />
                {link.name}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}