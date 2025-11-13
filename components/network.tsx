"use client";

import { useEffect, useState } from "react";
import { Skeletons } from "@/components/skeletons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NetworkIcon } from "lucide-react";

interface Network {
  bytes_sent: string;
  bytes_recv: string;
  packets_sent: number;
  packets_recv: number;
  num_sockets: number;
  num_interfaces: number;
  err_in: number;
  err_out: number;
  interfaces: Interface[];
}

interface Interface {
  nic: string;
  bytes_sent: string;
  bytes_recv: string;
  packets_sent: number;
  packets_recv: number;
  stats: {
    isup: boolean;
    duplex: string;
    speed: number;
    mtu: number;
  };
}

interface System {
  boot_time: number;
  users: Array<{
    name: string;
    terminal: string;
    host: string;
    started: number;
    pid: number;
  }>;
}

export default function Network({
  host,
  port,
}: {
  host: string;
  port: number;
}) {
  const [networkUsage, setNetworkUsage] = useState<Network | null>(null);
  const [systemUsage, setSystemUsage] = useState<System | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchNetwork = async () => {
      const res = await fetch("/api/network?host=" + host + "&port=" + port);
      if (isMounted && res.ok) {
        const data = await res.json();
        const network: Network = {
          bytes_sent: data.bytes_sent,
          bytes_recv: data.bytes_recv,
          packets_sent: data.packets_sent,
          packets_recv: data.packets_recv,
          num_sockets: data.num_sockets,
          num_interfaces: data.num_interfaces,
          err_in: data.errin,
          err_out: data.errout,
          interfaces: data.interfaces,
        };
        setNetworkUsage(network);
      }
    };
    const fetchSystem = async () => {
      const res = await fetch("/api/system?host=" + host + "&port=" + port);
      if (isMounted && res.ok) {
        const data = await res.json();
        const system: System = {
          boot_time: data.boot_time,
          users: data.users,
        };
        setSystemUsage(system);
      }
    };
    fetchNetwork();
    fetchSystem();
    const network_interval = setInterval(fetchNetwork, 5000);
    const system_interval = setInterval(fetchNetwork, 5000);
    return () => {
      isMounted = false;
      clearInterval(network_interval);
      clearInterval(system_interval);
    };
  }, [host, port]);

  return (
    <div>
      {networkUsage ? (
        <div className={"space-y-4 w-fit"}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base font-semibold text-gray-800 leading-none dark:text-gray-100 flex items-center gap-2">
                    <NetworkIcon /> Network
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      NICs
                    </div>
                    <div className="text-xs font-medium text-gray-800 dark:text-gray-100">
                      {networkUsage.num_interfaces}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Sockets
                    </div>
                    <div className="text-xs font-medium text-gray-800 dark:text-gray-100">
                      {networkUsage.num_sockets}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Up Since
                    </div>
                    <div className="text-xs font-medium text-gray-800 dark:text-gray-100">
                      {systemUsage?.boot_time} Days
                    </div>
                  </div>
                  <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Users
                    </div>
                    <div className="text-xs font-medium text-gray-800 dark:text-gray-100">
                      {systemUsage?.users.length}
                    </div>
                  </div>
                </div>
                <table className="min-w-full text-xs rounded overflow-hidden mt-4">
                  <thead>
                    <tr>
                      <th className="px-2 py-1 text-left font-medium text-gray-500 dark:text-gray-400">
                        &nbsp;
                      </th>
                      <th className="px-2 py-1 text-left font-medium text-gray-500 dark:text-gray-400">
                        Sent
                      </th>
                      <th className="px-2 py-1 text-left font-medium text-gray-500 dark:text-gray-400">
                        Received
                      </th>
                      <th className="px-2 py-1 text-left font-medium text-gray-500 dark:text-gray-400">
                        Err. In
                      </th>
                      <th className="px-2 py-1 text-left font-medium text-gray-500 dark:text-gray-400">
                        Err. Out
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-2 py-1">Bytes</td>
                      <td className="px-2 py-1">{networkUsage.bytes_sent}</td>
                      <td className="px-2 py-1">{networkUsage.bytes_recv}</td>
                      <td className="px-2 py-1">0</td>
                      <td className="px-2 py-1">0</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700 truncate">
                      <td className="px-2 py-1">Packets</td>
                      <td className="px-2 py-1">{networkUsage.packets_sent}</td>
                      <td className="px-2 py-1">{networkUsage.packets_recv}</td>
                      <td className="px-2 py-1">0</td>
                      <td className="px-2 py-1">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Skeletons />
      )}
    </div>
  );
}
