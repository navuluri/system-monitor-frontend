import { getServers } from "@/lib/data";
import Actions from "@/components/actions";
import DateFormatter from "@/components/date-formatter";
import Status from "@/components/status";
import StatusDescription from "@/components/status-description";
import { Server } from "@/lib/definitions";
import UsageBadge from "@/components/usage-badge";

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const servers = await getServers(query, currentPage);

  return (
    <div className="mt-6 flow-root  ">
      <div className="inline-block  min-w-full align-middle">
        <div className="p-2 md:pt-0">
          <div className="md:hidden">
            {servers?.map((server: Server) => (
              <div
                key={server.id}
                className="mb-4 w-full mt-2 shadow-lg rounded-lg  border border-gray-200 p-4 dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex gap-3 items-start justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {server.ip}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {server.hostname}
                    </p>
                  </div>
                  <div className="ml-4">
                    <Status millis={"" + server.updated_on} />
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex flex-row gap-3 justify-between">
                    <div className="text-center flex-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        CPU
                      </p>
                      <UsageBadge usage={server.cpu_percent} />
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Memory
                      </p>
                      <UsageBadge usage={server.memory_percent} />
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Disk
                      </p>
                      <UsageBadge usage={parseFloat(server.disk_usage)} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <DateFormatter millis={"" + server.updated_on} />
                    </div>
                    <div className="flex gap-2">
                      <Actions ip={server.ip} port={server.access_port} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full divide-y divide-gray-200 dark:divide-gray-700 md:table shadow-lg ">
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
                  <div className={"flex items-center gap-1"}>
                    <StatusDescription />
                  </div>
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
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                >
                  Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {servers?.map((server: Server) => (
                <tr
                  key={server.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                    <p>{server.ip}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                    {server.hostname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                    <Status millis={"" + server.updated_on} />
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                    <UsageBadge usage={server.cpu_percent} />
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                    <UsageBadge usage={server.memory_percent} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                    <UsageBadge usage={parseFloat(server.disk_usage)} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                    <DateFormatter millis={"" + server.updated_on} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                    <div className={"flex justify-center items-center gap-2"}>
                      <Actions ip={server.ip} port={server.access_port} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
