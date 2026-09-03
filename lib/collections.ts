import type { Product } from "@/lib/products";

export type ProductCollectionGroup = {
  name: string;
  slug: string;
  products: Product[];
  inStockCount: number;
  priceFromEgp: number;
};

export function collectionToSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function groupProductsByCollection(
  products: Product[]
): ProductCollectionGroup[] {
  const groups = new Map<string, Product[]>();

  for (const product of products) {
    if (!product.collection) continue;
    const current = groups.get(product.collection) ?? [];
    current.push(product);
    groups.set(product.collection, current);
  }

  return Array.from(groups.entries()).map(([name, items]) => ({
    name,
    slug: collectionToSlug(name),
    products: items,
    inStockCount: items.filter((product) => product.stock === "in_stock").length,
    priceFromEgp: Math.min(...items.map((product) => product.priceEgp))
  }));
}

export function findCollection(products: Product[], slug: string) {
  return groupProductsByCollection(products).find(
    (collection) => collection.slug === slug
  );
}
