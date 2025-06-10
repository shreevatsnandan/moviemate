import PageHeader from "@/app/theater/page-header";
import { metaObject } from "@/config/site";
import { BookingManagement } from "./bookings";

export const metadata = {
  ...metaObject(),
};

const pageHeader = {
  breadcrumb: [
    {
      name: "Dashboard",
      href: "/theater",
    },
    {
      name: "Booking Management",
    },
  ],
};

export default function BookingListPage() {
  return (
    <>
      <PageHeader breadcrumbs={pageHeader.breadcrumb}></PageHeader>
      <div className="flex flex-1 flex-col mb-10">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
            <BookingManagement />
          </div>
        </div>
      </div>
    </>
  );
}
