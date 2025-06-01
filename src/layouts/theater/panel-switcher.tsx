"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

export function PanelSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
    href: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex items-center gap-3 rounded-md p-2 hover:bg-sidebar-muted transition-colors w-full">
                {/* Logo */}
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-sidebar-primary">
                  <Image
                    src="/images/Logo.png"
                    alt="Movie Mate Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>

                {/* App Name & Plan */}
                <div className="flex flex-col justify-center text-left">
                  <span className="font-semibold text-sm leading-tight text-sidebar-foreground">
                    Movie Mate
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {activeTeam.plan}
                  </span>
                </div>

                <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Panel
            </DropdownMenuLabel>
            {teams.map((team) => (
              <Link key={team.name} href={team.href}>
                <DropdownMenuItem
                  onClick={() => setActiveTeam(team)}
                  className="gap-2 p-2 cursor-pointer"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <team.logo className="size-4 shrink-0" />
                  </div>
                  {team.name}

                  {team.name !== "Main Admin" && (
                    <DropdownMenuShortcut>
                      <Badge variant="outline">Soon</Badge>
                    </DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
