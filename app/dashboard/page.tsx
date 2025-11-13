import Dashboard from "@/components/dashboard";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { host } = await searchParams;
  const { port } = await searchParams;
  return (
    <main className={"pt-18 px-2"}>
      <div>
        <Dashboard host={host} port={parseInt(port)} />
      </div>
    </main>
  );
}
