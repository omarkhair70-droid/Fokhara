import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingClient } from "@/components/BookingClient";
import { getWorkshop, workshops } from "@/lib/workshops";

type BookingPageProps = {
  params: Promise<{ workshopSlug: string }>;
};

export function generateStaticParams() {
  return workshops.map((workshop) => ({
    workshopSlug: workshop.slug
  }));
}

export async function generateMetadata({
  params
}: BookingPageProps): Promise<Metadata> {
  const { workshopSlug } = await params;
  const workshop = getWorkshop(workshopSlug);
  if (!workshop) return {};

  return {
    title: `Book ${workshop.name}`,
    description: `Prepare a booking request for ${workshop.name}.`
  };
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { workshopSlug } = await params;
  const workshop = getWorkshop(workshopSlug);
  if (!workshop) notFound();

  return <BookingClient workshop={workshop} />;
}
