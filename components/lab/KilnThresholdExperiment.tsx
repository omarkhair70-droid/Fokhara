"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "motion/react";
import type { Workshop } from "@/lib/workshops";
import { WorkshopVisual } from "@/components/WorkshopVisual";
import { materialStateCssVars } from "@/lib/visual/material-state";
import styles from "./kiln-threshold.module.css";

const stages = [
  {
    id: "soft",
    number: "01",
    verb: "Soft",
    title: "The form can still move.",
    body:
      "At the beginning, pressure changes the material immediately. The interface stays open and spacious."
  },
  {
    id: "hold",
    number: "02",
    verb: "Hold",
    title: "Movement slows. Trace stays.",
    body:
      "The composition tightens without freezing the image. What happened before remains legible."
  },
  {
    id: "surface",
    number: "03",
    verb: "Surface",
    title: "A second material language arrives.",
    body:
      "Glaze is represented as a field around the factual image, not as a fake filter applied to the pottery photograph."
  },
  {
    id: "settle",
    number: "04",
    verb: "Settle",
    title: "The state becomes durable.",
    body:
      "The page releases into a stable final state. No infinite motion, no decorative looping."
  }
] as const;

export function KilnThresholdExperiment({
  workshop
}: {
  workshop: Workshop;
}) {
  const hostRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: hostRef,
    offset: ["start start", "end end"]
  });

  const eased = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.8
  });

  const [stageIndex, setStageIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reducedMotion) return;
    setStageIndex(Math.min(3, Math.floor(value * 4)));
  });

  useEffect(() => {
    if (reducedMotion) setStageIndex(0);
  }, [reducedMotion]);

  const frameInset = useTransform(
    eased,
    [0, 0.28, 0.55, 0.78, 1],
    ["0%", "3%", "5.5%", "2.5%", "0%"]
  );

  const fieldShift = useTransform(
    eased,
    [0, 0.34, 0.62, 1],
    [0, 0.22, 0.68, 1]
  );

  const markerY = useTransform(eased, [0, 1], ["0%", "300%"]);

  return (
    <section
      ref={hostRef}
      className={styles.lab}
      data-stage={stages[stageIndex].id}
      style={materialStateCssVars()}
    >
      <aside className={styles.visualColumn}>
        <div className={styles.sticky}>
          <div className={styles.stageHeader}>
            <p className="eyebrow">Experiment / kiln threshold</p>
            <span>
              {stages[stageIndex].number} / {stages[stageIndex].verb}
            </span>
          </div>

          <motion.div
            className={styles.field}
            style={{
              "--field-shift": fieldShift
            } as React.CSSProperties}
          >
            <motion.div
              className={styles.frame}
              style={{
                inset: frameInset
              }}
            >
              <WorkshopVisual workshop={workshop} visualRole="detail" />
            </motion.div>

            <div className={styles.materialRail} aria-hidden="true">
              <span className={styles.railClay}>Clay</span>
              <span className={styles.railHold}>Hold</span>
              <span className={styles.railGlaze}>Surface</span>
              <span className={styles.railFire}>Settle</span>
              <motion.i style={{ y: markerY }} />
            </div>
          </motion.div>

          <p className={styles.truthNote}>
            Real workshop image stays source-true. The interface field carries
            the material transition.
          </p>
        </div>
      </aside>

      <div className={styles.story}>
        <header className={styles.intro}>
          <p className="eyebrow">From pressure to permanence</p>
          <h1>The interface crosses a threshold with the material.</h1>
          <p>
            This test asks whether Fokhara can express transformation without
            pretending to simulate a real pot. The image remains documentary;
            the surrounding composition changes state.
          </p>
        </header>

        {stages.map((stage, index) => (
          <section
            className={styles.stageCopy}
            key={stage.id}
            data-active={stageIndex === index}
          >
            <span>{stage.number}</span>
            <div>
              <p className="eyebrow">{stage.verb}</p>
              <h2>{stage.title}</h2>
              <p>{stage.body}</p>
            </div>
          </section>
        ))}

        <footer className={styles.outro}>
          <p className="eyebrow">Acceptance question</p>
          <h2>
            Does the threshold make the process more legible, or does it merely
            decorate the scroll?
          </h2>
          <p>
            If the answer is decoration, this experiment should be removed.
          </p>
        </footer>
      </div>
    </section>
  );
}
