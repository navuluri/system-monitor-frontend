import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DateFormatter({ millis }: { millis: string }) {
  const millisecs = parseInt(millis);
  return (
    <div suppressHydrationWarning>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>{timeSince(new Date(millisecs))}</TooltipTrigger>
          <TooltipContent>
            <div>{new Date(millisecs).toLocaleString()}</div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function timeSince(date: Date) {
  const currentDate = new Date();
  let seconds: number = Math.floor(
    (currentDate.getTime() - date.getTime()) / 1000,
  );
  let interval: number = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
