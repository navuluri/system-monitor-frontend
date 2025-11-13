"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";
import { Separator } from "@/components/ui/separator";
import { AboutProcess } from "@/components/about-process";
import { TableSkeleton } from "@/components/skeletons";

interface Process {
  cpu_percent: number;
  num_threads: number;
  username: string;
  name: string;
  exe: string;
  memory_percent: number;
  pid: number;
  create_time: number;
  status: string;
  rss: number;
  vms: number;
  read: string;
  write: string;
  connections: number;
  is_zombie: boolean;
}

export default function Process({
  host,
  port,
}: {
  host: string;
  port: number;
}) {
  const [processInfo, setProcessInfo] = useState<Process[] | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProcess = async () => {
      const res = await fetch("/api/process?host=" + host + "&port=" + port);
      if (isMounted && res.ok) {
        const processes: Process[] = await res.json();
        setProcessInfo(processes);
      }
    };
    fetchProcess();
    return () => {
      isMounted = false;
    };
  }, [host, port]);
  return (
    <>
      <Separator />
      <div className={"text-gray-800 dark:text-gray-100 mb-1 mt-2"}>
        {processInfo ? (
          <>
            <AboutProcess />
            <DataTable columns={columns} data={processInfo} />
          </>
        ) : (
          <TableSkeleton />
        )}
      </div>
    </>
  );
}
