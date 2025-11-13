export default function Status({ millis }: { millis: string }) {
  const millisecs = parseInt(millis);
  const currentTime = Date.now();
  const timeDiff = currentTime - millisecs;
  let status: string;
  if (timeDiff < 60000) {
    // less than 1 minute
    status = "active";
  } else if (timeDiff > 900000) {
    // greater than 15 minutes
    status = "inactive";
  } else {
    // between 1 minute and 15 minutes
    status = "unknown";
  }
  return (
    <div>
      {status === "active" && (
        <span className="inline-flex items-center   bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          ● ACTIVE
        </span>
      )}
      {status === "inactive" && (
        <span className="inline-flex items-center  bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
          ● INACTIVE
        </span>
      )}
      {status === "unknown" && (
        <span className="inline-flex items-center  bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
          ● UNKNOWN
        </span>
      )}
    </div>
  );
}
