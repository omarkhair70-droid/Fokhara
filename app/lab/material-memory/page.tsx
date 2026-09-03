import type { Metadata } from "next";
import { MaterialMemoryExperiment } from "@/components/lab/MaterialMemoryExperiment";
import { getCeramicProducts } from "@/lib/commerce/woo";
import { featuredProduct as fallbackFeatured } from "@/lib/products";
import { materialStateForCollection } from "@/lib/visual/material-state";

export const metadata: Metadata = {
  title: "Lab · Material Memory",
  robots: {
    index: false,
    follow: false
  }
};

export const revalidate = 60;

export default async function MaterialMemoryLabPage() {
  const products = await getCeramicProducts();
  const product =
    products.data.find(
      (item) => item.stock === "in_stock" && item.collection === "Nebula" && item.image
    ) ??
    products.data.find((item) => item.stock === "in_stock" && item.image) ??
    products.data[0] ??
    fallbackFeatured;

  const material = materialStateForCollection(product.collection);

  return (
    <MaterialMemoryExperiment
      product={product}
      palette={{
        field: material.field,
        glaze: material.glaze,
        clay: material.clay,
        depth: material.depth,
        ink: material.ink
      }}
    />
  );
}
