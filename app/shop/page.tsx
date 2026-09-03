import type { Metadata } from "next";
import { ShopExplorer } from "@/components/ShopExplorer";
import { getCeramicProducts } from "@/lib/commerce/woo";

export const metadata: Metadata = {
  title: "Shop"
};

export const revalidate = 60;

export default async function ShopPage() {
  const result = await getCeramicProducts();

  return (
    <ShopExplorer
      products={result.data}
      dataSource={result.source}
      dataError={result.error}
    />
  );
}
