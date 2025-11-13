"use client";

import { useEffect, useState } from "react";
import { Skeletons } from "@/components/skeletons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HardDrive } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Disk {
  total: string;
  available: string;
  used: string;
  free: string;
  used_percent: string;
  free_percent: string;
  partitions: Partition[];
}

interface Partition {
  device: string;
  total: string;
  used: string;
  free: string;
  used_percent: string;
  free_percent: string;
  fstype: string;
  mountpoint: string;
}

export default function Disk({ host, port }: { host: string; port: number }) {
  const [diskUsage, setDiskUsage] = useState<Disk | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchDisk = async () => {
      const res = await fetch("/api/disk?host=" + host + "&port=" + port);
      if (isMounted && res.ok) {
        const data = await res.json();
        const disk: Disk = {
          total: data.total,
          available: data.available,
          used: data.used,
          free: data.free,
          free_percent: data.free_percent,
          used_percent: data.used_percent,
          partitions: data.partitions,
        };
        setDiskUsage(disk);
      }
    };
    fetchDisk();
    const interval = setInterval(fetchDisk, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [host, port]);

  return (
    <div>
      {diskUsage ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-semibold text-gray-800 leading-none dark:text-gray-100 flex items-center gap-2">
                  <HardDrive /> Disk
                </CardTitle>
              </div>
              <div className="flex items-center">
                <Badge variant={"default"} className="text-sm font-medium">
                  {diskUsage.used_percent}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
              <div
                className="bg-black dark:bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${diskUsage.used_percent}` }}
              />
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Total
                  </div>
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {diskUsage.total}
                  </div>
                </div>
                <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Used
                  </div>
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {diskUsage.used}
                  </div>
                </div>
                <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Free
                  </div>
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {diskUsage.free}
                  </div>
                </div>
              </div>
            </div>

            {/*Individual Partitions*/}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-4">
                Individual Partitions
              </h4>
              <table className="min-w-full text-xs mt-2 rounded overflow-hidden">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left font-medium text-gray-500 dark:text-gray-400">
                      Mountpoint
                    </th>
                    <th className="px-2 py-1 text-left font-medium text-gray-500 dark:text-gray-400">
                      Total
                    </th>
                    <th className="px-2 py-1 text-left font-medium text-gray-500 dark:text-gray-400">
                      Used
                    </th>
                    <th className="px-2 py-1 text-left font-medium text-gray-500 dark:text-gray-400">
                      Free
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(diskUsage.partitions || [])
                    .slice(0, 4)
                    .map((partition: Partition, idx: number) => (
                      <tr
                        key={idx}
                        className="border-t border-gray-200 dark:border-gray-700"
                      >
                        <td className="px-2 py-1">{partition.mountpoint}</td>
                        <td className="px-2 py-1">{partition.total}</td>
                        <td className="px-2 py-1">{partition.used}</td>
                        <td className="px-2 py-1">{partition.free}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {diskUsage.partitions && diskUsage.partitions.length > 4 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Badge
                      aria-label="Show more CPU cores"
                      variant={"outline"}
                      className={"cursor-pointer"}
                    >
                      More
                    </Badge>
                  </PopoverTrigger>
                  <PopoverContent
                    className="lg:w-[600px]  lg:max-h-[400px]  md:w-[700px]  md:max-h-[400px] overflow-y-auto "
                    align="start"
                  >
                    <table className="min-w-full text-xs mt-2 rounded overflow-hidden">
                      <thead>
                        <tr>
                          <th className="px-2 py-1 text-left font-medium text-gray-500 dark:text-gray-400">
                            Mountpoint
                          </th>
                          <th className="px-2 py-1 text-left font-medium text-gray-500 dark:text-gray-400">
                            Total
                          </th>
                          <th className="px-2 py-1 text-left font-medium text-gray-500 dark:text-gray-400">
                            Used
                          </th>
                          <th className="px-2 py-1 text-left font-medium text-gray-500 dark:text-gray-400">
                            Free
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(diskUsage.partitions || []).map(
                          (partition: Partition, idx: number) => (
                            <tr
                              key={idx}
                              className="border-t border-gray-200 dark:border-gray-700"
                            >
                              <td className="px-2 py-1">
                                {partition.mountpoint}
                              </td>
                              <td className="px-2 py-1">{partition.total}</td>
                              <td className="px-2 py-1">{partition.used}</td>
                              <td className="px-2 py-1">{partition.free}</td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 pt-2 mt-6 border-t">
              <div>
                {parseFloat(diskUsage.used_percent) > 80 ? (
                  <Badge variant="destructive" className="text-xs">
                    High usage
                  </Badge>
                ) : parseFloat(diskUsage.used_percent) >= 60 ? (
                  <Badge
                    variant="default"
                    className="text-xs bg-amber-500 hover:bg-amber-600"
                  >
                    Optimal usage
                  </Badge>
                ) : parseFloat(diskUsage.used_percent) >= 40 ? (
                  <Badge
                    variant="default"
                    className="text-xs bg-green-500 hover:bg-green-600"
                  >
                    Moderate usage
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    Low usage
                  </Badge>
                )}
              </div>

              <div>
                Available{" "}
                <Badge variant="outline" className="text-xs">
                  {(100.0 - parseFloat(diskUsage.used_percent)).toFixed(2)}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Skeletons />
      )}
    </div>
  );
}
