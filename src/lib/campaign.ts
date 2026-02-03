export type CampaignType = "Hook" | "Single blast" | "Retarget";
export type CampaignStatus = "draft" | "scheduled" | "active" | "paused" | "completed";

export interface CampaignStats {
  sent: number;
  delivered: number;
  responded: number;
  stop: number;
  spam: number;
  clicks: number;
  segments: number;
}

export interface CampaignRecord {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  createdBy: string;
  createdAt: string;
  description: string;
  templateId?: string;
  hookEndpoint?: string;
  message: string;
  stats: CampaignStats;
}

const campaigns: CampaignRecord[] = [
  {
    id: "c_001",
    name: "Renewal Reminder",
    type: "Single blast",
    status: "active",
    createdBy: "Avery Hill",
    createdAt: "2025-05-01T12:00:00Z",
    description: "Renewal outreach for May accounts.",
    message:
      "Hi {name}, your plan renews soon. Reply YES to confirm or STOP to opt out.",
    stats: {
      sent: 1245,
      delivered: 1188,
      responded: 312,
      stop: 18,
      spam: 3,
      clicks: 212,
      segments: 1440,
    },
  },
  {
    id: "c_002",
    name: "Retarget Q2",
    type: "Retarget",
    status: "paused",
    createdBy: "Nina Patel",
    createdAt: "2025-05-12T09:30:00Z",
    description: "Retargeted follow-up for unresponsive leads.",
    message:
      "Still interested in getting your quote? We can schedule a 15-min call this week.",
    stats: {
      sent: 640,
      delivered: 601,
      responded: 94,
      stop: 9,
      spam: 2,
      clicks: 54,
      segments: 720,
    },
  },
  {
    id: "c_003",
    name: "Hook: Demo Scheduler",
    type: "Hook",
    status: "active",
    createdBy: "Jordan Lee",
    createdAt: "2025-05-19T15:05:00Z",
    description: "Webhook-driven demo scheduling for inbound leads.",
    templateId: "tpl_demo",
    hookEndpoint: "/api/hooks/campaigns/c_003",
    message:
      "Hey {name}, thanks for requesting a demo. Pick a time here: {link}",
    stats: {
      sent: 214,
      delivered: 206,
      responded: 88,
      stop: 2,
      spam: 0,
      clicks: 61,
      segments: 262,
    },
  },
  {
    id: "c_004",
    name: "Welcome Blast",
    type: "Single blast",
    status: "draft",
    createdBy: "Avery Hill",
    createdAt: "2025-05-23T10:20:00Z",
    description: "New subscriber welcome sequence.",
    message: "Welcome to Onryl! Reply HELP for support or STOP to opt out.",
    stats: {
      sent: 0,
      delivered: 0,
      responded: 0,
      stop: 0,
      spam: 0,
      clicks: 0,
      segments: 0,
    },
  },
];

export async function getCampaigns() {
  return await new Promise<{ success: true; campaigns: CampaignRecord[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        campaigns,
      });
    }, 200);
  });
}

export async function getCampaign(id: string) {
  return await new Promise<
    | { success: true; campaign: CampaignRecord }
    | { success: false; error: string }
  >((resolve) => {
    setTimeout(() => {
      const campaign = campaigns.find((item) => item.id === id);
      if (campaign) {
        resolve({ success: true, campaign });
      } else {
        resolve({ success: false, error: "Campaign not found" });
      }
    }, 200);
  });
}

export async function createCampaign(
  campaignData: Pick<CampaignRecord, "name" | "message" | "description" | "type">
) {
  return await new Promise<{ success: true; campaign: CampaignRecord }>((resolve) => {
    setTimeout(() => {
      const newCampaign: CampaignRecord = {
        id: `c_${String(campaigns.length + 1).padStart(3, "0")}`,
        status: "draft",
        createdBy: "Avery Hill",
        createdAt: new Date().toISOString(),
        stats: {
          sent: 0,
          delivered: 0,
          responded: 0,
          stop: 0,
          spam: 0,
          clicks: 0,
          segments: 0,
        },
        ...campaignData,
      };
      campaigns.push(newCampaign);
      resolve({ success: true, campaign: newCampaign });
    }, 200);
  });
}

export async function runCampaign(id: string) {
  return await new Promise<{ success: boolean; message: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Campaign ${id} queued for delivery.`,
      });
    }, 200);
  });
}

export const campaignService = {
  getCampaigns,
  getCampaign,
  createCampaign,
  runCampaign,
};
