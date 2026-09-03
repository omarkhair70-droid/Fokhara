import type { Metadata } from "next";
import { WorkshopExplorer } from "@/components/WorkshopExplorer";
import { workshops } from "@/lib/workshops";

export const metadata: Metadata = {
  title: "Workshops"
};

export default function WorkshopsPage() {
  return <WorkshopExplorer workshops={workshops} />;
}
