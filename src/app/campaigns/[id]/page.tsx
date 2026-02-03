"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { campaignService, CampaignRecord } from "@/lib/campaign";
import {
  ArrowLeft,
  BarChart3,
  Copy,
  PauseCircle,
  PlayCircle,
  ShieldCheck,
  Upload,
} from "lucide-react";

export default function CampaignDetailsPage() {
  const [campaign, setCampaign] = useState<CampaignRecord | null>(null);
  const [messageDraft, setMessageDraft] = useState("");
  const [saveTemplate, setSaveTemplate] = useState(true);
  const [logTestMessage, setLogTestMessage] = useState(true);
  const params = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!params?.id) {
        return;
      }
      const result = await campaignService.getCampaign(params.id);
      if (result.success) {
        setCampaign(result.campaign);
        setMessageDraft(result.campaign.message);
      } else {
        router.push("/campaigns");
      }
    };
    fetchCampaign();
  }, [params?.id, router]);

  const stats = useMemo(() => {
    if (!campaign) {
      return [];
    }
    const { stats } = campaign;
    const deliveredPct = stats.sent ? Math.round((stats.delivered / stats.sent) * 100) : 0;
    const respondedPct = stats.sent ? Math.round((stats.responded / stats.sent) * 100) : 0;
    const stoppedPct = stats.sent ? Math.round((stats.stop / stats.sent) * 100) : 0;
    return [
      { label: "Total contacts", value: campaign.stats.sent + campaign.stats.stop },
      { label: "Sent", value: stats.sent },
      { label: "Undelivered", value: stats.sent - stats.delivered },
      { label: "Delivered", value: stats.delivered },
      { label: "Responded", value: stats.responded },
      { label: "Invalid numbers", value: Math.max(0, stats.sent - stats.delivered - stats.stop) },
      { label: "Spam", value: stats.spam },
      { label: "Stop", value: stats.stop },
      { label: "Clicks", value: stats.clicks },
      { label: "Segments", value: stats.segments },
      { label: "% responded", value: `${respondedPct}%` },
      { label: "% delivered", value: `${deliveredPct}%` },
      { label: "% stopped", value: `${stoppedPct}%` },
    ];
  }, [campaign]);

  if (!campaign) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center text-muted-foreground">
          Loading campaign details...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={() => router.push("/campaigns")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{campaign.name}</h1>
              <p className="text-xs text-muted-foreground">
                ID {campaign.id} · Created {new Date(campaign.createdAt).toLocaleString()}
              </p>
            </div>
            <Badge variant="secondary">{campaign.type}</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <PauseCircle className="h-4 w-4" />
              Pause
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4" />
              Cancel
            </Button>
            <Button className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <Card className="p-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border p-3">
                    <p className="text-xs uppercase text-muted-foreground">{stat.label}</p>
                    <p className="text-lg font-semibold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </Card>

            {campaign.type === "Hook" && (
              <Card className="p-5 space-y-4">
                <div>
                  <h2 className="text-lg font-semibold">Setting up your Hook Campaign</h2>
                  <p className="text-sm text-muted-foreground">
                    Trigger texts programmatically via the workspace API key.
                  </p>
                </div>
                <div className="rounded-lg border bg-muted/40 p-4 text-sm">
                  <p className="font-medium">POST {campaign.hookEndpoint}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Header: <span className="font-medium">X-API-Key: &lt;key&gt;</span>
                  </p>
                  <pre className="mt-3 whitespace-pre-wrap text-xs text-muted-foreground">
{`{
  "number": "+15555555555",
  "vars": { "name": "John", "amount": "50000" }
}`}
                  </pre>
                </div>
                <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                  Hook campaigns use a static template. Each inbound webhook payload
                  merges variables into the template before sending.
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Safe Mode is enabled, outbound sends will be simulated.
                </div>
              </Card>
            )}
          </div>

          <Card className="flex flex-col gap-4 p-4">
            <div className="space-y-1">
              <h2 className="text-sm font-semibold">Message Builder</h2>
              <p className="text-xs text-muted-foreground">
                Edit templates, insert variables, and attach media.
              </p>
            </div>
            <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
              <Upload className="mx-auto mb-2 h-5 w-5" />
              Include image upload (optional MMS)
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Upload media
              </Button>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase text-muted-foreground">
                Select Template
              </label>
              <Select defaultValue="default">
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Template</SelectItem>
                  <SelectItem value="demo">Demo Scheduler</SelectItem>
                  <SelectItem value="renewal">Renewal Reminder</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="w-full">
                Edit Templates
              </Button>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <Checkbox
                  checked={saveTemplate}
                  onCheckedChange={(checked) => setSaveTemplate(Boolean(checked))}
                />
                Save edits to this template
              </label>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase text-muted-foreground">
                Edit your text message
              </label>
              <Textarea
                rows={6}
                value={messageDraft}
                onChange={(event) => setMessageDraft(event.target.value)}
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Variables supported: {"{name}"}, {"{amount}"}, {"{link}"}</span>
                <span>{messageDraft.length} chars</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase text-muted-foreground">
                Test Send
              </label>
              <div className="flex items-center gap-2">
                <Input placeholder="+1 (555) 555-5555" />
                <Button size="sm">Send test</Button>
              </div>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <Checkbox
                  checked={logTestMessage}
                  onCheckedChange={(checked) => setLogTestMessage(Boolean(checked))}
                />
                Log test message to audit + analytics
              </label>
            </div>
            <Button className="w-full flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Copy campaign payload
            </Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
