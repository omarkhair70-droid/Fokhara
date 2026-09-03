import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { getProductBySlug } from "@/lib/commerce/woo";
import {
  productStructuredData,
  serializeStructuredData
} from "@/lib/seo";

type ProductPageProps = {
  params: Promise<{ productSlug: string }>;
};

export const revalidate = 60;

export async function generateMetadata({
  params
}: ProductPageProps): Promise<Metadata> {
  const { productSlug } = await params;
  const { data: product } = await getProductBySlug(productSlug);

  if (!product) return {};

  return {
    title: product.name,
    description:
      product.description ?? `${product.name} — handmade ceramics by Fokhara.`
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productSlug } = await params;
  const { data: product } = await getProductBySlug(productSlug);

  if (!product) notFound();

  const structuredData = productStructuredData(product);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(structuredData)
        }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
