import type { Metadata } from "next";
import { getCeramicProducts } from "@/lib/commerce/woo";
import { groupProductsByCollection } from "@/lib/collections";
import { CollectionInheritanceIndex } from "@/components/lab/CollectionInheritanceIndex";

export const metadata: Metadata = {
  title: "Lab · Collection Inheritance",
  robots: {
    index: false,
    follow: false
  }
};

export const revalidate = 60;

export default async function CollectionInheritanceLabPage() {
  const result = await getCeramicProducts();
  const collections = groupProductsByCollection(result.data).slice(0, 7);

  return <CollectionInheritanceIndex collections={collections} />;
}
