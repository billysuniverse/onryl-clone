"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  MessageSquare,
  Users,
  Activity,
  CircleCheck,
} from "lucide-react";
import { AreaChart, BarChart as BarChartComponent, PieChart } from "recharts";

// Mock data for the dashboard
const messagesData = [
  { name: "Mon", sent: 120, received: 20 },
  { name: "Tue", sent: 150, received: 30 },
  { name: "Wed", sent: 180, received: 45 },
  { name: "Thu", sent: 135, received: 25 },
  { name: "Fri", sent: 90, received: 15 },
  { name: "Sat", sent: 40, received: 8 },
  { name: "Sun", sent: 30, received: 5 },
];

const campaignPerformanceData = [
  { name: "Welcome", success: 85, pending: 10, failed: 5 },
  { name: "Follow-up", success: 75, pending: 15, failed: 10 },
  { name: "Renewal", success: 90, pending: 7, failed: 3 },
  { name: "Promo", success: 80, pending: 12, failed: 8 },
];

const responseRateData = [
  { name: "Responded", value: 25 },
  { name: "No Response", value: 75 },
];

const userActivityData = [
  { name: "Jan", activity: 15 },
  { name: "Feb", activity: 20 },
  { name: "Mar", activity: 35 },
  { name: "Apr", activity: 45 },
  { name: "May", activity: 55 },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        {/* Stats overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,384</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">+2 new this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-xs text-muted-foreground">+85 new contacts</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.8%</div>
              <p className="text-xs text-muted-foreground">+2.3% from last month</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Message Activity</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                {/* Message activity chart would go here */}
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-muted-foreground">Message activity chart visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                {/* Campaign performance chart would go here */}
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-muted-foreground">Campaign performance visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent activity and quick actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CircleCheck className="mr-2 h-4 w-4 text-primary" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium leading-none">Campaign "Welcome Series" completed</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-primary" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium leading-none">24 new contacts added</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4 text-primary" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium leading-none">New response from John Doe</p>
                    <p className="text-xs text-muted-foreground">Yesterday at 3:45 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Response Rate</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                {/* Response rate chart would go here */}
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-muted-foreground">Response rate visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}