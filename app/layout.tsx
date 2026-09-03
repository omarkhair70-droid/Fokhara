import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { CarryProvider } from "@/features/carry/CarryProvider";
import { SiteShell } from "@/components/SiteShell";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
  axes: ["wdth"]
});

export const metadata: Metadata = {
  title: {
    default: "Fokhara — The Form Remembers",
    template: "%s — Fokhara"
  },
  description:
    "Fokhara Studio & Shop in New Cairo — handmade ceramics, pottery workshops, courses and studio visits."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <body>
        <CarryProvider>
          <SiteShell>{children}</SiteShell>
        </CarryProvider>
      </body>
    </html>
  );
}
