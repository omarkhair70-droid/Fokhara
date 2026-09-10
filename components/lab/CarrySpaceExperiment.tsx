"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import { ProductVisual } from "@/components/ProductVisual";
import { materialStateCssVars } from "@/lib/visual/material-state";
import styles from "./carry-space.module.css";

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Phase = "source" | "lift" | "travel" | "settle" | "target";

function rectWithin(host: HTMLElement, node: HTMLElement): Rect {
  const hostRect = host.getBoundingClientRect();
  const rect = node.getBoundingClientRect();

  return {
    x: rect.left - hostRect.left,
    y: rect.top - hostRect.top,
    width: rect.width,
    height: rect.height
  };
}

function distanceBetween(a: Rect, b: Rect) {
  const ax = a.x + a.width / 2;
  const ay = a.y + a.height / 2;
  const bx = b.x + b.width / 2;
  const by = b.y + b.height / 2;
  return Math.hypot(bx - ax, by - ay);
}

export function CarrySpaceExperiment({ product }: { product: Product }) {
  const hostRef = useRef<HTMLElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [sourceRect, setSourceRect] = useState<Rect | null>(null);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [phase, setPhase] = useState<Phase>("source");
  const reducedMotion = useReducedMotion();
  const timers = useRef<number[]>([]);

  const measure = useCallback(() => {
    const host = hostRef.current;
    const source = sourceRef.current;
    const target = targetRef.current;
    if (!host || !source || !target) return;

    setSourceRect(rectWithin(host, source));
    setTargetRect(rectWithin(host, target));
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (hostRef.current) observer.observe(hostRef.current);

    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const resetTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };

  const run = () => {
    if (!sourceRect || !targetRect) return;
    resetTimers();

    if (reducedMotion) {
      setPhase("target");
      return;
    }

    setPhase("lift");

    timers.current.push(
      window.setTimeout(() => setPhase("travel"), 120),
      window.setTimeout(() => setPhase("settle"), 560),
      window.setTimeout(() => setPhase("target"), 860)
    );
  };

  const reset = () => {
    resetTimers();
    setPhase("source");
  };

  const distance =
    sourceRect && targetRect
      ? distanceBetween(sourceRect, targetRect)
      : 0;

  const distanceProfile =
    distance > 820 ? "far" : distance > 480 ? "medium" : "near";

  const activeRect =
    phase === "source" || phase === "lift"
      ? sourceRect
      : targetRect;

  const liftScale =
    distanceProfile === "far"
      ? 1.055
      : distanceProfile === "medium"
        ? 1.04
        : 1.025;

  const tiltX =
    distanceProfile === "far"
      ? -4.5
      : distanceProfile === "medium"
        ? -3
        : -1.5;

  const tiltY =
    distanceProfile === "far"
      ? 5.5
      : distanceProfile === "medium"
        ? 3.5
        : 2;

  const travelling = phase === "travel";
  const lifting = phase === "lift";
  const settling = phase === "settle";
  const atTarget = phase === "target";

  return (
    <section
      ref={hostRef}
      className={styles.lab}
      data-phase={phase}
      data-distance={distanceProfile}
      style={materialStateCssVars(product.collection)}
    >
      <header className={styles.header}>
        <p className="eyebrow">Experiment / carry becomes space</p>
        <h1>Carry the object through depth, not through a page fade.</h1>
        <p>
          Distance changes the amount of lift and perspective. The object keeps
          its source crop while moving, then recomposes only as it settles.
        </p>
      </header>

      <div className={styles.stage}>
        <div className={styles.sourceZone}>
          <div className={styles.zoneLabel}>
            <span>Source</span>
            <span>Browse crop</span>
          </div>
          <div ref={sourceRef} className={styles.sourceFrame}>
            <ProductVisual product={product} visualRole="browse" label />
          </div>
          <button
            className="buttonPrimary"
            type="button"
            onClick={run}
            disabled={phase !== "source"}
          >
            Carry this object
          </button>
        </div>

        <div className={styles.axis} aria-hidden="true">
          <span />
          <strong>{Math.round(distance)}px</strong>
          <span />
        </div>

        <div className={styles.targetZone}>
          <div className={styles.zoneLabel}>
            <span>Target</span>
            <span>Detail crop</span>
          </div>
          <div
            ref={targetRef}
            className={styles.targetFrame}
            data-active={atTarget}
          >
            <ProductVisual product={product} visualRole="detail" label />
          </div>
          <button
            className="buttonGhost"
            type="button"
            onClick={reset}
            disabled={phase === "source"}
          >
            Reset experiment
          </button>
        </div>

        {sourceRect && targetRect && activeRect ? (
          <motion.div
            className={styles.overlay}
            data-phase={phase}
            data-distance={distanceProfile}
            initial={false}
            animate={{
              x: activeRect.x,
              y: activeRect.y,
              width: activeRect.width,
              height: activeRect.height,
              scale:
                lifting || travelling
                  ? liftScale
                  : settling
                    ? 0.995
                    : 1,
              rotateX:
                lifting || travelling
                  ? tiltX
                  : 0,
              rotateY:
                lifting || travelling
                  ? tiltY
                  : 0,
              z:
                lifting || travelling
                  ? distanceProfile === "far"
                    ? 90
                    : distanceProfile === "medium"
                      ? 64
                      : 38
                  : 0,
              opacity: atTarget ? 0 : 1
            }}
            transition={{
              x: {
                type: "spring",
                stiffness: distanceProfile === "far" ? 120 : 155,
                damping: distanceProfile === "far" ? 24 : 22,
                mass: distanceProfile === "far" ? 1.05 : 0.88
              },
              y: {
                type: "spring",
                stiffness: distanceProfile === "far" ? 120 : 155,
                damping: distanceProfile === "far" ? 24 : 22,
                mass: distanceProfile === "far" ? 1.05 : 0.88
              },
              width: {
                type: "spring",
                stiffness: 145,
                damping: 23,
                mass: 0.92
              },
              height: {
                type: "spring",
                stiffness: 145,
                damping: 23,
                mass: 0.92
              },
              scale: { duration: 0.24 },
              rotateX: { duration: 0.3 },
              rotateY: { duration: 0.3 },
              z: { duration: 0.3 },
              opacity: { duration: 0.12 }
            }}
          >
            <div className={styles.overlayVisual}>
              <ProductVisual
                product={product}
                visualRole={travelling || lifting ? "browse" : "detail"}
                label
              />
            </div>
          </motion.div>
        ) : null}
      </div>

      <footer className={styles.footer}>
        <span>Distance profile: {distanceProfile}</span>
        <span>Phase: {phase}</span>
        <span>
          {reducedMotion
            ? "Reduced motion: direct state change"
            : "Finite gesture: lift → travel → recompose → settle"}
        </span>
      </footer>
    </section>
  );
}
