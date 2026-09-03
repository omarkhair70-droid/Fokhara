"use client";

import { CarryProductLink } from "@/components/CarryProductLink";
import type { Product } from "@/lib/products";
import { formatEgp } from "@/lib/products";
import { TrackedLink } from "@/components/TrackedLink";

export function HomeObjectEntry({ product }: { product: Product }) {
  return (
    <section className="homeObject">
      <div className="homeObject__copy">
        <p className="eyebrow">Form / trace / everyday use</p>
        <h1>
          The form
          <br />
          remembers.
        </h1>
        <p className="lede">
          An experimental digital study for Fokhara: objects do not reset between
          pages. They carry what happened before.
        </p>
        <div className="homeActions">
          <TrackedLink
            className="buttonPrimary"
            href="/shop"
            eventName="home_shop_enter"
          >
            Explore ceramics
          </TrackedLink>
          <TrackedLink
            className="buttonGhost"
            href="/workshops"
            eventName="home_workshops_enter"
          >
            Enter the process
          </TrackedLink>
        </div>
      </div>

      <CarryProductLink product={product} className="homeObject__product">
        <div className="objectCaption">
          <span>{product.collection}</span>
          <strong>{product.name}</strong>
          <span>{formatEgp(product.priceEgp)}</span>
        </div>
      </CarryProductLink>
    </section>
  );
}
