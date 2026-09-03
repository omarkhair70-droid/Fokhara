import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkshopDetailClient } from "@/components/WorkshopDetailClient";
import { getWorkshop, workshops } from "@/lib/workshops";
import { getCeramicProducts } from "@/lib/commerce/woo";
import {
  serializeStructuredData,
  workshopStructuredData
} from "@/lib/seo";

type WorkshopPageProps = {
  params: Promise<{ workshopSlug: string }>;
};

export function generateStaticParams() {
  return workshops.map((workshop) => ({
    workshopSlug: workshop.slug
  }));
}

export async function generateMetadata({
  params
}: WorkshopPageProps): Promise<Metadata> {
  const { workshopSlug } = await params;
  const workshop = getWorkshop(workshopSlug);
  if (!workshop) return {};

  return {
    title: workshop.name,
    description: workshop.summary
  };
}

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const { workshopSlug } = await params;
  const workshop = getWorkshop(workshopSlug);
  if (!workshop) notFound();

  const products = await getCeramicProducts();
  const structuredData = workshopStructuredData(workshop);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(structuredData)
        }}
      />
      <WorkshopDetailClient
      workshop={workshop}
        relatedProducts={products.data}
      />
    </>
  );
}
