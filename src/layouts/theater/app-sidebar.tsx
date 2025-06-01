"use client";

import * as React from "react";
import {
  BarChart,
  Film,
  Ticket,
  CalendarClock,
  Building,
  Users,
  MonitorPlay,
  LayoutDashboard,
  Settings,
  Receipt,
  Wallet,
  Star,
  Megaphone,
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
    name: "admin",
    email: "admin@moviemate.com",
    avatar: "/avatars/admin.jpg",
  },
  panel: [
    {
      name: "Main Admin",
      logo: ShieldCheck,
      href: "/admin",
      plan: "Main Admin",
    },
  ],
  navMain: [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: LayoutDashboard,
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
            { title: "All Movies", url: "/admin/movies/all" },
            { title: "Add Movie", url: "/admin/movies/add" },
            { title: "Categories", url: "/admin/movies/categories" },
          ],
        },
        {
          title: "Shows",
          icon: MonitorPlay,
          items: [
            { title: "All Shows", url: "/admin/shows" },
            { title: "Add Show", url: "/admin/shows/add" },
          ],
        },
      ],
    },
    {
      title: "Theaters",
      items: [
        {
          title: "Manage Theaters",
          icon: Building,
          url: "/admin/manage-theaters",
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
            { title: "All Bookings", url: "/admin/bookings" },
            { title: "Cancelled Tickets", url: "/admin/bookings/cancelled" },
            { title: "Refund Requests", url: "/admin/bookings/refunds" },
          ],
        },
        {
          title: "Reservation",
          icon: CalendarClock,
          url: "/admin/reservations",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Settings",
          icon: Settings,
          url: "/admin/settings",
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
