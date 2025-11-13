import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircleIcon } from "lucide-react";

export default function Tip({
  trigger,
  description,
  displayIcon = false,
}: {
  trigger: string;
  description: string;
  displayIcon?: boolean;
}) {
  return (
    <div className="group relative flex">
      <Tooltip>
        <TooltipTrigger>
          <div className={"flex gap-1 items-center"}>
            <dt className="text-gray-500 dark:text-gray-400 flex flex-row">
              {trigger}
            </dt>
            {displayIcon && <HelpCircleIcon className={"h-3 w-3"} />}
          </div>
        </TooltipTrigger>
        <TooltipContent className={" text-sm w-52"}>
          <p className={"font-bold"}>{trigger}</p>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
