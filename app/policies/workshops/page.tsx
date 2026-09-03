import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Workshop Policies",
  description:
    "Current publicly posted Fokhara workshop, attendance, studio and firing policies."
};

export default function WorkshopPoliciesPage() {
  return (
    <article className="policiesPage">
      <header className="policiesHero">
        <p className="eyebrow">Policies / current published rules</p>
        <h1>Know the studio rules before you commit.</h1>
        <p>
          This page reorganizes the workshop terms Fokhara currently publishes
          across its live workshop listings. It does not invent booking or
          refund rules beyond those public terms.
        </p>
      </header>

      <div className="policiesGrid">
        <section>
          <p className="eyebrow">01 / general</p>
          <h2>Booking and arrival</h2>
          <ul>
            <li>Workshop and course fees are currently published as non-refundable.</li>
            <li>A deposit is required up to 3 days before a course starts to secure a place.</li>
            <li>Arrival delays are allowed up to 15 minutes.</li>
            <li>Group classes require a minimum of 2 students.</li>
            <li>Full bookings may be moved to the nearest available date.</li>
          </ul>
        </section>

        <section>
          <p className="eyebrow">02 / attendance</p>
          <h2>Changes and cancellations</h2>
          <ul>
            <li>Students are currently allowed one class cancellation per month.</li>
            <li>A session may be cancelled up to 24 hours before class.</li>
            <li>Later cancellations are counted as attended under the published rules.</li>
          </ul>
        </section>

        <section>
          <p className="eyebrow">03 / shared studio</p>
          <h2>Working in the space</h2>
          <ul>
            <li>Stations should be cleaned within the workshop period.</li>
            <li>Aprons and tools should be returned to their designated areas.</li>
            <li>Clay tools and hands are washed in the studio’s designated kitchen area.</li>
            <li>The published rules ask participants to respect shared materials and space.</li>
          </ul>
        </section>

        <section>
          <p className="eyebrow">04 / firing and collection</p>
          <h2>What happens after making</h2>
          <ul>
            <li>Firing follows the studio kiln schedule.</li>
            <li>Cracked, broken or unstable pots may not be fired for safety reasons.</li>
            <li>Oversized pieces can carry additional firing charges.</li>
            <li>Participants collect ready pieces in their own box or bag.</li>
            <li>Published terms state that pieces left over 1 month may be disposed of to free storage.</li>
          </ul>
        </section>
      </div>

      <footer className="policiesExit">
        <p>
          Fokhara notes that official updates are announced through its studio
          channels, so current listing terms remain the operational source.
        </p>
        <div>
          <a
            href="https://fokharastudioandshop.com/product/pottery-hand-building-pottery-workshop-cairo/"
            target="_blank"
            rel="noreferrer"
          >
            Verify current published terms ↗
          </a>
          <Link href="/workshops">Back to workshops</Link>
        </div>
      </footer>
    </article>
  );
}
