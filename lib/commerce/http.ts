import { NextResponse } from "next/server";
import type { CartResult } from "@/lib/commerce/cart";
import { CART_COOKIE } from "@/lib/commerce/cart";

export function cartCookieValue(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${CART_COOKIE}=([^;]+)`)
  );

  return match ? decodeURIComponent(match[1]) : undefined;
}

export function cartResponse(result: CartResult, status = 200) {
  const response = NextResponse.json(result.cart, { status });

  response.cookies.set(CART_COOKIE, result.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });

  return response;
}

export function commerceError(error: unknown, status = 502) {
  return NextResponse.json(
    {
      error: error instanceof Error ? error.message : "Commerce request failed"
    },
    { status }
  );
}
