"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import DateFormatter from "@/components/date-formatter";
import Tip from "@/components/tip";

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

export const columns: ColumnDef<Process>[] = [
  {
    id: "PID",
    accessorKey: "pid",
    header: ({ column }) => {
      return (
        <div
          className={"pl-4 flex items-left justify-left"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Tip
            trigger={"PID"}
            description={
              "Process Identifier. A unique number assigned to each running process."
            }
            displayIcon={true}
          />
          <ArrowUpDown className="ml-2 h-3 w-3 mt-1 text-gray-400 dark:text-gray-500" />
        </div>
      );
    },
  },
  {
    id: "Name",
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          className={"pl-4 flex items-left justify-left"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Tip
            trigger={"Name"}
            description={
              "The name of the process (usually the program or executable filename)"
            }
            displayIcon={true}
          />
          <ArrowUpDown className="ml-2 h-3 w-3 mt-1 text-gray-400 dark:text-gray-500" />
        </div>
      );
    },
  },
  {
    id: "Status",
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          className={"pl-4 flex items-left justify-left"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Tip trigger={"Status"} description={STATUS} displayIcon={true} />
          <ArrowUpDown className="ml-2 h-3 w-3 mt-1 text-gray-400 dark:text-gray-500" />
        </div>
      );
    },
  },
  {
    id: "User",
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <div
          className={"pl-4 flex items-left justify-left"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Tip
            trigger={"User"}
            description={"The user account under which the process is running"}
            displayIcon={true}
          />
          <ArrowUpDown className="ml-2 h-3 w-3 mt-1 text-gray-400 dark:text-gray-500" />
        </div>
      );
    },
  },
  {
    id: "CPU%",
    accessorKey: "cpu_percent",
    header: ({ column }) => {
      return (
        <div
          className={"pl-4 flex items-left justify-left"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Tip
            trigger={"CPU%"}
            description={
              "The percentage of CPU resources currently used by the process"
            }
            displayIcon={true}
          />
          <ArrowUpDown className=" ml-2 h-3 w-3 mt-1 text-gray-400 dark:text-gray-500" />
        </div>
      );
    },
  },
  {
    id: "RAM%",
    accessorKey: "memory_percent",
    header: ({ column }) => {
      return (
        <div
          className={"pl-4 flex items-left justify-left"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Tip
            trigger={"RAM%"}
            description={
              "The percentage of system RAM being consumed by the process"
            }
            displayIcon={true}
          />
          <ArrowUpDown className="ml-2 h-3 w-3 mt-1 text-gray-400 dark:text-gray-500" />
        </div>
      );
    },
    cell: ({ row }) => {
      return row.original.memory_percent.toFixed(2);
    },
  },
  {
    id: "RSS",
    accessorKey: "rss",
    header: ({ column }) => {
      return (
        <div
          className={"pl-4 flex items-left justify-left"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Tip trigger={"RSS"} description={RSS} displayIcon={true} />
          <ArrowUpDown className="ml-2 h-3 w-3 mt-1 text-gray-400 dark:text-gray-500" />
        </div>
      );
    },
  },
  {
    id: "VMS",
    accessorKey: "vms",
    header: ({ column }) => {
      return (
        <div
          className={"pl-4 flex items-left justify-left"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Tip trigger={"VMS"} description={VMS} displayIcon={true} />
          <ArrowUpDown className="ml-2 h-3 w-3 mt-1 text-gray-400 dark:text-gray-500" />
        </div>
      );
    },
  },
  {
    id: "Disk IO",
    accessorKey: "read",
    header: ({ column }) => {
      return (
        <div
          className={"pl-4 flex items-left justify-left"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Tip
            trigger={"Disk IO (R/W)"}
            description={DISK}
            displayIcon={true}
          />
          <ArrowUpDown className="ml-2 h-3 w-3 mt-1 text-gray-400 dark:text-gray-500" />
        </div>
      );
    },
    cell: ({ row }) => {
      return row.original.read + "/" + row.original.write;
    },
  },
  {
    id: "Sockets",
    accessorKey: "connections",
    header: ({ column }) => {
      return (
        <div
          className={"pl-4 flex items-left justify-left"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Tip
            trigger={"Sockets"}
            description={"Number of socket connections opened by process"}
            displayIcon={true}
          />
          <ArrowUpDown className="ml-2 h-3 w-3 mt-1 text-gray-400 dark:text-gray-500" />
        </div>
      );
    },
  },
  {
    id: "Threads",
    accessorKey: "num_threads",
    header: ({ column }) => {
      return (
        <div
          className={"pl-4 flex items-left justify-left"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Tip
            trigger={"Threads"}
            description={
              "The number of threads currently being used by the process."
            }
            displayIcon={true}
          />
          <ArrowUpDown className="ml-2 h-3 w-3 mt-1 text-gray-400 dark:text-gray-500" />
        </div>
      );
    },
  },
  {
    id: "Up Since",
    accessorKey: "create_time",
    header: ({ column }) => {
      return (
        <div
          className={"pl-4 flex items-left justify-left"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Tip
            trigger={"Up since"}
            description={"The timestamp when the process was started."}
            displayIcon={true}
          />
          <ArrowUpDown className="ml-2 h-3 w-3 mt-1 text-gray-400 dark:text-gray-500" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <DateFormatter millis={"" + row.original.create_time * 1000} />;
    },
  },
  {
    id: "Zombie?",
    accessorKey: "is_zombie",
    header: ({ column }) => {
      return (
        <div
          className={"pl-4 flex items-left justify-left "}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Tip trigger={"Zombie?"} description={ZOMBIE} displayIcon={true} />
          <ArrowUpDown className="ml-2 h-3 w-3 mt-1 text-gray-400 dark:text-gray-500" />
        </div>
      );
    },
    cell: ({ row }) => (row.original.is_zombie ? "Yes" : "No"),
  },
  {
    id: "Exe",
    accessorKey: "exe",
    header: () => {
      return (
        <Tip
          trigger={"Exe"}
          description={"The full path to the executable binary of the process."}
          displayIcon={true}
        />
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-3 w-3 mt-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText("" + row.original.pid)
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
const VMS: string =
  "The total virtual address space a process has requested - includes All code, data, stack, heap, and memory-mapped files. Think of it as: “How much virtual memory is the process using?” Example:\n" +
  "If a Python process has vms = 300 MB, then the process has requested 300 MB of virtual memory space. However, not all of this memory is necessarily in RAM; some may be swapped out or not yet allocated.";
const RSS: string =
  "Resident Set Size - The actual portion of the process’s memory that is currently held in physical RAM - this includes Stack, Heap and Loaded shared libraries (if in RAM). Think of it as: “How much RAM is the process using right now? Example:\n" +
  "If a Python process has rss = 50 MB, then 50 MB of its memory pages are currently loaded in real RAM.";
const STATUS: string =
  "The current state of the process. Common statuses include:\n" +
  "Running: The process is actively executing on the CPU.\n" +
  "Sleeping: The process is idle, waiting for an event or resource (like I/O operations).\n" +
  "Stopped: The process has been paused, often by receiving a signal.\n" +
  "Zombie: The process has completed execution but still has an entry in the process table (it’s a 'defunct' process waiting for its parent to read its exit status).\n" +
  "Dead: The process is terminated and will be removed from the process table.\n" +
  "Idle: The process is not currently active or running.";
const DISK: string =
  "Total number of bytes the process has actually read from disk/Total number of bytes the process has written to disk.";
const ZOMBIE: string =
  "A zombie process is a process that has finished executing (it has exited), but still has an entry in the process table. This happens because The process has terminated, but its parent process has not yet read its exit status (via a system call like wait() or waitpid())";
