import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function ServerTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg   p-2 md:pt-0">
          <div className="md:hidden">
            <ServerMobileSkeleton />
            <ServerMobileSkeleton />
            <ServerMobileSkeleton />
            <ServerMobileSkeleton />
            <ServerMobileSkeleton />
            <ServerMobileSkeleton />
          </div>
          <table className="hidden min-w-full divide-y divide-gray-200 dark:divide-gray-700 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                >
                  IP
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                >
                  Hostname
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                >
                  CPU Usage
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                >
                  Memory Usage
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                >
                  Disk Usage
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-500"
                >
                  Updated
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-500"
                ></th>
              </tr>
            </thead>
            <tbody>
              <ServerRowSkeleton />
              <ServerRowSkeleton />
              <ServerRowSkeleton />
              <ServerRowSkeleton />
              <ServerRowSkeleton />
              <ServerRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function ServerMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md p-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800"></div>
          <div className="h-6 w-16 rounded bg-gray-100 dark:bg-gray-800"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-gray-800"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100 dark:bg-gray-800"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100 dark:bg-gray-800"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100 dark:bg-gray-800"></div>
        </div>
      </div>
    </div>
  );
}

export function ServerRowSkeleton() {
  return (
    <tr className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-6 w-24 rounded bg-gray-100 dark:bg-gray-800"></div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
        <div className="h-6 w-32 rounded bg-gray-100 dark:bg-gray-900"></div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-gray-900"></div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-gray-800"></div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-gray-800"></div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-gray-800"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-gray-800"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-gray-800"></div>
      </td>
    </tr>
  );
}

export function Skeletons() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2  animate-pulse ">
            <CardTitle
              className={`${shimmer} text-base font-semibold text-gray-800 leading-none dark:text-gray-100 flex items-center gap-2  animate-pulse `}
            >
              <div className=" h-8 w-8 rounded-full bg-accent  animate-pulse"></div>
            </CardTitle>
            <div className="h-5 w-24 rounded bg-accent"></div>
          </div>
          <div className="flex items-center">
            <div className="h-5 w-10 bg-accent  animate-pulse "></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex max-w-full h-2 rounded bg-accent  animate-pulse "></div>
        <div className="flex  h-5 rounded bg-accent mt-3  animate-pulse "></div>
        <div className={"grid grid-cols-3 gap-3 "}>
          <div>
            <div className="flex  h-6 rounded bg-accent mt-3  animate-pulse "></div>
          </div>
          <div>
            <div className="flex  h-6 rounded bg-accent mt-3  animate-pulse "></div>
          </div>
          <div>
            <div className="flex  h-6 rounded bg-accent mt-3  animate-pulse "></div>
          </div>
        </div>
        <div className="flex  h-5 rounded bg-accent mt-3  animate-pulse "></div>
        <div className="flex  h-16 rounded bg-accent mt-3  animate-pulse "></div>
      </CardContent>
    </Card>
  );
}

export function TableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="text-gray-800 dark:text-gray-100">
          <div className="md:hidden">
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-500 dark:text-gray-600 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  PID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  User
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  CPU%
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  MEM%
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  DISK IO(R/W)
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Network
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Threads
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  UP Since
                </th>
              </tr>
            </thead>
            <tbody>
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 dark:border-gray-800 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-4 w-[250px]" />
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-4 w-[250px]" />
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-4 w-[250px]" />
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-4 w-[250px]" />
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-4 w-[250px]" />
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-4 w-[250px]" />
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-4 w-[250px]" />
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-4 w-[250px]" />
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-4 w-[250px]" />
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-4 w-[250px]" />
      </td>
      <td className="whitespace-nowrap px-1 py-1">
        <Skeleton className="h-4 w-[250px]" />
      </td>
    </tr>
  );
}

export function MobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-accent p-4">
      <div className="flex items-center justify-between border-b    pb-8">
        <div className="flex items-center">
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <Skeleton className="h-4 w-[250px]" />
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <div className="flex justify-end gap-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
    </div>
  );
}
