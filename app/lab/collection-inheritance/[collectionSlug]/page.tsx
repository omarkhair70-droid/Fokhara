import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCeramicProducts } from "@/lib/commerce/woo";
import { findCollection } from "@/lib/collections";
import { CollectionInheritanceDestination } from "@/components/lab/CollectionInheritanceDestination";

type Props = {
  params: Promise<{ collectionSlug: string }>;
};

export const metadata: Metadata = {
  title: "Lab · Inherited Collection",
  robots: {
    index: false,
    follow: false
  }
};

export const revalidate = 60;

export default async function CollectionInheritanceDestinationPage({
  params
}: Props) {
  const { collectionSlug } = await params;
  const result = await getCeramicProducts();
  const collection = findCollection(result.data, collectionSlug);

  if (!collection) notFound();

  return <CollectionInheritanceDestination collection={collection} />;
}
