"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { campaignService, CampaignRecord } from "@/lib/campaign";
import {
  Download,
  Eye,
  FileText,
  Pencil,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const result = await campaignService.getCampaigns();
      if (result.success) {
        setCampaigns(result.campaigns);
      }
    };
    fetchCampaigns();
  }, []);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      if (!showArchived && campaign.status === "completed") {
        return false;
      }
      const query = searchQuery.toLowerCase();
      return (
        campaign.name.toLowerCase().includes(query) ||
        campaign.type.toLowerCase().includes(query) ||
        campaign.createdBy.toLowerCase().includes(query)
      );
    });
  }, [campaigns, searchQuery, showArchived]);

  const handleViewCampaign = (id: string) => {
    router.push(`/campaigns/${id}`);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Campaigns</h1>
            <p className="text-sm text-muted-foreground">
              Launch, monitor, and optimize your SMS campaigns.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download CSV
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Campaign
            </Button>
          </div>
        </div>

        <Card className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={showArchived ? "default" : "outline"}
                onClick={() => setShowArchived((prev) => !prev)}
              >
                Show Archived
              </Button>
              <div className="flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
                <span>Subscriber</span>
                <span className="h-3 w-px bg-border" />
                <span>Retarget</span>
                <span className="h-3 w-px bg-border" />
                <span>Manual</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created by</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Delivered</TableHead>
                <TableHead>Responded</TableHead>
                <TableHead>Stop</TableHead>
                <TableHead>Spam</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Segments</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow
                  key={campaign.id}
                  className="cursor-pointer hover:bg-muted/40"
                  onClick={() => handleViewCampaign(campaign.id)}
                >
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{campaign.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {campaign.id}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{campaign.type}</Badge>
                  </TableCell>
                  <TableCell>{campaign.createdBy}</TableCell>
                  <TableCell>
                    {new Date(campaign.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{campaign.stats.sent}</TableCell>
                  <TableCell>{campaign.stats.delivered}</TableCell>
                  <TableCell>{campaign.stats.responded}</TableCell>
                  <TableCell>{campaign.stats.stop}</TableCell>
                  <TableCell>{campaign.stats.spam}</TableCell>
                  <TableCell>{campaign.stats.clicks}</TableCell>
                  <TableCell>{campaign.stats.segments}</TableCell>
                  <TableCell className="text-right">
                    <div
                      className="flex justify-end gap-2"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleViewCampaign(campaign.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
}
