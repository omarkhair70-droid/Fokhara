import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Current Fokhara Studio address, posted hours and contact details."
};

const hours = [
  ["Saturday", "7 PM – 10 PM"],
  ["Tuesday", "7 PM – 10 PM"],
  ["Wednesday", "7 PM – 10 PM"],
  ["Thursday", "11 AM – 2 PM"]
];

export default function VisitPage() {
  return (
    <section className="visitPage">
      <header className="visitHero">
        <p className="eyebrow">Visit / practical</p>
        <h1>Find the studio. Then work with the material.</h1>
        <p>
          Current public studio details, kept deliberately separate from live
          workshop availability.
        </p>
      </header>

      <div className="visitGrid">
        <section className="visitAddress">
          <p className="eyebrow">Place</p>
          <h2>
            Villa 313
            <br />
            Yasmin 1
            <br />
            1st Settlement
            <br />
            New Cairo, Egypt
          </h2>
          <a
            className="buttonPrimary"
            href="https://www.google.com/maps/search/?api=1&query=Villa+313+Yasmin+1+1st+Settlement+New+Cairo+Egypt"
            target="_blank"
            rel="noreferrer"
          >
            Open directions
          </a>
        </section>

        <section className="visitHours">
          <p className="eyebrow">Current posted studio hours</p>
          <dl>
            {hours.map(([day, time]) => (
              <div key={day}>
                <dt>{day}</dt>
                <dd>{time}</dd>
              </div>
            ))}
          </dl>
          <p>
            These are the hours Fokhara currently publishes publicly. They are
            not a promise of workshop seat availability.
          </p>
        </section>

        <section className="visitContact">
          <p className="eyebrow">Contact</p>
          <a href="tel:+201000540019">+20 100 054 0019</a>
          <a href="mailto:fokhara@outlook.com">fokhara@outlook.com</a>
        </section>

        <section className="visitPickup">
          <p className="eyebrow">Objects / pickup</p>
          <h2>Shop listings currently point back to the studio.</h2>
          <p>
            Current ceramic product descriptions state that products are
            available for pickup at the studio.
          </p>
          <div>
            <Link href="/shop">Browse ceramics</Link>
            <Link href="/workshops">Explore workshops</Link>
          </div>
        </section>
      </div>
    </section>
  );
}
