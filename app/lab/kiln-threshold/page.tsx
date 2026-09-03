import type { Metadata } from "next";
import { KilnThresholdExperiment } from "@/components/lab/KilnThresholdExperiment";
import { workshops } from "@/lib/workshops";
import { withWorkshopMedia } from "@/lib/commerce/workshop-media";

export const metadata: Metadata = {
  title: "Lab · Kiln Threshold",
  robots: {
    index: false,
    follow: false
  }
};

export const revalidate = 60;

export default async function KilnThresholdLabPage() {
  const course = workshops.find((workshop) => workshop.id === "short-course")!;
  const workshop = await withWorkshopMedia(course);

  return <KilnThresholdExperiment workshop={workshop} />;
}
