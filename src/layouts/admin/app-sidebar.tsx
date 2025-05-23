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
            { title: "Languages", url: "/admin/movies/languages" },
            { title: "Censor Ratings", url: "/admin/movies/censor-ratings" },
          ],
        },
        {
          title: "Shows",
          icon: MonitorPlay,
          items: [
            { title: "All Shows", url: "/admin/shows" },
            { title: "Add Show", url: "/admin/shows/add" },
            { title: "Schedule Show", url: "/admin/shows/schedule" },
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
          items: [
            { title: "All Theaters", url: "/admin/theaters" },
            { title: "Add Theater", url: "/admin/theaters/add" },
            { title: "Screens", url: "/admin/theaters/screens" },
            { title: "Seating Layout", url: "/admin/theaters/seating-layout" },
            { title: "Cities / Locations", url: "/admin/theaters/locations" },
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
      title: "Users & Staff",
      items: [
        {
          title: "Users",
          icon: Users,
          items: [
            { title: "All Users", url: "/admin/users" },
            { title: "Feedback & Ratings", url: "/admin/users/feedback" },
            { title: "Blocked Users", url: "/admin/users/blocked" },
          ],
        },
      ],
    },
    {
      title: "Payments & Reports",
      items: [
        {
          title: "Payments",
          icon: Wallet,
          items: [
            { title: "All Transactions", url: "/admin/payments" },
            { title: "Refunds", url: "/admin/refunds" },
          ],
        },
        {
          title: "Reports",
          icon: Receipt,
          items: [
            { title: "Revenue Report", url: "/admin/reports/revenue" },
            { title: "Show Performance", url: "/admin/reports/shows" },
            { title: "User Activity", url: "/admin/reports/users" },
          ],
        },
      ],
    },
    {
      title: "Promotions & Settings",
      items: [
        {
          title: "Marketing",
          icon: Megaphone,
          items: [
            { title: "Offers & Coupons", url: "/admin/marketing/offers" },
            { title: "Banner Management", url: "/admin/marketing/banners" },
            { title: "Notifications", url: "/admin/marketing/notifications" },
          ],
        },
        {
          title: "Settings",
          icon: Settings,
          items: [
            { title: "General Settings", url: "/admin/settings/general" },
            { title: "Tax & Commission", url: "/admin/settings/finance" },
            { title: "Email Templates", url: "/admin/settings/emails" },
          ],
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
