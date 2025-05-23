// Mock data for campaigns
const campaigns = [
  {
    id: '1',
    name: 'Welcome Campaign',
    description: 'Initial outreach to new leads',
    status: 'active',
    createdAt: '2025-05-01T12:00:00Z',
    totalContacts: 156,
    sentCount: 145,
    responseCount: 23,
    tags: ['welcome', 'new-leads'],
    message: 'Hi {{name}}, welcome to Onryl! Reply INFO to learn more about our services.',
  },
  {
    id: '2',
    name: 'Follow-up Campaign',
    description: 'Follow up with leads who did not respond',
    status: 'scheduled',
    scheduledFor: '2025-05-25T10:00:00Z',
    createdAt: '2025-05-10T15:30:00Z',
    totalContacts: 87,
    sentCount: 0,
    responseCount: 0,
    tags: ['follow-up', 'reminder'],
    message: 'Hi {{name}}, just checking in - are you still interested in our services? Reply YES to learn more.',
  },
  {
    id: '3',
    name: 'Renewal Reminder',
    description: 'Remind customers about upcoming renewals',
    status: 'completed',
    createdAt: '2025-04-15T09:45:00Z',
    completedAt: '2025-04-20T14:30:00Z',
    totalContacts: 45,
    sentCount: 45,
    responseCount: 28,
    tags: ['renewal', 'existing-customers'],
    message: 'Hi {{name}}, your subscription is due for renewal on {{renewal_date}}. Reply RENEW to continue your service.',
  },
  {
    id: '4',
    name: 'Product Announcement',
    description: 'Announce new features to existing customers',
    status: 'draft',
    createdAt: '2025-05-20T08:15:00Z',
    totalContacts: 0,
    sentCount: 0,
    responseCount: 0,
    tags: ['announcement', 'product-update'],
    message: 'Hi {{name}}, we\'ve just released some exciting new features! Check them out at onryl.com/new-features',
  },
];

// Function to get all campaigns
export async function getCampaigns() {
  // Simulate API request
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        campaigns: campaigns,
      });
    }, 300);
  });
}

// Function to get a specific campaign by ID
export async function getCampaign(id: string) {
  // Simulate API request
  return await new Promise((resolve) => {
    setTimeout(() => {
      const campaign = campaigns.find((c) => c.id === id);
      
      if (campaign) {
        resolve({
          success: true,
          campaign,
        });
      } else {
        resolve({
          success: false,
          error: 'Campaign not found',
        });
      }
    }, 300);
  });
}

// Function to create a new campaign
export async function createCampaign(campaignData: any) {
  // Simulate API request
  return await new Promise((resolve) => {
    setTimeout(() => {
      const newCampaign = {
        id: String(campaigns.length + 1),
        createdAt: new Date().toISOString(),
        sentCount: 0,
        responseCount: 0,
        status: 'draft',
        ...campaignData,
      };
      
      // In a real app, this would be added to the database
      campaigns.push(newCampaign as any);
      
      resolve({
        success: true,
        campaign: newCampaign,
      });
    }, 300);
  });
}

// Function to update an existing campaign
export async function updateCampaign(id: string, campaignData: any) {
  // Simulate API request
  return await new Promise((resolve) => {
    setTimeout(() => {
      const campaignIndex = campaigns.findIndex((c) => c.id === id);
      
      if (campaignIndex === -1) {
        resolve({
          success: false,
          error: 'Campaign not found',
        });
        return;
      }
      
      const updatedCampaign = {
        ...campaigns[campaignIndex],
        ...campaignData,
      };
      
      // In a real app, this would update the record in the database
      campaigns[campaignIndex] = updatedCampaign as any;
      
      resolve({
        success: true,
        campaign: updatedCampaign,
      });
    }, 300);
  });
}

// Function to delete a campaign
export async function deleteCampaign(id: string) {
  // Simulate API request
  return await new Promise((resolve) => {
    setTimeout(() => {
      const campaignIndex = campaigns.findIndex((c) => c.id === id);
      
      if (campaignIndex === -1) {
        resolve({
          success: false,
          error: 'Campaign not found',
        });
        return;
      }
      
      // In a real app, this would delete the record from the database
      const deletedCampaign = campaigns.splice(campaignIndex, 1)[0];
      
      resolve({
        success: true,
        campaign: deletedCampaign,
      });
    }, 300);
  });
}

// Function to run a campaign
export async function runCampaign(id: string) {
  // Simulate API request
  return await new Promise((resolve) => {
    setTimeout(() => {
      const campaign = campaigns.find((c) => c.id === id);
      
      if (!campaign) {
        resolve({
          success: false,
          error: 'Campaign not found',
        });
        return;
      }
      
      // In a real app, this would trigger the sending of messages
      // through a job queue or similar mechanism
      
      resolve({
        success: true,
        message: `Campaign ${id} is now running`,
      });
    }, 300);
  });
}

// Function to pause a campaign
export async function pauseCampaign(id: string) {
  // Simulate API request
  return await new Promise((resolve) => {
    setTimeout(() => {
      const campaignIndex = campaigns.findIndex((c) => c.id === id);
      
      if (campaignIndex === -1) {
        resolve({
          success: false,
          error: 'Campaign not found',
        });
        return;
      }
      
      const campaign = campaigns[campaignIndex];
      
      if (campaign.status !== 'active') {
        resolve({
          success: false,
          error: 'Campaign is not active',
        });
        return;
      }
      
      // In a real app, this would pause the sending of messages
      campaigns[campaignIndex] = {
        ...campaign,
        status: 'paused',
      } as any;
      
      resolve({
        success: true,
        message: `Campaign ${id} is now paused`,
      });
    }, 300);
  });
}

// Function to resume a campaign
export async function resumeCampaign(id: string) {
  // Simulate API request
  return await new Promise((resolve) => {
    setTimeout(() => {
      const campaignIndex = campaigns.findIndex((c) => c.id === id);
      
      if (campaignIndex === -1) {
        resolve({
          success: false,
          error: 'Campaign not found',
        });
        return;
      }
      
      const campaign = campaigns[campaignIndex];
      
      if (campaign.status !== 'paused') {
        resolve({
          success: false,
          error: 'Campaign is not paused',
        });
        return;
      }
      
      // In a real app, this would resume the sending of messages
      campaigns[campaignIndex] = {
        ...campaign,
        status: 'active',
      } as any;
      
      resolve({
        success: true,
        message: `Campaign ${id} is now active`,
      });
    }, 300);
  });
}

// Export all functions
export const campaignService = {
  getCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  runCampaign,
  pauseCampaign,
  resumeCampaign,
};