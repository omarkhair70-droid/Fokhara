import {
  removeCartItem,
  updateCartItem
} from "@/lib/commerce/cart";
import {
  cartCookieValue,
  cartResponse,
  commerceError
} from "@/lib/commerce/http";

type Context = {
  params: Promise<{ key: string }>;
};

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: Context) {
  try {
    const { key } = await params;
    const body = (await request.json()) as { quantity?: number };

    if (
      typeof body.quantity !== "number" ||
      !Number.isInteger(body.quantity) ||
      body.quantity <= 0
    ) {
      return commerceError(new Error("Quantity must be a positive integer."), 400);
    }

    const result = await updateCartItem(
      cartCookieValue(request),
      key,
      body.quantity
    );

    return cartResponse(result);
  } catch (error) {
    return commerceError(error);
  }
}

export async function DELETE(request: Request, { params }: Context) {
  try {
    const { key } = await params;
    const result = await removeCartItem(cartCookieValue(request), key);
    return cartResponse(result);
  } catch (error) {
    return commerceError(error);
  }
}
