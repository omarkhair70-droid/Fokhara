import { NextResponse } from "next/server";
import { inspectPaymentCapabilities } from "@/lib/commerce/woo";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const capabilities = await inspectPaymentCapabilities();

    return NextResponse.json({
      ok: true,
      ...capabilities
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Could not inspect Woo payment capabilities"
      },
      { status: 502 }
    );
  }
}
