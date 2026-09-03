import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { getProduct, products } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ productSlug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ productSlug: product.slug }));
}

export async function generateMetadata({
  params
}: ProductPageProps): Promise<Metadata> {
  const { productSlug } = await params;
  const product = getProduct(productSlug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name} — P0 product-detail prototype.`
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productSlug } = await params;
  const product = getProduct(productSlug);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
