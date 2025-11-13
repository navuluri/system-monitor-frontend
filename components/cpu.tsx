"use client";

import { useEffect, useState } from "react";
import { Skeletons } from "@/components/skeletons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CpuIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CPU {
  cores: number;
  utilization: number;
  perCoreUtilization: number[];
  avg: number[];
}

export default function Cpu({ host, port }: { host: string; port: number }) {
  const [cpuUsage, setCpuUsage] = useState<CPU | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCPU = async () => {
      const res = await fetch("/api/cpu?host=" + host + "&port=" + port);
      if (isMounted && res.ok) {
        const data = await res.json();
        const cpu: CPU = {
          cores: data.physical_cpu_count,
          utilization: data.cpu_utilization,
          perCoreUtilization: data.per_cpu_utilization,
          avg: data.load_avg,
        };
        setCpuUsage(cpu);
      }
    };
    fetchCPU();
    const interval = setInterval(fetchCPU, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [host, port]);

  return (
    <div>
      {cpuUsage ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-semibold text-gray-800 leading-none dark:text-gray-100 flex items-center gap-2">
                  <CpuIcon /> CPU
                </CardTitle>
                <div className="text-sm text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-800 px-2 py-1 rounded-md leading-none flex items-center">
                  {cpuUsage.cores} Cores
                </div>
              </div>
              <div className="flex items-center">
                <Badge variant={"default"} className="text-sm font-medium">
                  {cpuUsage.utilization}%
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-4">
              {/* Overall progress bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-black dark:bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${cpuUsage.utilization}%` }}
                ></div>
              </div>

              {/* CPU Load Averages */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Load Average
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      1 min
                    </div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {cpuUsage.avg[0].toFixed(2)}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      5 min
                    </div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {cpuUsage.avg[1].toFixed(2)}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      15 min
                    </div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {cpuUsage.avg[2].toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Individual cores */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Individual Cores
                </h4>
                {(cpuUsage.perCoreUtilization || [])
                  .slice(0, 4)
                  .map((usage: number, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        Core {idx + 1}
                      </span>
                      <div className="flex items-center gap-2 flex-1 ml-3">
                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                          <div
                            className="bg-black dark:bg-white h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${usage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-right">
                          {usage}%
                        </span>
                      </div>
                    </div>
                  ))}
                {cpuUsage.perCoreUtilization &&
                  cpuUsage.perCoreUtilization.length > 4 && (
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
                        className="lg:w-[700px]  lg:max-h-[400px]  md:w-[700px]  md:max-h-[400px] overflow-y-auto "
                        align="start"
                      >
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-1 lg:pr-1 md:grid-cols-4 md:gap-1 md:pr-1">
                            {cpuUsage.perCoreUtilization.map(
                              (usage: number, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-1 p-1 min-w-0"
                                >
                                  <span className="text-xs text-gray-500 dark:text-gray-300 w-16 flex-shrink-0">
                                    Core {idx + 1}
                                  </span>
                                  <div className="flex items-center gap-1 flex-1 min-w-0">
                                    <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700 min-w-0">
                                      <div
                                        className="bg-black dark:bg-white h-1 rounded-full transition-all duration-300"
                                        style={{ width: `${usage}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-right flex-shrink-0">
                                      {usage}%
                                    </span>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
              </div>

              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 pt-2 border-t">
                <div>
                  {cpuUsage.utilization > 90 ? (
                    <Badge variant="destructive" className="text-xs">
                      High usage
                    </Badge>
                  ) : cpuUsage.utilization >= 70 ? (
                    <Badge
                      variant="default"
                      className="text-xs bg-amber-500 hover:bg-amber-600"
                    >
                      Optimal usage
                    </Badge>
                  ) : cpuUsage.utilization >= 40 ? (
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
                    {100 - cpuUsage.utilization}%
                  </Badge>
                </div>
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
