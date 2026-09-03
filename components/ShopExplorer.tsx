"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product, ProductCollection } from "@/lib/products";
import { formatEgp } from "@/lib/products";
import { CarryProductLink } from "@/components/CarryProductLink";

type Filter = "All" | ProductCollection;
const filters: Filter[] = ["All", "Nebula", "Midnight", "Ocean"];

export function ShopExplorer({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("fokhara:shop-return");
    if (!raw) {
      setReady(true);
      return;
    }

    try {
      const state = JSON.parse(raw) as {
        scrollY?: number;
        focusId?: string;
        filter?: Filter;
      };
      if (state.filter && filters.includes(state.filter)) setFilter(state.filter);

      requestAnimationFrame(() => {
        if (typeof state.scrollY === "number") {
          window.scrollTo({ top: state.scrollY, behavior: "auto" });
        }
        if (state.focusId) {
          const target = document.querySelector<HTMLElement>(
            `[data-product-id="${state.focusId}"]`
          );
          target?.focus({ preventScroll: true });
        }
        sessionStorage.removeItem("fokhara:shop-return");
        setReady(true);
      });
    } catch {
      sessionStorage.removeItem("fokhara:shop-return");
      setReady(true);
    }
  }, []);

  const visible = useMemo(
    () =>
      filter === "All"
        ? products
        : products.filter((product) => product.collection === filter),
    [filter, products]
  );

  return (
    <section className="shopSection" data-ready={ready}>
      <div className="shopIntro">
        <p className="eyebrow">Object system / browse</p>
        <h1>Ceramics, held in context.</h1>
        <p>
          P0 uses real live catalog names, prices and stock states with temporary
          visual stand-ins until original photography is approved.
        </p>
      </div>

      <div className="filterBar" aria-label="Filter by collection">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            data-active={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="productGrid">
        {visible.map((product, index) => (
          <CarryProductLink
            key={product.id}
            product={product}
            className="productCard"
            returnState={() => ({
              scrollY: window.scrollY,
              focusId: product.id,
              filter
            })}
          >
            <span className="productCard__index">{String(index + 1).padStart(2, "0")}</span>
            <div
              className="productCard__body"
              data-product-id={product.id}
              tabIndex={-1}
            >
              <span>{product.collection}</span>
              <strong>{product.name}</strong>
              <span>{formatEgp(product.priceEgp)}</span>
              <span className="stockState" data-stock={product.stock}>
                {product.stock === "in_stock" ? "In stock" : "Out of stock"}
              </span>
            </div>
          </CarryProductLink>
        ))}
      </div>
    </section>
  );
}
