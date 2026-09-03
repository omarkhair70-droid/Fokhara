"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Workshop, WorkshopFormat } from "@/lib/workshops";
import { formatWorkshopPrice } from "@/lib/workshops";
import { WorkshopVisual } from "@/components/WorkshopVisual";
import { track } from "@/lib/analytics";

type Filter = "all" | WorkshopFormat;
const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "single", label: "Single sessions" },
  { value: "package", label: "Packages" },
  { value: "course", label: "Courses" }
];

export function WorkshopExplorer({ workshops }: { workshops: Workshop[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("fokhara:workshops-return");
    if (!raw) {
      setReady(true);
      return;
    }

    try {
      const state = JSON.parse(raw) as {
        scrollY?: number;
        focusId?: string;
        filter?: Filter;
      };

      if (
        state.filter &&
        filters.some((item) => item.value === state.filter)
      ) {
        setFilter(state.filter);
      }

      requestAnimationFrame(() => {
        if (typeof state.scrollY === "number") {
          window.scrollTo({ top: state.scrollY, behavior: "auto" });
        }
        if (state.focusId) {
          document
            .querySelector<HTMLElement>(
              `[data-workshop-focus="${state.focusId}"]`
            )
            ?.focus({ preventScroll: true });
        }
        sessionStorage.removeItem("fokhara:workshops-return");
        setReady(true);
      });
    } catch {
      sessionStorage.removeItem("fokhara:workshops-return");
      setReady(true);
    }
  }, []);

  const visible = useMemo(
    () =>
      filter === "all"
        ? workshops
        : workshops.filter((workshop) => workshop.format === filter),
    [filter, workshops]
  );

  return (
    <section className="workshopsPage" data-ready={ready}>
      <header className="workshopsIntro">
        <p className="eyebrow">Workshops / choose a process</p>
        <h1>Choose what you want your hands to do.</h1>
        <p>
          Start with the kind of making you want to try, then compare the time,
          format and commitment before you book.
        </p>
      </header>

      <div className="filterBar" aria-label="Filter workshops by format">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            data-active={filter === item.value}
            onClick={() => setFilter(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="workshopGrid">
        {visible.map((workshop, index) => {
          const beginsFormat =
            index === 0 || visible[index - 1]?.format !== workshop.format;

          return (
            <Link
              key={workshop.id}
              href={`/workshops/${workshop.slug}`}
              className="workshopCard"
              data-workshop-focus={workshop.id}
              data-format={workshop.format}
              data-format-start={beginsFormat}
              onClick={() => {
                track("workshop_open", {
                  workshopId: workshop.id,
                  workshopSlug: workshop.slug,
                  format: workshop.format
                });
                sessionStorage.setItem(
                  "fokhara:workshops-return",
                  JSON.stringify({
                    scrollY: window.scrollY,
                    focusId: workshop.id,
                    filter
                  })
                );
              }}
            >
              <WorkshopVisual workshop={workshop} visualRole="index" />
              <div className="workshopCard__info">
                <span>{workshop.format}</span>
                <h2>{workshop.name}</h2>
                <p>{workshop.actions.join(" → ")}</p>
                <dl>
                  <div>
                    <dt>Time</dt>
                    <dd>{workshop.duration}</dd>
                  </div>
                  <div>
                    <dt>For</dt>
                    <dd>{workshop.age}</dd>
                  </div>
                  <div>
                    <dt>Price</dt>
                    <dd>{formatWorkshopPrice(workshop)}</dd>
                  </div>
                </dl>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
