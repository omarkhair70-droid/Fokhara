"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Workshop } from "@/lib/workshops";
import { formatWorkshopPrice } from "@/lib/workshops";
import { WorkshopVisual } from "@/components/WorkshopVisual";
import { WorkshopObjectBridge } from "@/components/WorkshopObjectBridge";
import type { Product } from "@/lib/products";

type MakerStage = "observe" | "understand" | "choose" | "commit";

const stages: MakerStage[] = ["observe", "understand", "choose", "commit"];

export function WorkshopDetailClient({
  workshop,
  relatedProducts
}: {
  workshop: Workshop;
  relatedProducts: Product[];
}) {
  const [stage, setStage] = useState<MakerStage>("observe");

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-maker-stage]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const next = visible?.target.getAttribute(
          "data-maker-stage"
        ) as MakerStage | null;

        if (next && stages.includes(next)) setStage(next);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.1, 0.4, 0.8] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <article
      className="workshopDetail"
      style={{ "--workshop-accent": workshop.accent } as React.CSSProperties}
      data-maker-current={stage}
    >
      <aside className="makerRail" aria-label="Workshop journey">
        <span className="makerRail__label">You are</span>
        {stages.map((item) => (
          <span key={item} data-active={stage === item}>
            {item}
          </span>
        ))}
      </aside>

      <section
        className="workshopDetail__hero"
        data-maker-stage="observe"
      >
        <div className="workshopDetail__visual">
          <WorkshopVisual workshop={workshop} />
        </div>
        <div className="workshopDetail__heroCopy">
          <Link className="backLink" href="/workshops">
            ← Back to workshops
          </Link>
          <p className="eyebrow">{workshop.format} / observe</p>
          <h1>{workshop.name}</h1>
          <p className="workshopSummary">{workshop.summary}</p>
          <div className="workshopImmediateFacts">
            <strong>{formatWorkshopPrice(workshop)}</strong>
            <span>{workshop.duration}</span>
            <span>{workshop.age}</span>
          </div>
          <Link
            className="buttonPrimary"
            href={`/book/${workshop.slug}`}
          >
            Start booking request
          </Link>
        </div>
      </section>

      <section
        className="makerSection makerSection--process"
        data-maker-stage="understand"
      >
        <p className="eyebrow">Understand / process</p>
        <h2>What your hands will actually do.</h2>
        <ol className="processVerbs">
          {workshop.actions.map((action, index) => (
            <li key={action}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{action}</strong>
            </li>
          ))}
        </ol>
        <p className="makerSection__body">{workshop.outcome}</p>
      </section>

      <section
        className="makerSection makerSection--facts"
        data-maker-stage="choose"
      >
        <p className="eyebrow">Choose / commitment truth</p>
        <h2>Know the commitment before you book.</h2>
        <dl className="workshopFactGrid">
          <div>
            <dt>Format</dt>
            <dd>{workshop.format}</dd>
          </div>
          <div>
            <dt>Sessions</dt>
            <dd>{workshop.sessions}</dd>
          </div>
          <div>
            <dt>Duration</dt>
            <dd>{workshop.duration}</dd>
          </div>
          <div>
            <dt>Audience</dt>
            <dd>{workshop.audience}</dd>
          </div>
          <div>
            <dt>Age</dt>
            <dd>{workshop.age}</dd>
          </div>
          <div>
            <dt>Price</dt>
            <dd>{formatWorkshopPrice(workshop)}</dd>
          </div>
          {workshop.materials ? (
            <div className="workshopFactGrid__wide">
              <dt>Included</dt>
              <dd>{workshop.materials}</dd>
            </div>
          ) : null}
        </dl>

        {workshop.recurringDays ? (
          <div className="recurringDays">
            <h3>Current recurring studio windows</h3>
            <p>
              These are recurring options shown by Fokhara, not live seat
              availability.
            </p>
            <div>
              {workshop.recurringDays.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <section
        className="makerSection makerSection--commit"
        data-maker-stage="commit"
      >
        <p className="eyebrow">Commit / request mode</p>
        <h2>Your preferred date is a request, not an instant confirmation.</h2>
        <p className="makerSection__body">
          Fokhara currently asks participants to contact the studio to choose a
          date according to availability. Otherwise the booking applies to the
          next available date.
        </p>
        <ul className="policyList">
          <li>Fees are non-refundable.</li>
          <li>Arrival delays are allowed up to 15 minutes.</li>
          <li>Full bookings may be rescheduled to the nearest available date.</li>
          <li>Firing follows the studio kiln schedule.</li>
        </ul>
        <Link
          className="buttonPrimary"
          href={`/book/${workshop.slug}`}
        >
          Continue to booking request
        </Link>
        <Link className="sourceLink" href="/policies/workshops">
          Current workshop policies →
        </Link>
        <a
          className="sourceLink"
          href={workshop.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          Verify current Fokhara listing ↗
        </a>
      </section>

      <WorkshopObjectBridge products={relatedProducts} />
    </article>
  );
}
