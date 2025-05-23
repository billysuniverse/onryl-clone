"use client";

import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  BarChart3,
  MessageCircle,
  Users,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  Edit,
  Trash,
  Copy,
  Calendar,
  CheckCircle,
  RefreshCw,
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

export default function CampaignDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [runningCampaign, setRunningCampaign] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Fetch campaign details
  useEffect(() => {
    const fetchCampaign = async () => {
      setLoading(true);
      try {
        const result = await campaignService.getCampaign(params.id);
        if (result.success) {
          setCampaign(result.campaign as Campaign);
        } else {
          toast({
            title: "Error",
            description: "Campaign not found",
            variant: "destructive",
          });
          router.push("/campaigns");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load campaign details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [params.id, router, toast]);

  // Handle campaign actions
  const handleRunCampaign = async () => {
    if (!campaign) return;
    
    setRunningCampaign(true);
    try {
      const result = await campaignService.runCampaign(campaign.id);
      if (result.success) {
        toast({
          title: "Campaign started",
          description: "Campaign is now running",
        });
        // In a real app, would refresh the campaign status
        setCampaign({
          ...campaign,
          status: "active",
        });
      } else {
        throw new Error(result.error || "Failed to run campaign");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to run campaign",
        variant: "destructive",
      });
    } finally {
      setRunningCampaign(false);
    }
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-96">
          <p>Loading campaign details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!campaign) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold">Campaign Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The campaign you are looking for does not exist.
          </p>
          <Button onClick={() => router.push("/campaigns")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Campaigns
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/campaigns")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">{campaign.name}</h1>
          <Badge className={`ml-2 ${getStatusBadge(campaign.status)}`} variant="secondary">
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>
        </div>

        <p className="text-muted-foreground">{campaign.description}</p>

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Created: {new Date(campaign.createdAt).toLocaleDateString()}
            </span>
          </div>
          {campaign.scheduledFor && (
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Scheduled: {new Date(campaign.scheduledFor).toLocaleDateString()}
              </span>
            </div>
          )}
          {campaign.completedAt && (
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Completed: {new Date(campaign.completedAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4 md:flex-nowrap">
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{campaign.totalContacts}</div>
              <div className="flex items-center mt-1">
                <Users className="h-4 w-4 text-muted-foreground mr-1" />
                <p className="text-xs text-muted-foreground">
                  Target audience size
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Messages Sent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{campaign.sentCount}</div>
              <div className="flex items-center mt-1">
                <MessageCircle className="h-4 w-4 text-muted-foreground mr-1" />
                <p className="text-xs text-muted-foreground">
                  {campaign.totalContacts > 0
                    ? `${Math.round(
                        (campaign.sentCount / campaign.totalContacts) * 100
                      )}% of total`
                    : "No contacts selected"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Response Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {campaign.sentCount > 0
                  ? `${Math.round(
                      (campaign.responseCount / campaign.sentCount) * 100
                    )}%`
                  : "N/A"}
              </div>
              <div className="flex items-center mt-1">
                <BarChart3 className="h-4 w-4 text-muted-foreground mr-1" />
                <p className="text-xs text-muted-foreground">
                  {campaign.responseCount} responses received
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Message</CardTitle>
                <CardDescription>
                  The message that will be sent to your contacts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-md">
                  <p className="whitespace-pre-wrap">{campaign.message}</p>
                </div>

                <div className="flex gap-2 mt-6">
                  {campaign.status === "draft" && (
                    <Button
                      className="flex items-center"
                      onClick={handleRunCampaign}
                      disabled={runningCampaign}
                    >
                      {runningCampaign ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <PlayCircle className="mr-2 h-4 w-4" />
                      )}
                      Run Campaign
                    </Button>
                  )}
                  {campaign.status === "active" && (
                    <Button
                      variant="outline"
                      className="flex items-center"
                      disabled={runningCampaign}
                    >
                      <PauseCircle className="mr-2 h-4 w-4" />
                      Pause Campaign
                    </Button>
                  )}
                  {campaign.status === "paused" && (
                    <Button
                      className="flex items-center"
                      disabled={runningCampaign}
                    >
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Resume Campaign
                    </Button>
                  )}
                  <Button variant="outline" className="flex items-center">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center text-destructive"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Campaign Tags</CardTitle>
                <CardDescription>
                  Tags associated with this campaign
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {campaign.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                  {campaign.tags.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No tags associated with this campaign
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>
                  Analytics and metrics for this campaign
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/50">
                  <p className="text-muted-foreground">
                    Performance visualization would be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responses">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Responses</CardTitle>
                <CardDescription>
                  Messages received in response to this campaign
                </CardDescription>
              </CardHeader>
              <CardContent>
                {campaign.responseCount > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-start p-4 border rounded-md">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-3">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">+12025550101</p>
                          <span className="text-xs text-muted-foreground ml-2">
                            2 hours ago
                          </span>
                        </div>
                        <p className="mt-1">Yes, I'm interested in learning more!</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-4 border rounded-md">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-3">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">+12025550102</p>
                          <span className="text-xs text-muted-foreground ml-2">
                            4 hours ago
                          </span>
                        </div>
                        <p className="mt-1">Please unsubscribe me from future messages.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <MessageCircle className="mb-2 h-10 w-10 text-muted-foreground" />
                    <h3 className="text-lg font-medium">No responses yet</h3>
                    <p className="text-sm text-muted-foreground">
                      {campaign.status === "completed"
                        ? "This campaign didn't receive any responses."
                        : "Responses will appear here as they are received."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}