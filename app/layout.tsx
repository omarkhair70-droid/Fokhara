import type { Metadata } from "next";
import "./globals.css";
import { CarryProvider } from "@/features/carry/CarryProvider";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: {
    default: "Fokhara — The Form Remembers",
    template: "%s — Fokhara"
  },
  description:
    "Experimental P0 redesign prototype for Fokhara Studio & Shop."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CarryProvider>
          <SiteShell>{children}</SiteShell>
        </CarryProvider>
      </body>
    </html>
  );
}
