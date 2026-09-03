import { NextResponse } from "next/server";
import { inspectStoreApi } from "@/lib/commerce/woo";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const inspection = await inspectStoreApi();

    return NextResponse.json({
      ok: true,
      checkedAt: new Date().toISOString(),
      ...inspection
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        checkedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown Store API error"
      },
      { status: 502 }
    );
  }
}
