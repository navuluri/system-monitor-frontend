export type Server = {
  id: string;
  ip: string;
  hostname: string;
  access_port: number;
  cpu_percent: number;
  cpu_count: number;
  memory_percent: number;
  memory_total: number;
  disk_usage: string;
  updated_on: number;
};
