import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkshopDetailClient } from "@/components/WorkshopDetailClient";
import { getWorkshop, workshops } from "@/lib/workshops";

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

  return <WorkshopDetailClient workshop={workshop} />;
}
