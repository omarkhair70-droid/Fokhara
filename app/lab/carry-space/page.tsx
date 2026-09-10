import type { Metadata } from "next";
import { CarrySpaceExperiment } from "@/components/lab/CarrySpaceExperiment";
import { getCeramicProducts } from "@/lib/commerce/woo";
import { featuredProduct as fallbackFeatured } from "@/lib/products";

export const metadata: Metadata = {
  title: "Lab · Carry Becomes Space",
  robots: {
    index: false,
    follow: false
  }
};

export const revalidate = 60;

export default async function CarrySpaceLabPage() {
  const products = await getCeramicProducts();
  const product =
    products.data.find(
      (item) => item.stock === "in_stock" && item.image
    ) ??
    products.data[0] ??
    fallbackFeatured;

  return <CarrySpaceExperiment product={product} />;
}
