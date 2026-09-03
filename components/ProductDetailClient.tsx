"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatEgp } from "@/lib/products";
import { ProductVisual } from "@/components/ProductVisual";
import { useCarry } from "@/features/carry/CarryProvider";

export function ProductDetailClient({ product }: { product: Product }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { registerProductTarget, isCarrying } = useCarry();
  const carrying = isCarrying(product.id);

  useEffect(() => {
    registerProductTarget(product.id, targetRef.current);
    return () => registerProductTarget(product.id, null);
  }, [product.id, registerProductTarget]);

  return (
    <article
      className="productDetail"
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
