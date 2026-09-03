import type { Metadata } from "next";
import { ShopExplorer } from "@/components/ShopExplorer";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop"
};

export default function ShopPage() {
  return <ShopExplorer products={products} />;
}
