"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ProductCollectionGroup } from "@/lib/collections";
import { ProductVisual } from "@/components/ProductVisual";
import { formatEgp } from "@/lib/products";
import {
  materialStateCssVars,
  materialStateForCollection
} from "@/lib/visual/material-state";
import styles from "./collection-inheritance.module.css";

type Phase = "arrived" | "settling" | "settled";

export function CollectionInheritanceDestination({
  collection
}: {
  collection: ProductCollectionGroup;
}) {
  const [phase, setPhase] = useState<Phase>("settled");
  const [inherited, setInherited] = useState(false);
  const material = materialStateForCollection(collection.name);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    try {
      const raw = sessionStorage.getItem("fokhara:lab:collection-inheritance");
      const value = raw
        ? (JSON.parse(raw) as { slug?: string; at?: number })
        : null;

      const isFresh =
        value?.slug === collection.slug &&
        typeof value.at === "number" &&
        Date.now() - value.at < 8000;

      if (!isFresh || reduced) {
        setPhase("settled");
        setInherited(Boolean(isFresh));
        return;
      }

      setInherited(true);
      setPhase("arrived");

      const settle = window.setTimeout(() => {
        setPhase("settling");
      }, 120);

      const done = window.setTimeout(() => {
        setPhase("settled");
        sessionStorage.removeItem("fokhara:lab:collection-inheritance");
      }, 980);

      return () => {
        window.clearTimeout(settle);
        window.clearTimeout(done);
      };
    } catch {
      setPhase("settled");
    }
  }, [collection.slug]);

  const lead =
    collection.products.find((product) => product.image) ??
    collection.products[0];

  return (
    <article
      className={styles.destination}
      data-phase={phase}
      data-inherited={inherited}
      data-material={material.id}
      style={materialStateCssVars(collection.name)}
    >
      <div className={styles.inheritedField} aria-hidden="true" />

      <header className={styles.destinationHero}>
        <div className={styles.destinationCopy}>
          <Link href="/lab/collection-inheritance" className="backLink">
            ← Change collection
          </Link>
          <p className="eyebrow">
            {inherited ? "Inherited state / arriving" : "Direct entry / settled"}
          </p>
          <h1>{collection.name}</h1>
          <span className={styles.destinationTrace} aria-hidden="true" />
          <p>
            The selected surface is allowed to remain present for a moment after
            navigation. It then contracts into a quieter edge condition so the
            collection itself becomes the task.
          </p>
        </div>

        <div className={styles.destinationVisual}>
          {lead ? (
            <ProductVisual product={lead} visualRole="detail" label />
          ) : null}
        </div>
      </header>

      <section className={styles.destinationFacts}>
        <span>{collection.products.length} current forms</span>
        <span>{collection.inStockCount} in stock</span>
        <span>from {formatEgp(collection.priceFromEgp)}</span>
        <strong>phase: {phase}</strong>
      </section>

      <section className={styles.destinationGrid}>
        {collection.products.slice(0, 4).map((product) => (
          <article key={product.id}>
            <ProductVisual product={product} visualRole="collection" label />
            <div>
              <strong>{product.name}</strong>
              <span>{formatEgp(product.priceEgp)}</span>
            </div>
          </article>
        ))}
      </section>
    </article>
  );
}
