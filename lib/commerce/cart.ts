const STORE_ORIGIN =
  process.env.FOKHARA_STORE_ORIGIN ?? "https://fokharastudioandshop.com";

const STORE_API = `${STORE_ORIGIN.replace(/\/$/, "")}/wp-json/wc/store/v1`;

export const CART_COOKIE = "fokhara_cart_token";

type WooMoney = {
  price?: string;
  regular_price?: string;
  currency_minor_unit?: number;
};

type WooLineTotals = {
  line_subtotal?: string;
  line_total?: string;
  currency_minor_unit?: number;
};

type WooCartItem = {
  key?: string;
  id?: number;
  quantity?: number;
  name?: string;
  prices?: WooMoney;
  totals?: WooLineTotals;
  images?: Array<{ src?: string; alt?: string }>;
};

type WooCartTotals = {
  total_items?: string;
  total_price?: string;
  currency_minor_unit?: number;
};

type WooCart = {
  items?: WooCartItem[];
  items_count?: number;
  totals?: WooCartTotals;
  needs_payment?: boolean;
  needs_shipping?: boolean;
  payment_requirements?: string[];
  errors?: Array<{ code?: string; message?: string }>;
};

export type CartLine = {
  key: string;
  productId: number;
  name: string;
  quantity: number;
  unitPriceEgp: number;
  lineTotalEgp: number;
  image?: { src: string; alt: string };
};

export type Cart = {
  items: CartLine[];
  count: number;
  subtotalEgp: number;
  totalEgp: number;
  needsPayment: boolean;
  needsShipping: boolean;
  paymentRequirements: string[];
  errors: string[];
};

export type CartResult = {
  cart: Cart;
  token: string;
};

function money(raw: string | undefined, minor = 2) {
  const value = Number(raw ?? "0");
  return Number.isFinite(value) ? value / 10 ** minor : 0;
}

function normalizeCart(raw: WooCart): Cart {
  const items = Array.isArray(raw.items)
    ? raw.items
        .filter(
          (item): item is WooCartItem & {
            key: string;
            id: number;
            name: string;
          } =>
            typeof item.key === "string" &&
            typeof item.id === "number" &&
            typeof item.name === "string"
        )
        .map((item) => {
          const priceMinor = item.prices?.currency_minor_unit ?? 2;
          const totalMinor = item.totals?.currency_minor_unit ?? priceMinor;
          const image = item.images?.find((candidate) => candidate.src);

          return {
            key: item.key,
            productId: item.id,
            name: item.name,
            quantity: item.quantity ?? 1,
            unitPriceEgp: money(item.prices?.price, priceMinor),
            lineTotalEgp: money(item.totals?.line_total, totalMinor),
            image: image?.src
              ? { src: image.src, alt: image.alt || item.name }
              : undefined
          };
        })
    : [];

  const totalMinor = raw.totals?.currency_minor_unit ?? 2;

  return {
    items,
    count:
      typeof raw.items_count === "number"
        ? raw.items_count
        : items.reduce((sum, item) => sum + item.quantity, 0),
    subtotalEgp: money(raw.totals?.total_items, totalMinor),
    totalEgp: money(raw.totals?.total_price, totalMinor),
    needsPayment: Boolean(raw.needs_payment),
    needsShipping: Boolean(raw.needs_shipping),
    paymentRequirements: Array.isArray(raw.payment_requirements)
      ? raw.payment_requirements.filter(
          (item): item is string => typeof item === "string"
        )
      : [],
    errors: Array.isArray(raw.errors)
      ? raw.errors
          .map((error) => error.message)
          .filter((message): message is string => Boolean(message))
      : []
  };
}

async function wooCartFetch(
  path: string,
  token?: string,
  init?: RequestInit
) {
  return fetch(`${STORE_API}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(token ? { "Cart-Token": token } : {}),
      ...init?.headers
    }
  });
}

async function parseCartResponse(response: Response, fallbackToken?: string) {
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      body && typeof body === "object" && "message" in body
        ? String(body.message)
        : `Woo cart request failed with ${response.status}`;

    throw new Error(message);
  }

  const token = response.headers.get("Cart-Token") ?? fallbackToken;
  if (!token) {
    throw new Error("Woo cart response did not provide a Cart-Token.");
  }

  return {
    cart: normalizeCart(body as WooCart),
    token
  } satisfies CartResult;
}

export async function getOrCreateCart(
  token?: string
): Promise<CartResult> {
  let response = await wooCartFetch("/cart", token);

  if (!response.ok && token) {
    response = await wooCartFetch("/cart");
    return parseCartResponse(response);
  }

  return parseCartResponse(response, token);
}

export async function addCartItem(
  token: string | undefined,
  productId: number,
  quantity: number
): Promise<CartResult> {
  const session = await getOrCreateCart(token);

  const params = new URLSearchParams({
    id: String(productId),
    quantity: String(quantity)
  });

  const response = await wooCartFetch(
    `/cart/add-item?${params.toString()}`,
    session.token,
    { method: "POST" }
  );

  return parseCartResponse(response, session.token);
}

export async function updateCartItem(
  token: string | undefined,
  key: string,
  quantity: number
): Promise<CartResult> {
  const session = await getOrCreateCart(token);

  const params = new URLSearchParams({
    key,
    quantity: String(quantity)
  });

  const response = await wooCartFetch(
    `/cart/update-item?${params.toString()}`,
    session.token,
    { method: "POST" }
  );

  return parseCartResponse(response, session.token);
}

export async function removeCartItem(
  token: string | undefined,
  key: string
): Promise<CartResult> {
  const session = await getOrCreateCart(token);

  const params = new URLSearchParams({ key });
  const response = await wooCartFetch(
    `/cart/remove-item?${params.toString()}`,
    session.token,
    { method: "POST" }
  );

  return parseCartResponse(response, session.token);
}
