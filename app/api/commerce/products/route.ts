import { NextResponse } from "next/server";
import { getCeramicProducts } from "@/lib/commerce/woo";

export async function GET() {
  const result = await getCeramicProducts();

  return NextResponse.json(result, {
    status: result.source === "live" ? 200 : 206
  });
}
