"use client";

import { useRef } from "react";
import type { Product } from "@/lib/products";
import { useCarry } from "@/features/carry/CarryProvider";
import { ProductVisual } from "@/components/ProductVisual";
import { track } from "@/lib/analytics";

type Props = {
  product: Product;
  className?: string;
  returnState?: () => Record<string, unknown>;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export function CarryProductLink({
  product,
  className = "",
  returnState,
  children,
  style
}: Props) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const { beginProductCarry, isCarrying } = useCarry();
  const href = `/shop/${product.slug}`;
  const carrying = isCarrying(product.id);

  return (
    <a
      className={className}
      href={href}
      style={style}
      onClick={(event) => {
        track("product_open", {
          productId: product.id,
          productSlug: product.slug,
          collection: product.collection ?? null
        });

        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          !mediaRef.current
        ) {
          return;
        }
        event.preventDefault();
        beginProductCarry(product, mediaRef.current, href, returnState?.());
      }}
    >
      <div ref={mediaRef} className="carrySource" data-carrying={carrying}>
        <ProductVisual product={product} />
      </div>
      {children}
    </a>
  );
}
