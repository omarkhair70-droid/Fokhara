"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Workshop } from "@/lib/workshops";
import styles from "./studio-contact-sheet.module.css";

type Frame = {
  id: string;
  src: string;
  alt: string;
  label: string;
  truth: string;
};

function framesFrom(workshops: Workshop[]): Frame[] {
  return workshops
    .filter((workshop) => workshop.image?.src)
    .map((workshop) => ({
      id: workshop.id,
      src: workshop.image!.src,
      alt: workshop.image!.alt || workshop.name,
      label: workshop.name,
      truth:
        workshop.id === "wheelthrowing"
          ? "wheel / process"
          : workshop.id === "short-course"
            ? "course / action"
            : workshop.id === "family-time"
              ? "people / context"
              : workshop.id === "make-paint"
                ? "finish / action"
                : "hands / outcome"
    }));
}

export function StudioContactSheetExperiment({
  workshops
}: {
  workshops: Workshop[];
}) {
  const frames = useMemo(() => framesFrom(workshops), [workshops]);
  const [active, setActive] = useState(0);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const nodes = cardRefs.current.filter(
      (node): node is HTMLElement => Boolean(node)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const index = Number(
          (visible.target as HTMLElement).dataset.index ?? "0"
        );
        setActive(index);
      },
      {
        rootMargin: "-26% 0px -38% 0px",
        threshold: [0.18, 0.36, 0.62, 0.84]
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [frames.length]);

  if (frames.length === 0) {
    return (
      <section className={styles.empty}>
        <p className="eyebrow">Experiment / studio contact sheet</p>
        <h1>No current workshop media was available for this lab.</h1>
      </section>
    );
  }

  return (
    <section className={styles.lab}>
      <aside className={styles.story}>
        <div className={styles.sticky}>
          <p className="eyebrow">Experiment / studio contact sheet</p>
          <h1>Let the real room interrupt the design system.</h1>
          <p>
            Instead of another neutral hero, this test uses current Fokhara
            workshop photography as the compositional engine.
          </p>

          <div className={styles.activeReadout}>
            <span>{String(active + 1).padStart(2, "0")}</span>
            <strong>{frames[active]?.label}</strong>
            <small>{frames[active]?.truth}</small>
          </div>

          <div className={styles.rules}>
            <span>Real Fokhara media only</span>
            <span>No invented founder portrait</span>
            <span>No shader / no 3D</span>
            <span>Composition changes with evidence</span>
          </div>
        </div>
      </aside>

      <div className={styles.sheet}>
        {frames.map((frame, index) => {
          const mode =
            index === 0
              ? "anchor"
              : index === 2
                ? "wide"
                : index === 3
                  ? "offset"
                  : "scan";

          return (
            <article
              key={frame.id}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className={styles.frame}
              data-index={index}
              data-mode={mode}
              data-active={active === index}
            >
              <div className={styles.image}>
                <img
                  src={frame.src}
                  alt={frame.alt}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>

              <div className={styles.caption}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{frame.label}</strong>
                <small>{frame.truth}</small>
              </div>
            </article>
          );
        })}

        <section className={styles.release}>
          <p className="eyebrow">Contact sheet → studio</p>
          <h2>Evidence first. System second.</h2>
          <p>
            If this direction works, the production Studio page should gain
            more authored real imagery before it gains another effect.
          </p>
        </section>
      </div>
    </section>
  );
}
