import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/commerce/woo";

type Context = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: Context) {
  const { slug } = await params;
  const result = await getProductBySlug(slug);

  if (!result.data) {
    return NextResponse.json(result, { status: 404 });
  }

  return NextResponse.json(result, {
    status: result.source === "live" ? 200 : 206
  });
}
