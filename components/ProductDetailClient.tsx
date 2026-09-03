"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatEgp } from "@/lib/products";
import { ProductVisual } from "@/components/ProductVisual";
import {
  type ProductComposition,
  useCarry
} from "@/features/carry/CarryProvider";

function directEntryComposition(product: Product): ProductComposition {
  if (product.form === "mug") return "mass-right";
  if (product.form === "espresso") return "vertical-pressure";
  return "mass-left";
}

export function ProductDetailClient({ product }: { product: Product }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const {
    registerProductTarget,
    isCarrying,
    getProductComposition
  } = useCarry();

  // Freeze the entry composition for this detail mount. Carry state may clear
  // after the transition settles, but the page must not jump afterward.
  const [composition] = useState<ProductComposition>(
    () =>
      getProductComposition(product.id) ??
      directEntryComposition(product)
  );

  const carrying = isCarrying(product.id);

  useEffect(() => {
    registerProductTarget(product.id, targetRef.current);
    return () => registerProductTarget(product.id, null);
  }, [product.id, registerProductTarget]);

  return (
    <article
      className="productDetail"
      data-composition={composition}
      style={
        {
          "--material-accent": product.accent,
          "--material-accent-ink": product.accentInk
        } as React.CSSProperties
      }
    >
      <div className="productDetail__mediaColumn">
        <div
          ref={targetRef}
          className="carryTarget"
          data-carrying={carrying}
          aria-label={`Prototype visual stand-in for ${product.name}`}
        >
          <ProductVisual product={product} />
        </div>
        <p className="prototypeNote">
          Visual stand-in only · production requires Fokhara-approved photography.
        </p>
      </div>

      <div className="productDetail__info">
        <Link className="backLink" href="/shop">
          ← Back to shop
        </Link>
        <p className="eyebrow">{product.collection} / evaluate</p>
        <h1>{product.name}</h1>
        <p className="price">{formatEgp(product.priceEgp)}</p>
        <p className="stockState" data-stock={product.stock}>
          {product.stock === "in_stock" ? "In stock" : "Out of stock"}
        </p>

        {product.description ? (
          <p className="productDescription">{product.description}</p>
        ) : (
          <p className="productDescription">
            Product description intentionally withheld in this prototype until
            Fokhara supplies or confirms the production copy.
          </p>
        )}

        <div className="purchaseBlock">
          <button
            type="button"
            className="buttonPrimary"
            disabled={product.stock !== "in_stock"}
          >
            {product.stock === "in_stock" ? "Add to cart · P0 stub" : "Unavailable"}
          </button>
          <span>Pickup and final checkout integration are production gates.</span>
        </div>

        <dl className="productFacts">
          <div>
            <dt>Collection</dt>
            <dd>{product.collection}</dd>
          </div>
          <div>
            <dt>Form</dt>
            <dd>{product.form}</dd>
          </div>
          <div>
            <dt>Entry composition</dt>
            <dd>{composition}</dd>
          </div>
          <div>
            <dt>Source</dt>
            <dd>
              <a href={product.sourceUrl} target="_blank" rel="noreferrer">
                Current Fokhara listing
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
