"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatEgp } from "@/lib/products";
import { ProductVisual } from "@/components/ProductVisual";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ObjectMakerBridge } from "@/components/ObjectMakerBridge";
import { collectionToSlug } from "@/lib/collections";
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
          Live product data · visual art direction still uses a temporary stand-in.
        </p>
      </div>

      <div className="productDetail__info">
        <Link className="backLink" href="/shop">
          ← Back to shop
        </Link>
        <p className="eyebrow">
          {product.collection ? (
            <Link href={"/collections/" + collectionToSlug(product.collection)}>
              {product.collection}
            </Link>
          ) : (
            "Ceramics"
          )}{" "}
          / evaluate
        </p>
        <h1>{product.name}</h1>
        <p className="price">{formatEgp(product.priceEgp)}</p>
        <p className="stockState" data-stock={product.stock}>
          {product.stock === "in_stock"
            ? "In stock"
            : product.stock === "on_backorder"
              ? "On backorder"
              : "Out of stock"}
        </p>

        {product.description ? (
          <p className="productDescription">{product.description}</p>
        ) : (
          <p className="productDescription">
            No verified public description is available for this product yet.
          </p>
        )}

        <div className="purchaseBlock">
          <AddToCartButton product={product} />
          <span>
            Live Woo cart is enabled for simple purchasable ceramics. Checkout
            stays gated until payment compatibility is verified.
          </span>
        </div>

        <dl className="productFacts">
          <div>
            <dt>Collection</dt>
            <dd>{product.collection ?? "Not structured in Woo"}</dd>
          </div>
          <div>
            <dt>Form</dt>
            <dd>{product.form}</dd>
          </div>
          <div>
            <dt>Data</dt>
            <dd>WooCommerce Store API</dd>
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

      <ObjectMakerBridge product={product} />
    </article>
  );
}
