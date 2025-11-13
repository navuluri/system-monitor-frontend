import Search from "@/components/search";
import { Suspense } from "react";
import { ServerTableSkeleton } from "@/components/skeletons";
import Table from "@/components/table";
import Pagination from "@/components/pagination";
import { getServerCount } from "@/lib/data";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getServerCount(query);
  return (
    <div className="w-full p-5 items-center">
      <div className=" flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search IP and Servers..." />
      </div>
      <Suspense key={query + currentPage} fallback={<ServerTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
