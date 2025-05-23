"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart,
  Plus,
  Search,
  MessageCircle,
  Calendar,
  MoreHorizontal,
  PlayCircle,
  PauseCircle,
  User,
  Edit,
  Trash,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { campaignService } from "@/lib/campaign";

interface Campaign {
  id: string;
  name: string;
  description: string;
  status: "draft" | "scheduled" | "active" | "paused" | "completed";
  createdAt: string;
  scheduledFor?: string;
  completedAt?: string;
  totalContacts: number;
  sentCount: number;
  responseCount: number;
  tags: string[];
  message: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    description: "",
    message: "",
  });
  const router = useRouter();
  const { toast } = useToast();

  // Fetch campaigns (simulated)
  useState(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const result = await campaignService.getCampaigns();
        if (result.success) {
          setCampaigns(result.campaigns as Campaign[]);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load campaigns",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  });

  // Filtered campaigns based on search
  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle campaign creation
  const handleCreateCampaign = async () => {
    if (!newCampaign.name || !newCampaign.message) return;

    try {
      const result = await campaignService.createCampaign(newCampaign);
      if (result.success) {
        toast({
          title: "Campaign created",
          description: "Campaign has been created successfully",
        });
        setCampaigns([...campaigns, result.campaign as Campaign]);
        setCreateDialogOpen(false);
        setNewCampaign({ name: "", description: "", message: "" });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive",
      });
    }
  };

  // Handle view campaign details
  const handleViewCampaign = (id: string) => {
    router.push(`/campaigns/${id}`);
  };

  // Get badge color based on campaign status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "scheduled":
        return "bg-blue-500";
      case "draft":
        return "bg-gray-500";
      case "paused":
        return "bg-orange-500";
      case "completed":
        return "bg-purple-500";
      default:
        return "";
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>
                  Create a new SMS campaign to engage with your audience.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    placeholder="Enter campaign name"
                    value={newCampaign.name}
                    onChange={(e) =>
                      setNewCampaign({ ...newCampaign, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="campaign-description">Description</Label>
                  <Input
                    id="campaign-description"
                    placeholder="Enter campaign description"
                    value={newCampaign.description}
                    onChange={(e) =>
                      setNewCampaign({
                        ...newCampaign,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="campaign-message">Message</Label>
                  <Textarea
                    id="campaign-message"
                    placeholder="Enter the message to send"
                    rows={4}
                    value={newCampaign.message}
                    onChange={(e) =>
                      setNewCampaign({ ...newCampaign, message: e.target.value })
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use {{name}} as a placeholder for recipient's name.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateCampaign}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center mb-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Campaigns</CardTitle>
            <CardDescription>
              Manage and track your SMS marketing campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-4">
                <p>Loading campaigns...</p>
              </div>
            ) : filteredCampaigns.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <MessageCircle className="mb-2 h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-medium">No campaigns found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery
                    ? "No campaigns match your search query"
                    : "Create your first campaign to get started"}
                </p>
                {!searchQuery && (
                  <Button
                    className="mt-4"
                    onClick={() => setCreateDialogOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Campaign
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Contacts</TableHead>
                      <TableHead>Response Rate</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.map((campaign) => (
                      <TableRow
                        key={campaign.id}
                        className="cursor-pointer"
                        onClick={() => handleViewCampaign(campaign.id)}
                      >
                        <TableCell>
                          <div>
                            <div className="font-medium">{campaign.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {campaign.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${getStatusBadge(campaign.status)}`}
                            variant="secondary"
                          >
                            {campaign.status.charAt(0).toUpperCase() +
                              campaign.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <User className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>
                              {campaign.sentCount}/{campaign.totalContacts}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {campaign.sentCount > 0
                            ? `${Math.round(
                                (campaign.responseCount / campaign.sentCount) *
                                  100
                              )}%`
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          {new Date(campaign.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div
                            className="flex justify-end space-x-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewCampaign(campaign.id);
                              }}
                            >
                              <BarChart className="h-4 w-4" />
                            </Button>
                            {campaign.status === "active" && (
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-orange-500"
                              >
                                <PauseCircle className="h-4 w-4" />
                              </Button>
                            )}
                            {campaign.status === "paused" && (
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-green-500"
                              >
                                <PlayCircle className="h-4 w-4" />
                              </Button>
                            )}
                            {campaign.status === "draft" && (
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-green-500"
                              >
                                <PlayCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}