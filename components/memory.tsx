"use client";

import { useEffect, useState } from "react";
import { Skeletons } from "@/components/skeletons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MemoryStickIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Tip from "@/components/tip";

interface Memory {
  total: string;
  available: string;
  used: string;
  free: string;
  percent: string;
  active: string;
  inactive: string;
  shared: string;
  buffers: string;
  cached: string;
  slab: string;
}

export default function Memory({ host, port }: { host: string; port: number }) {
  const [memoryUsage, setMemoryUsage] = useState<Memory | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchMemory = async () => {
      const res = await fetch("/api/memory?host=" + host + "&port=" + port);
      if (isMounted && res.ok) {
        const memoryInfo: Memory = await res.json();
        setMemoryUsage(memoryInfo);
      }
    };
    fetchMemory();
    const interval = setInterval(fetchMemory, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [host, port]);

  return (
    <div>
      {memoryUsage ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-semibold text-gray-800 leading-none dark:text-gray-100 flex items-center gap-2">
                  <MemoryStickIcon /> Memory
                </CardTitle>
              </div>
              <div className="flex items-center">
                <Badge variant={"default"} className="text-sm font-medium">
                  {memoryUsage.percent}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
              <div
                className="bg-black dark:bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${memoryUsage.percent}` }}
              />
            </div>

            <dl className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4  text-sm lg:grid-cols-4 gap-x-6 gap-y-3 mt-2">
              <div className="contents">
                <Tip
                  trigger="Total"
                  description="Total physical memory (exclusive swap)"
                />
                <dd className="text-right">{memoryUsage.total}</dd>
              </div>
              <div className="contents">
                <Tip
                  trigger="Available"
                  description={
                    "The memory that can be given instantly to processes without the system going into swap. This is calculated by summing different memory metrics that vary depending on the platform. It is supposed to be used to monitor actual memory usage in a cross platform fashion"
                  }
                />
                <dd className="text-right">{memoryUsage.available}</dd>
              </div>
              <div className="contents">
                <Tip
                  trigger="Free"
                  description={
                    "Memory not being used at all (zeroed) that is readily available; note that this doesn’t reflect the actual memory available (use available instead). 'total - used' does not necessarily match 'free'"
                  }
                ></Tip>
                <dd className="text-right">{memoryUsage.free}</dd>
              </div>
              <div className="contents">
                <Tip
                  trigger="Used"
                  description={
                    "Memory used, calculated differently depending on the platform and designed for informational purposes only. 'total - free' does not necessarily match 'used'"
                  }
                ></Tip>
                <dd className="text-right">{memoryUsage.used}</dd>
              </div>
              <div className="contents">
                <Tip
                  trigger={"Active"}
                  description={
                    "Memory currently in use or very recently used, and so it is in RAM"
                  }
                />
                <dd className="text-right">{memoryUsage.active}</dd>
              </div>
              <div className="contents">
                <Tip
                  trigger={"Inactive"}
                  description={"Memory that is marked as not used"}
                />
                <dd className="text-right">{memoryUsage.inactive}</dd>
              </div>
              <div className="contents">
                <Tip
                  trigger={"Buffers"}
                  description={
                    "Cache for things like file system metadata. A memory buffer is a region of physical or virtual memory that’s reserved for temporarily holding data while it’s being transferred between two places"
                  }
                />
                <dd className="text-right">{memoryUsage.buffers}</dd>
              </div>
              <div className="contents">
                <Tip
                  trigger={"Cached"}
                  description={
                    "Cache for various things. Cache memory is a small, very fast type of volatile memory located close to the CPU (often inside the processor chip itself). It stores copies of frequently used data and instructions from main memory (RAM), so the CPU can access them much more quickly."
                  }
                />
                <dd className="text-right">{memoryUsage.cached}</dd>
              </div>
              <div className="contents">
                <Tip
                  trigger={"Shared"}
                  description={
                    "Memory that may be simultaneously accessed by multiple processes. Shared memory is a block of memory that multiple processes (or threads) can access at the same time. It’s one of the fastest Inter-Process Communication (IPC) mechanisms, because processes don’t need to copy data back and forth — they directly read/write into the same memory region"
                  }
                />
                <dd className="text-right">{memoryUsage.shared}</dd>
              </div>
              <div className="contents">
                <Tip
                  trigger={"Slab"}
                  description={
                    "In-kernel data structures cache. Slab memory allocation is a memory management technique used by operating systems (notably Linux) to efficiently allocate and manage memory for kernel objects. Instead of repeatedly allocating and freeing small chunks of memory (which causes fragmentation and overhead), the OS uses slabs — pre-allocated blocks of memory divided into smaller chunks of fixed size."
                  }
                />
                <dd className="text-right">{memoryUsage.slab}</dd>
              </div>
            </dl>

            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 pt-2 mt-6 border-t">
              <div>
                {parseFloat(memoryUsage.percent) > 90 ? (
                  <Badge variant="destructive" className="text-xs">
                    High usage
                  </Badge>
                ) : parseFloat(memoryUsage.percent) >= 70 ? (
                  <Badge
                    variant="default"
                    className="text-xs bg-amber-500 hover:bg-amber-600"
                  >
                    Optimal usage
                  </Badge>
                ) : parseFloat(memoryUsage.percent) >= 40 ? (
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
                  {(100.0 - parseFloat(memoryUsage.percent)).toFixed(2)}%
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
