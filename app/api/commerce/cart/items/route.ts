import { addCartItem } from "@/lib/commerce/cart";
import {
  cartCookieValue,
  cartResponse,
  commerceError
} from "@/lib/commerce/http";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      productId?: number;
      quantity?: number;
    };

    if (
      typeof body.productId !== "number" ||
      !Number.isInteger(body.productId) ||
      body.productId <= 0
    ) {
      return commerceError(new Error("A valid Woo productId is required."), 400);
    }

    const quantity =
      typeof body.quantity === "number" &&
      Number.isInteger(body.quantity) &&
      body.quantity > 0
        ? body.quantity
        : 1;

    const result = await addCartItem(
      cartCookieValue(request),
      body.productId,
      quantity
    );

    return cartResponse(result);
  } catch (error) {
    return commerceError(error);
  }
}
