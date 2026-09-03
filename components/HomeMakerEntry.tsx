import type { Workshop } from "@/lib/workshops";
import { formatWorkshopPrice } from "@/lib/workshops";
import { WorkshopVisual } from "@/components/WorkshopVisual";
import { TrackedLink } from "@/components/TrackedLink";

export function HomeMakerEntry({ workshop }: { workshop: Workshop }) {
  return (
    <section className="homeMaker">
      <div className="homeMaker__visual">
        <WorkshopVisual workshop={workshop} visualRole="home" />
      </div>
      <div className="homeMaker__copy">
        <p className="eyebrow">Become the maker / P1</p>
        <h2>Don’t only keep the form. Enter the process.</h2>
        <p>{workshop.summary}</p>
        <dl className="homeMaker__facts">
          <div>
            <dt>Session</dt>
            <dd>{workshop.duration}</dd>
          </div>
          <div>
            <dt>From</dt>
            <dd>{formatWorkshopPrice(workshop)}</dd>
          </div>
          <div>
            <dt>Age</dt>
            <dd>{workshop.age}</dd>
          </div>
        </dl>
        <TrackedLink
          className="buttonPrimary"
          href="/workshops"
          eventName="home_workshops_enter"
        >
          Explore workshops
        </TrackedLink>
      </div>
    </section>
  );
}
