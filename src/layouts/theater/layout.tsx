import { AppSidebar } from "@/layouts/theater/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function TheaterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
