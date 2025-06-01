import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export type PageHeaderTypes = {
  breadcrumbs: { name: string; href?: string }[];
  className?: string;
};

export default function PageHeader({
  breadcrumbs,
  children,
  className,
}: React.PropsWithChildren<PageHeaderTypes>) {
  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/60 border-b flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return isLast ? (
                  <BreadcrumbPage key={item.name}>{item.name}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink {...(item.href && { href: item.href })}>
                      {item.name}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
          {children}
        </div>
      </header>
    </>
  );
}
