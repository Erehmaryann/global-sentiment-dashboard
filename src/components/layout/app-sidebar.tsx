import type * as React from "react";
import { BarChart3, Globe, Home, Settings, TrendingUp, Map, PieChart, Calendar, FileText } from "lucide-react";

import { NavMain } from "@/components/layout/nav-main";
import { NavProjects } from "@/components/layout/nav-projects";
import { NavUser } from "@/components/layout/nav-user";
import { TeamSwitcher } from "@/components/layout/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

// This is sample data
const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/john-doe.jpg",
  },
  teams: [
    {
      name: "Global Analytics",
      logo: Globe,
      plan: "Enterprise",
    },
    {
      name: "Regional Insights",
      logo: Map,
      plan: "Pro",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/overview",
      icon: Home,
      isActive: true,

    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
      items: [
        {
          title: "Sentiment Analysis",
          url: "/analytics/sentiment",
        },
        {
          title: "Regional Trends",
          url: "/analytics/trends",
        },
        {
          title: "Comparative Analysis",
          url: "/analytics/compare",
        },
      ],
    },
    {
      title: "Reports",
      url: "/reports",
      icon: FileText,
      items: [
        {
          title: "Monthly Reports",
          url: "/reports/monthly",
        },
        {
          title: "Custom Reports",
          url: "/reports/custom",
        },
        {
          title: "Export Data",
          url: "/reports/export",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      items: [
        {
          title: "General",
          url: "/settings/general",
        },
        {
          title: "Data Sources",
          url: "/settings/data-sources",
        },
        {
          title: "Notifications",
          url: "/settings/notifications",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Global Sentiment 2024",
      url: "/projects/global-2024",
      icon: TrendingUp,
    },
    {
      name: "Regional Analysis",
      url: "/projects/regional",
      icon: PieChart,
    },
    {
      name: "Historical Data",
      url: "/projects/historical",
      icon: Calendar,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data?.teams} />
      </SidebarHeader>
      <SidebarContent className="px-4">
        <NavMain items={data?.navMain} />
        <NavProjects projects={data?.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
