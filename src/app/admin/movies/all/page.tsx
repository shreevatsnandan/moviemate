import PageHeader from "@/app/admin/page-header";
import { metaObject } from "@/config/site";
import { MovieCardList } from "./movie-card-list";

export const metadata = {
  ...metaObject(),
};

const pageHeader = {
  breadcrumb: [
    {
      name: "Dashboard",
      href: "/admin",
    },
    {
      name: "Movies All",
    },
  ],
};

export default function MovieListPage() {
  return (
    <>
      <PageHeader breadcrumbs={pageHeader.breadcrumb}></PageHeader>
      <div className="flex flex-1 flex-col mb-10">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
            <MovieCardList />
          </div>
        </div>
      </div>
    </>
  );
}
