"use client";

import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { collectionMemoryStorageKey } from "@/components/CollectionMemoryLink";

type Phase = "direct" | "arrived" | "settling" | "settled";

type Props = {
  collectionSlug: string;
  className: string;
  style?: CSSProperties;
  materialId: string;
  reflectivity: string;
  children: ReactNode;
};

export function CollectionDetailShell({
  collectionSlug,
  className,
  style,
  materialId,
  reflectivity,
  children
}: Props) {
  const [phase, setPhase] = useState<Phase>("direct");
  const [inherited, setInherited] = useState(false);

  useEffect(() => {
    let settleTimer: number | undefined;
    let doneTimer: number | undefined;

    try {
      const raw = sessionStorage.getItem(collectionMemoryStorageKey);
      const value = raw
        ? (JSON.parse(raw) as { slug?: string; at?: number })
        : null;

      const fresh =
        value?.slug === collectionSlug &&
        typeof value.at === "number" &&
        Date.now() - value.at < 10_000;

      if (!fresh) {
        setPhase("direct");
        setInherited(false);
        return;
      }

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      setInherited(true);

      if (reduced) {
        setPhase("settled");
        sessionStorage.removeItem(collectionMemoryStorageKey);
        return;
      }

      setPhase("arrived");

      settleTimer = window.setTimeout(() => {
        setPhase("settling");
      }, 420);

      doneTimer = window.setTimeout(() => {
        setPhase("settled");
        sessionStorage.removeItem(collectionMemoryStorageKey);
      }, 1120);
    } catch {
      setPhase("direct");
      setInherited(false);
    }

    return () => {
      if (settleTimer) window.clearTimeout(settleTimer);
      if (doneTimer) window.clearTimeout(doneTimer);
    };
  }, [collectionSlug]);

  return (
    <article
      className={className}
      data-material={materialId}
      data-reflectivity={reflectivity}
      data-arrival-phase={phase}
      data-inherited={inherited}
      style={style}
    >
      <span className="collectionArrivalTrace" aria-hidden="true" />
      {children}
    </article>
  );
}
