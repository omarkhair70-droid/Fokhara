import type { Metadata } from "next";
import { WorkshopExplorer } from "@/components/WorkshopExplorer";
import { workshops } from "@/lib/workshops";
import { withWorkshopMediaList } from "@/lib/commerce/workshop-media";

export const metadata: Metadata = {
  title: "Workshops"
};

export const revalidate = 60;

export default async function WorkshopsPage() {
  const visualWorkshops = await withWorkshopMediaList(workshops);
  return <WorkshopExplorer workshops={visualWorkshops} />;
}
