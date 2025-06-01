"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLayoutEffect } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

type MenuItem = {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: MenuItem[];
};

export function NavMain({
  items,
}: {
  items: {
    title: string;
    items: MenuItem[];
  }[];
}) {
  const pathname = usePathname();
  const activeItemRef = useRef<HTMLButtonElement>(null);

  // Scroll to active item on mount
  useEffect(() => {
    const target = activeItemRef.current;

    if (!target) return;

    const scrollToActive = () => {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    };

    // Ensure the element is visible in DOM
    const observer = new MutationObserver(() => {
      if (target.offsetHeight > 0) {
        scrollToActive();
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  const isActive = (url: string | undefined) => {
    if (!url) return false;
    return pathname.startsWith(url);
  };

  const isParentActive = (item: MenuItem) => {
    if (isActive(item.url)) return true;
    if (item.items) {
      return item.items.some((subItem) => isActive(subItem.url));
    }
    return false;
  };

  return (
    <>
      {items.map((section) => (
        <SidebarGroup key={section.title}>
          <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
          <SidebarMenu>
            {section.items.map((item) =>
              item.items && item.items.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={isParentActive(item)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={
                          isParentActive(item)
                            ? "bg-muted text-primary font-semibold"
                            : ""
                        }
                        ref={isActive(item.url) ? activeItemRef : undefined}
                      >
                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className={
                                isActive(subItem.url)
                                  ? "bg-accent text-primary font-medium"
                                  : ""
                              }
                              ref={
                                isActive(subItem.url) &&
                                !subItem.url?.startsWith("#")
                                  ? (activeItemRef as React.Ref<HTMLAnchorElement>)
                                  : undefined
                              }
                            >
                              <Link href={subItem.url || "#"}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={
                      isActive(item.url)
                        ? "bg-muted text-primary font-semibold"
                        : ""
                    }
                    ref={isActive(item.url) ? activeItemRef : undefined}
                  >
                    <Link href={item.url || "#"} className="flex items-center">
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
