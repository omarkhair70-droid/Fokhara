import type { Metadata } from "next";
import Link from "next/link";
import { StudioEvidence } from "@/components/StudioEvidence";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Fokhara Studio, Dalia Mobasher, and the practice behind the objects and workshops."
};

export default function StudioPage() {
  return (
    <article className="studioPage">
      <header className="studioHero">
        <p className="eyebrow">Studio / practice</p>
        <h1>A place where clay is learned, not only displayed.</h1>
        <p>
          Fokhara’s current public offer holds two things together: pottery
          workshops and courses, and handmade ceramics by Dalia Mobasher.
        </p>
      </header>

      <StudioEvidence />

      <section className="studioOrigin">
        <div className="studioOrigin__index">2018</div>
        <div>
          <p className="eyebrow">Origin / New Cairo</p>
          <h2>Engineering → teaching → studio.</h2>
          <p>
            Dalia Mobasher previously worked in highway-design engineering,
            taught pottery in Abu Dhabi, then opened Fokhara in New Cairo in
            2018. Her stated ambition was larger than offering a casual class:
            the studio would teach the pottery-making process seriously enough
            for people to develop real craft.
          </p>
          <a
            href="https://scenenow.com/artsandculture/diy-pottery-with-new-cairo-s-fokhara-studios"
            target="_blank"
            rel="noreferrer"
          >
            Historical source ↗
          </a>
        </div>
      </section>

      <section className="studioPractice">
        <p className="eyebrow">Practice / two directions</p>
        <h2>The studio produces objects and produces makers.</h2>
        <div className="studioPractice__grid">
          <Link href="/shop">
            <span>01 / own</span>
            <strong>Finished ceramics</strong>
            <p>
              Functional objects designed and handmade within Fokhara’s current
              ceramic practice.
            </p>
          </Link>
          <Link href="/workshops">
            <span>02 / make</span>
            <strong>Hands-on learning</strong>
            <p>
              Current sessions span handbuilding, wheelthrowing and longer
              sequences that continue through trimming and glazing.
            </p>
          </Link>
        </div>
      </section>

      <section className="studioProcess">
        <p className="eyebrow">Process / current teaching language</p>
        <div className="studioProcess__rail">
          <span>Center</span>
          <span>Shape</span>
          <span>Trim</span>
          <span>Glaze</span>
          <span>Fire</span>
          <span>Use</span>
        </div>
        <p>
          The exact sequence changes by workshop. The 1-month course currently
          publishes a four-stage learning path: handbuilding, wheelthrowing,
          trimming and glazing.
        </p>
      </section>

      <section className="studioVisitBridge">
        <p className="eyebrow">Studio → place</p>
        <h2>The practice has a physical address.</h2>
        <p>
          Fokhara currently operates from the First Settlement in New Cairo.
          Visit details and the studio’s posted hours are kept separate from
          workshop seat availability.
        </p>
        <Link href="/visit">Plan a visit</Link>
      </section>
    </article>
  );
}
