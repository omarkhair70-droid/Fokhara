import type { Product, ProductForm } from "@/lib/products";
import { fallbackProducts, getFallbackProduct } from "@/lib/products";

const STORE_ORIGIN =
  process.env.FOKHARA_STORE_ORIGIN ?? "https://fokharastudioandshop.com";

const STORE_API = `${STORE_ORIGIN.replace(/\/$/, "")}/wp-json/wc/store/v1`;

type WooTerm = {
  id?: number;
  name?: string;
  slug?: string;
};

type WooImage = {
  src?: string;
  alt?: string;
};

type WooPrices = {
  price?: string;
  regular_price?: string;
  sale_price?: string;
  currency_code?: string;
  currency_minor_unit?: number;
};

type WooProduct = {
  id?: number;
  name?: string;
  slug?: string;
  permalink?: string;
  type?: string;
  description?: string;
  short_description?: string;
  prices?: WooPrices;
  categories?: WooTerm[];
  tags?: WooTerm[];
  images?: WooImage[];
  is_in_stock?: boolean;
  is_on_backorder?: boolean;
  is_purchasable?: boolean;
  has_options?: boolean;
};

export type CommerceSource = "live" | "fixture";

export type ProductResult<T> = {
  data: T;
  source: CommerceSource;
  error?: string;
};

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function decodeEntities(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'");
}

function plainTextFromHtml(value?: string) {
  if (!value) return undefined;
  const stripped = value
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return stripped ? decodeEntities(stripped) : undefined;
}

function money(prices?: WooPrices, key: "price" | "regular_price" = "price") {
  const raw = prices?.[key];
  if (!raw) return 0;

  const minor = Number.isInteger(prices?.currency_minor_unit)
    ? prices!.currency_minor_unit!
    : 2;

  const numeric = Number(raw);
  if (!Number.isFinite(numeric)) return 0;

  return numeric / 10 ** minor;
}

function productForm(name: string): ProductForm {
  const lower = name.toLowerCase();
  if (lower.includes("espresso")) return "espresso";
  if (lower.includes("pinch")) return "pinch";
  if (lower.includes("mug")) return "mug";
  return "other";
}

const collectionNames = [
  "Nebula",
  "Midnight",
  "Ocean",
  "Foggy",
  "Lazuli",
  "Latte Foam",
  "Seaweed"
] as const;

function collectionFrom(product: WooProduct) {
  const tagMatch = product.tags?.find((tag) =>
    collectionNames.some(
      (collection) => tag.name?.toLowerCase() === collection.toLowerCase()
    )
  );

  if (tagMatch?.name) {
    return {
      collection: tagMatch.name,
      collectionSource: "tag" as const
    };
  }

  const name = product.name ?? "";
  const prefix = collectionNames.find((collection) =>
    name.toLowerCase().startsWith(collection.toLowerCase())
  );

  if (prefix) {
    return {
      collection: prefix,
      collectionSource: "name_prefix" as const
    };
  }

  return {
    collection: undefined,
    collectionSource: "unknown" as const
  };
}

function materialAccent(collection?: string) {
  switch (collection?.toLowerCase()) {
    case "nebula":
      return { accent: "#6f7083", accentInk: "#f7f2e9" };
    case "midnight":
      return { accent: "#282b2e", accentInk: "#f4efe4" };
    case "ocean":
      return { accent: "#42767a", accentInk: "#eff6f2" };
    default:
      return { accent: "#6d6a62", accentInk: "#f5f2ea" };
  }
}

function normalizeProduct(value: unknown): Product | null {
  if (!isObject(value)) return null;

  const product = value as unknown as WooProduct;
  if (
    typeof product.id !== "number" ||
    typeof product.name !== "string" ||
    typeof product.slug !== "string"
  ) {
    return null;
  }

  const { collection, collectionSource } = collectionFrom(product);
  const accent = materialAccent(collection);

  const categorySlugs =
    product.categories
      ?.map((category) => category.slug)
      .filter((slug): slug is string => Boolean(slug)) ?? [];

  const tagSlugs =
    product.tags
      ?.map((tag) => tag.slug)
      .filter((slug): slug is string => Boolean(slug)) ?? [];

  const image = product.images?.find((candidate) => candidate.src);

  const stock: Product["stock"] = product.is_on_backorder
    ? "on_backorder"
    : product.is_in_stock
      ? "in_stock"
      : "out_of_stock";

  return {
    id: String(product.id),
    wooId: product.id,
    slug: product.slug,
    name: decodeEntities(product.name),
    priceEgp: money(product.prices),
    regularPriceEgp: money(product.prices, "regular_price") || undefined,
    stock,
    collection,
    collectionSource,
    form: productForm(product.name),
    description:
      plainTextFromHtml(product.short_description) ??
      plainTextFromHtml(product.description),
    sourceUrl:
      product.permalink ??
      `${STORE_ORIGIN.replace(/\/$/, "")}/product/${product.slug}/`,
    image: image?.src
      ? {
          src: image.src,
          alt: image.alt || product.name
        }
      : undefined,
    categorySlugs,
    tagSlugs,
    purchasable: product.is_purchasable,
    hasOptions: product.has_options,
    ...accent
  };
}

async function storeFetch(path: string, init?: RequestInit) {
  const response = await fetch(`${STORE_API}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "User-Agent": "Fokhara-Redesign/0.1",
      ...init?.headers
    },
    next: init?.cache === "no-store" ? undefined : { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error(
      `Woo Store API ${response.status} ${response.statusText} for ${path}`
    );
  }

  return response;
}

export async function getCeramicProducts(): Promise<ProductResult<Product[]>> {
  try {
    const response = await storeFetch("/products?per_page=100");
    const raw = await response.json();

    const normalized = asArray(raw)
      .map(normalizeProduct)
      .filter((product): product is Product => Boolean(product));

    const ceramics = normalized.filter((product) =>
      product.categorySlugs?.some((slug) =>
        slug.includes("ceramics-by-fokhara")
      )
    );

    if (ceramics.length === 0) {
      throw new Error(
        "Store API returned products but no ceramics category matched."
      );
    }

    if (process.env.VERCEL_ENV === "preview") {
      console.info(
        "[fokhara-commerce]",
        JSON.stringify({
          source: "live",
          totalProducts: normalized.length,
          ceramicProducts: ceramics.length,
          categorySlugs: Array.from(
            new Set(ceramics.flatMap((product) => product.categorySlugs ?? []))
          ),
          tagSlugs: Array.from(
            new Set(ceramics.flatMap((product) => product.tagSlugs ?? []))
          ),
          collections: ceramics.map((product) => ({
            slug: product.slug,
            collection: product.collection ?? null,
            source: product.collectionSource ?? null,
            stock: product.stock,
            priceEgp: product.priceEgp,
            hasImage: Boolean(product.image)
          }))
        })
      );
    }

    return { data: ceramics, source: "live" };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Store API error";

    if (process.env.VERCEL_ENV === "preview") {
      console.warn("[fokhara-commerce]", JSON.stringify({
        source: "fixture",
        error: message
      }));
    }

    return {
      data: fallbackProducts,
      source: "fixture",
      error: message
    };
  }
}

export async function getProductBySlug(
  slug: string
): Promise<ProductResult<Product | null>> {
  try {
    const response = await storeFetch(
      `/products?slug=${encodeURIComponent(slug)}`
    );
    const raw = await response.json();
    const first = asArray(raw).map(normalizeProduct).find(Boolean) ?? null;

    return { data: first, source: "live" };
  } catch (error) {
    return {
      data: getFallbackProduct(slug) ?? null,
      source: "fixture",
      error: error instanceof Error ? error.message : "Unknown Store API error"
    };
  }
}

export async function inspectStoreApi() {
  const productResponse = await storeFetch("/products?per_page=100", {
    cache: "no-store"
  });
  const categoryResponse = await storeFetch("/products/categories?per_page=100", {
    cache: "no-store"
  });
  const tagResponse = await storeFetch("/products/tags?per_page=100", {
    cache: "no-store"
  });

  const [products, categories, tags] = await Promise.all([
    productResponse.json(),
    categoryResponse.json(),
    tagResponse.json()
  ]);

  const productList = asArray(products);
  const categoryList = asArray(categories);
  const tagList = asArray(tags);

  return {
    origin: STORE_ORIGIN,
    products: {
      count: productList.length,
      sample: productList.slice(0, 4).map((item) => {
        if (!isObject(item)) return null;
        return {
          id: item.id,
          name: item.name,
          slug: item.slug,
          type: item.type,
          categories: item.categories,
          tags: item.tags,
          prices: item.prices,
          is_in_stock: item.is_in_stock,
          is_purchasable: item.is_purchasable,
          has_options: item.has_options,
          image: Array.isArray(item.images) ? item.images[0] : undefined
        };
      })
    },
    categories: categoryList.map((item) =>
      isObject(item)
        ? {
            id: item.id,
            name: item.name,
            slug: item.slug,
            parent: item.parent,
            count: item.count
          }
        : null
    ),
    tags: tagList.map((item) =>
      isObject(item)
        ? {
            id: item.id,
            name: item.name,
            slug: item.slug,
            count: item.count
          }
        : null
    )
  };
}


export async function inspectPaymentCapabilities() {
  const response = await storeFetch("/cart", { cache: "no-store" });
  const cart = (await response.json()) as Record<string, unknown>;

  return {
    paymentMethods: Array.isArray(cart.payment_methods)
      ? cart.payment_methods
      : [],
    paymentRequirements: Array.isArray(cart.payment_requirements)
      ? cart.payment_requirements
      : [],
    needsPayment: Boolean(cart.needs_payment),
    needsShipping: Boolean(cart.needs_shipping),
    hasCalculatedShipping: Boolean(cart.has_calculated_shipping)
  };
}
