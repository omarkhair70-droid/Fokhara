import { getOrCreateCart } from "@/lib/commerce/cart";
import {
  cartCookieValue,
  cartResponse,
  commerceError
} from "@/lib/commerce/http";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const result = await getOrCreateCart(cartCookieValue(request));
    return cartResponse(result);
  } catch (error) {
    return commerceError(error);
  }
}
