import Cpu from "@/components/cpu";
import Memory from "@/components/memory";
import Disk from "@/components/disk";
import Network from "@/components/network";
import Process from "@/components/process";

export default function Dashboard({
  host,
  port,
}: {
  host: string;
  port: number;
}) {
  return (
    <>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-4  lg:gap-2 md:grid-cols-2  md:gap-2 mb-3">
        <div>
          <Cpu host={host} port={port} />
        </div>
        <div>
          <Memory host={host} port={port} />
        </div>
        <div>
          <Disk host={host} port={port} />
        </div>
        <div>
          <Network host={host} port={port} />
        </div>
      </div>
      <div>
        <Process host={host} port={port} />
      </div>
    </>
  );
}
