export default function UsageBadge({ usage }: { usage: number }) {
  let colorClass = "bg-green-500";
  if (usage > 75) {
    colorClass = "bg-red-500";
  } else if (usage > 50) {
    colorClass = "bg-yellow-500";
  } else if (usage > 25) {
    colorClass = "bg-blue-500";
  }
  return (
    <span className={`text-white px-2 py-1  text-xs  ${colorClass}`}>
      {usage}%
    </span>
  );
}
