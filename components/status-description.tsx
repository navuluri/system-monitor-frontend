import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InfoIcon } from "lucide-react";

export default function StatusDescription() {
  {
    return (
      <>
        <div>Status</div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <InfoIcon className={"size-4"} />
            </PopoverTrigger>
              <PopoverContent className="text-sm shadow-lg w-[360px]">
                  <div className="space-y-4">
                      <div className="space-y-1">
                          <h4 className="font-semibold text-base">Server Status</h4>
                          <p className="text-muted-foreground text-xs">
                              Status is determined by the last update time from the server.
                          </p>
                      </div>
                      <div className="space-y-3">
                          <div className="flex items-start gap-8">
        <span className="inline-flex items-center  bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 whitespace-nowrap">
          ● ACTIVE
        </span>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                  Server sent an update within the last minute
                              </p>
                          </div>
                          <div className="flex items-start gap-4">
        <span className="inline-flex items-center  bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 whitespace-nowrap">
          ● UNKNOWN
        </span>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                  No update received for 1-15 minutes
                              </p>
                          </div>
                          <div className="flex items-start gap-6">
        <span className="inline-flex items-center   bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 whitespace-nowrap">
          ● INACTIVE
        </span>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                  No update received for more than 15 minutes
                              </p>
                          </div>
                      </div>
                  </div>
              </PopoverContent>


          </Popover>
        </div>
      </>
    );
  }
}
