import { NextResponse } from "next/server";
import { systemQuerySchema } from "@/lib/validation";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const result = systemQuerySchema.safeParse({
      host: searchParams.get("host"),
      port: searchParams.get("port"),
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid parameters", details: result.error.issues },
        { status: 400 },
      );
    }

    const { host, port } = result.data;

    const response = await fetch(`http://${host}:${port}/api/v1/disk`, {
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch disk data: ${response.statusText}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Disk API Error:", error);

    if (error instanceof Error && error.name === "TimeoutError") {
      return NextResponse.json({ error: "Request timeout" }, { status: 504 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
