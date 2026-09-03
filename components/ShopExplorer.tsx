"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { formatEgp } from "@/lib/products";
import { CarryProductLink } from "@/components/CarryProductLink";

type Props = {
  products: Product[];
  dataSource: "live" | "fixture";
  dataError?: string;
};

export function ShopExplorer({
  products,
  dataSource,
  dataError
}: Props) {
  const filters = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          products
            .map((product) => product.collection)
            .filter((value): value is string => Boolean(value))
        )
      )
    ],
    [products]
  );

  const [filter, setFilter] = useState("All");
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
        filter?: string;
      };

      if (state.filter && filters.includes(state.filter)) {
        setFilter(state.filter);
      }

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
  }, [filters]);

  const visible = useMemo(
    () =>
      filter === "All"
        ? products
        : products.filter((product) => product.collection === filter),
    [filter, products]
  );

  return (
    <section
      className="shopSection"
      data-ready={ready}
      data-commerce-source={dataSource}
    >
      <div className="shopIntro">
        <p className="eyebrow">Object system / live catalog</p>
        <h1>Ceramics, held in context.</h1>
        <p>
          Product names, prices and stock now come through Fokhara’s current
          WooCommerce Store API. P2 still uses abstract visual stand-ins while
          approved product photography is being prepared.
        </p>
      </div>

      {dataSource === "fixture" ? (
        <div className="dataFallback" role="status">
          Live catalog temporarily unavailable. Showing the last curated P0
          fixture set.
          {dataError ? <span>{dataError}</span> : null}
        </div>
      ) : null}

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
            <span className="productCard__index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div
              className="productCard__body"
              data-product-id={product.id}
              tabIndex={-1}
            >
              <span>{product.collection ?? "Ceramics"}</span>
              <strong>{product.name}</strong>
              <span>{formatEgp(product.priceEgp)}</span>
              <span className="stockState" data-stock={product.stock}>
                {product.stock === "in_stock"
                  ? "In stock"
                  : product.stock === "on_backorder"
                    ? "On backorder"
                    : "Out of stock"}
              </span>
            </div>
          </CarryProductLink>
        ))}
      </div>
    </section>
  );
}
