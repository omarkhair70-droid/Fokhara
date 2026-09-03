"use client";

import Link from "next/link";
import type { ProductCollectionGroup } from "@/lib/collections";
import { ProductVisual } from "@/components/ProductVisual";
import {
  materialStateCssVars,
  materialStateForCollection
} from "@/lib/visual/material-state";
import styles from "./collection-inheritance.module.css";

export function CollectionInheritanceIndex({
  collections
}: {
  collections: ProductCollectionGroup[];
}) {
  return (
    <section className={styles.index}>
      <header className={styles.intro}>
        <p className="eyebrow">Experiment / collection inheritance</p>
        <h1>Choose a surface. Carry its trace into the next state.</h1>
        <p>
          This is not a theme switch. The test is whether one decision can leave
          a short-lived material memory after navigation, then settle once the
          new task is clear.
        </p>
      </header>

      <div className={styles.collectionList}>
        {collections.map((collection, index) => {
          const lead =
            collection.products.find((product) => product.image) ??
            collection.products[0];

          const material = materialStateForCollection(collection.name);

          return (
            <Link
              key={collection.slug}
              href={`/lab/collection-inheritance/${collection.slug}`}
              className={styles.collection}
              data-material={material.id}
              style={materialStateCssVars(collection.name)}
              onClick={() => {
                sessionStorage.setItem(
                  "fokhara:lab:collection-inheritance",
                  JSON.stringify({
                    name: collection.name,
                    slug: collection.slug,
                    at: Date.now()
                  })
                );
              }}
            >
              <span className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className={styles.visual}>
                {lead ? (
                  <ProductVisual
                    product={lead}
                    visualRole="collection"
                    label
                  />
                ) : null}
              </div>

              <div className={styles.copy}>
                <p className="eyebrow">Fired surface</p>
                <h2>{collection.name}</h2>
                <span className={styles.trace} aria-hidden="true" />
                <div>
                  <span>{collection.products.length} forms</span>
                  <span>{collection.inStockCount} in stock</span>
                  <strong>Carry this state →</strong>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
