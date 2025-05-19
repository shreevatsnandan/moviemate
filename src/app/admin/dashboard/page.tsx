import PageHeader from "@/app/admin/page-header";
import { metaObject } from "@/config/site";
import { SectionCards } from "@/app/admin/dashboard/section-cards";
import { ChartAreaInteractive } from "@/app/admin/dashboard/chart-area-interactive";
import { DataTable } from "@/app/admin/dashboard/data-table";
import data from "./data.json";

export const metadata = {
  ...metaObject(),
};

const pageHeader = {
  breadcrumb: [
    {
      name: "Dashboard",
    },
  ],
};

export default function AdminPage() {
  return (
    <>
      <PageHeader breadcrumbs={pageHeader.breadcrumb}></PageHeader>
      <div className="flex flex-1 flex-col mb-10">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
