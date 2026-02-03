"use client";

import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowUpDown,
  BadgeCheck,
  Bookmark,
  CircleDot,
  Download,
  MessageSquare,
  PhoneCall,
  Search,
  Send,
  ShieldCheck,
  Tag,
  User,
} from "lucide-react";

type RepliedStatus = "both" | "replied" | "not_replied";

interface Channel {
  id: string;
  contactName: string;
  contactNumber: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  flags: string[];
  bookmarked: boolean;
  replied: boolean;
  campaign: string;
}

interface ChatMessage {
  id: string;
  channelId: string;
  direction: "inbound" | "outbound";
  body: string;
  status: "queued" | "sent" | "delivered" | "failed" | "simulated";
  timestamp: string;
}

const channels: Channel[] = [
  {
    id: "ch_01",
    contactName: "Jordan Matthews",
    contactNumber: "+1 (202) 555-0121",
    lastMessage: "Got it — can we move this to next week?",
    lastMessageAt: "2m ago",
    unreadCount: 2,
    flags: ["VIP", "Renewal"],
    bookmarked: true,
    replied: true,
    campaign: "Renewal Reminder",
  },
  {
    id: "ch_02",
    contactName: "Nina Alvarez",
    contactNumber: "+1 (415) 555-0184",
    lastMessage: "STOP",
    lastMessageAt: "12m ago",
    unreadCount: 1,
    flags: ["Stop"],
    bookmarked: false,
    replied: true,
    campaign: "Retarget Q2",
  },
  {
    id: "ch_03",
    contactName: "Open Lead",
    contactNumber: "+1 (646) 555-0166",
    lastMessage: "Thanks! Can you send pricing?",
    lastMessageAt: "1h ago",
    unreadCount: 0,
    flags: ["Pricing"],
    bookmarked: false,
    replied: false,
    campaign: "Welcome Blast",
  },
  {
    id: "ch_04",
    contactName: "Devon Park",
    contactNumber: "+1 (312) 555-0140",
    lastMessage: "We’re ready to schedule the demo.",
    lastMessageAt: "3h ago",
    unreadCount: 0,
    flags: ["Demo"],
    bookmarked: true,
    replied: true,
    campaign: "Hook: Demo",
  },
];

const chatMessages: ChatMessage[] = [
  {
    id: "m1",
    channelId: "ch_01",
    direction: "inbound",
    body: "Hey team, appreciate the follow up.",
    status: "delivered",
    timestamp: "Today 9:12 AM",
  },
  {
    id: "m2",
    channelId: "ch_01",
    direction: "outbound",
    body: "Absolutely! Want to push your renewal to next week?",
    status: "delivered",
    timestamp: "Today 9:14 AM",
  },
  {
    id: "m3",
    channelId: "ch_01",
    direction: "inbound",
    body: "Got it — can we move this to next week?",
    status: "delivered",
    timestamp: "Today 9:16 AM",
  },
  {
    id: "m4",
    channelId: "ch_02",
    direction: "inbound",
    body: "STOP",
    status: "delivered",
    timestamp: "Today 8:55 AM",
  },
  {
    id: "m5",
    channelId: "ch_03",
    direction: "outbound",
    body: "Welcome! Let me know what you’re looking for.",
    status: "delivered",
    timestamp: "Yesterday 4:18 PM",
  },
  {
    id: "m6",
    channelId: "ch_03",
    direction: "inbound",
    body: "Thanks! Can you send pricing?",
    status: "delivered",
    timestamp: "Yesterday 4:24 PM",
  },
];

export default function MessagesPage() {
  const [selectedChannelId, setSelectedChannelId] = useState(channels[0].id);
  const [search, setSearch] = useState("");
  const [campaignFilter, setCampaignFilter] = useState<string>("all");
  const [flagFilter, setFlagFilter] = useState<string>("all");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [repliedStatus, setRepliedStatus] = useState<RepliedStatus>("both");
  const [orderOldest, setOrderOldest] = useState(false);
  const [safeMode, setSafeMode] = useState(true);
  const [composer, setComposer] = useState("");

  const segmentCount = Math.max(1, Math.ceil(composer.length / 160));

  const filteredChannels = useMemo(() => {
    return channels
      .filter((channel) => {
        const matchesSearch =
          channel.contactName.toLowerCase().includes(search.toLowerCase()) ||
          channel.contactNumber.toLowerCase().includes(search.toLowerCase()) ||
          channel.lastMessage.toLowerCase().includes(search.toLowerCase());
        const matchesCampaign =
          campaignFilter === "all" || channel.campaign === campaignFilter;
        const matchesFlag =
          flagFilter === "all" || channel.flags.includes(flagFilter);
        const matchesUnread = !unreadOnly || channel.unreadCount > 0;
        const matchesBookmarked = !bookmarkedOnly || channel.bookmarked;
        const matchesReplied =
          repliedStatus === "both" ||
          (repliedStatus === "replied" && channel.replied) ||
          (repliedStatus === "not_replied" && !channel.replied);
        return (
          matchesSearch &&
          matchesCampaign &&
          matchesFlag &&
          matchesUnread &&
          matchesBookmarked &&
          matchesReplied
        );
      })
      .sort((a, b) =>
        orderOldest
          ? a.lastMessageAt.localeCompare(b.lastMessageAt)
          : b.lastMessageAt.localeCompare(a.lastMessageAt)
      );
  }, [
    campaignFilter,
    flagFilter,
    bookmarkedOnly,
    orderOldest,
    repliedStatus,
    search,
    unreadOnly,
  ]);

  const activeChannel = channels.find(
    (channel) => channel.id === selectedChannelId
  );

  const activeMessages = chatMessages.filter(
    (message) => message.channelId === selectedChannelId
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-sm text-muted-foreground">
              Real-time inbox across every workspace channel.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border px-3 py-1">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-medium">Safe Mode</span>
              <Checkbox
                checked={safeMode}
                onCheckedChange={(checked) => setSafeMode(Boolean(checked))}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_320px]">
          <Card className="flex flex-col gap-4 p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{filteredChannels.length} channels</span>
                <span>
                  {filteredChannels.reduce((acc, channel) => acc + channel.unreadCount, 0)}{" "}
                  unread
                </span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search by name, number, or text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid gap-2">
                <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Campaigns" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All campaigns</SelectItem>
                    <SelectItem value="Renewal Reminder">Renewal Reminder</SelectItem>
                    <SelectItem value="Retarget Q2">Retarget Q2</SelectItem>
                    <SelectItem value="Welcome Blast">Welcome Blast</SelectItem>
                    <SelectItem value="Hook: Demo">Hook: Demo</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={flagFilter} onValueChange={setFlagFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Flags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All flags</SelectItem>
                    <SelectItem value="VIP">VIP</SelectItem>
                    <SelectItem value="Renewal">Renewal</SelectItem>
                    <SelectItem value="Stop">Stop</SelectItem>
                    <SelectItem value="Pricing">Pricing</SelectItem>
                    <SelectItem value="Demo">Demo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={unreadOnly}
                    onCheckedChange={(checked) => setUnreadOnly(Boolean(checked))}
                  />
                  Unread only
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={bookmarkedOnly}
                    onCheckedChange={(checked) => setBookmarkedOnly(Boolean(checked))}
                  />
                  Bookmarked
                </label>
              </div>

              <Select
                value={repliedStatus}
                onValueChange={(value: RepliedStatus) => setRepliedStatus(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Replied status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="both">Both</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="not_replied">Not replied</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => setOrderOldest((prev) => !prev)}
              >
                Order by oldest
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {filteredChannels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannelId(channel.id)}
                  className={`flex w-full flex-col gap-2 rounded-lg border px-3 py-2 text-left transition ${
                    selectedChannelId === channel.id
                      ? "border-primary bg-primary/5"
                      : "border-transparent hover:border-muted"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{channel.contactName}</p>
                        <p className="text-xs text-muted-foreground">
                          {channel.contactNumber}
                        </p>
                      </div>
                    </div>
                    {channel.unreadCount > 0 && (
                      <Badge className="h-5 rounded-full px-2 text-xs">
                        {channel.unreadCount}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {channel.lastMessage}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{channel.lastMessageAt}</span>
                    <div className="flex items-center gap-2">
                      {channel.bookmarked && <Bookmark className="h-3 w-3" />}
                      {channel.flags.length > 0 && <Tag className="h-3 w-3" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="flex flex-col">
            <div className="border-b px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <PhoneCall className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {activeChannel ? activeChannel.contactName : "No channel selected"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activeChannel?.contactNumber ?? "Select a channel on the left"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {activeChannel ? (
                activeMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.direction === "outbound" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${
                        message.direction === "outbound"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p>{message.body}</p>
                      <div className="mt-2 flex items-center justify-between text-xs opacity-70">
                        <span>{message.timestamp}</span>
                        <span className="flex items-center gap-1">
                          <CircleDot className="h-3 w-3" />
                          {message.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  Select a channel on the left to begin chatting.
                </div>
              )}
            </div>

            <div className="border-t px-5 py-4">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Auto-response suggestions
                  </span>
                  {[
                    "Happy to help — what’s the best time to connect?",
                    "Got it. Want me to send pricing details?",
                    "Thanks! Reply STOP to opt out at any time.",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className="rounded-full border px-3 py-1 text-xs text-muted-foreground transition hover:bg-muted"
                      onClick={() => setComposer(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                <Textarea
                  placeholder="Type your message..."
                  value={composer}
                  onChange={(event) => setComposer(event.target.value)}
                  rows={3}
                />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    {composer.length} chars · {segmentCount} segment
                    {segmentCount > 1 ? "s" : ""}
                    {safeMode && (
                      <span className="flex items-center gap-1 text-emerald-600">
                        <BadgeCheck className="h-3 w-3" />
                        Safe Mode
                      </span>
                    )}
                  </div>
                  <Button className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="flex flex-col gap-4 p-4">
            <div>
              <p className="text-sm font-semibold">Channel Metadata</p>
              <p className="text-xs text-muted-foreground">
                {activeChannel ? "Contact details and status" : "Select a channel."}
              </p>
            </div>

            {activeChannel ? (
              <div className="space-y-4 text-sm">
                <div className="rounded-lg border p-3">
                  <p className="text-xs uppercase text-muted-foreground">Contact</p>
                  <p className="font-medium">{activeChannel.contactName}</p>
                  <p className="text-xs text-muted-foreground">
                    {activeChannel.contactNumber}
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs uppercase text-muted-foreground">Tags</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activeChannel.flags.map((flag) => (
                      <Badge key={flag} variant="secondary">
                        {flag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs uppercase text-muted-foreground">Last campaign</p>
                  <p className="font-medium">{activeChannel.campaign}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs uppercase text-muted-foreground">Status</p>
                  <p className="font-medium">
                    {activeChannel.replied ? "Replied" : "Not replied"}
                  </p>
                </div>
                <div className="space-y-2 rounded-lg border p-3">
                  <p className="text-xs uppercase text-muted-foreground">Notes</p>
                  <Textarea placeholder="Add internal notes..." rows={4} />
                </div>
              </div>
            ) : (
              <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                Select a channel to see contact metadata, tags, and notes.
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
