import type { Metadata } from "next";
import { StudioContactSheetExperiment } from "@/components/lab/StudioContactSheetExperiment";
import { workshops } from "@/lib/workshops";
import { withWorkshopMediaList } from "@/lib/commerce/workshop-media";

export const metadata: Metadata = {
  title: "Lab · Studio Contact Sheet",
  robots: {
    index: false,
    follow: false
  }
};

export const revalidate = 60;

export default async function StudioContactSheetLabPage() {
  const visualWorkshops = await withWorkshopMediaList(workshops);

  return <StudioContactSheetExperiment workshops={visualWorkshops} />;
}
