"use client";

import * as React from "react";
import {
  Film,
  Ticket,
  CalendarClock,
  Building,
  MonitorPlay,
  LayoutDashboard,
  Settings,
  ShieldCheck,
} from "lucide-react";

import { NavMain } from "@/layouts/admin/nav-main";
import { NavUser } from "@/layouts/admin/nav-user";
import { PanelSwitcher } from "@/layouts/admin/panel-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
export const sidebarData = {
  user: {
    name: "theater",
    email: "theater@moviemate.com",
    avatar: "/avatars/admin.jpg",
  },
  panel: [
    {
      name: "Main Admin",
      logo: ShieldCheck,
      href: "/theater",
      plan: "Main Admin",
    },
  ],
  navMain: [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/theater/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Cinema Hall",
      items: [
        {
          title: "Manage Hall",
          icon: Building,
          url: "/theater/manage-hall",
        },
      ],
    },
    {
      title: "Movies",
      items: [
        {
          title: "Movies",
          icon: Film,
          items: [
            { title: "All Movies", url: "/theater/movies/all" },
            { title: "Add Movie", url: "/theater/movies/add" },
            { title: "Categories", url: "/theater/movies/categories" },
          ],
        },
        {
          title: "Shows",
          icon: MonitorPlay,
          items: [
            { title: "All Shows", url: "/theater/shows" },
            { title: "Add Show", url: "/theater/shows/add" },
          ],
        },
      ],
    },
    {
      title: "Booking & Tickets",
      items: [
        {
          title: "Ticket Management",
          icon: Ticket,
          items: [
            { title: "All Bookings", url: "/theater/bookings" },
            { title: "Cancelled Tickets", url: "/theater/bookings/cancelled" },
            { title: "Refund Requests", url: "/theater/bookings/refunds" },
          ],
        },
        {
          title: "Reservation",
          icon: CalendarClock,
          url: "/theater/reservations",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Settings",
          icon: Settings,
          url: "/theater/settings",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <PanelSwitcher teams={sidebarData.panel} />
      </SidebarHeader>
      <SidebarContent className="scrollbar-hover scrollbar-custom">
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
