"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { formatEgp } from "@/lib/products";
import { CarryProductLink } from "@/components/CarryProductLink";
import Link from "next/link";
import {
  materialStateCssVars,
  materialStateForCollection
} from "@/lib/visual/material-state";
import { collectionToSlug } from "@/lib/collections";

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

  const activeMaterial =
    filter === "All" ? materialStateForCollection() : materialStateForCollection(filter);

  const visible = useMemo(
    () =>
      filter === "All"
        ? products
        : products.filter((product) => product.collection === filter),
    [filter, products]
  );

  const chapters = useMemo(() => {
    const grouped = new Map<string, Product[]>();

    for (const product of visible) {
      const name = product.collection ?? "Ceramics";
      const current = grouped.get(name) ?? [];
      current.push(product);
      grouped.set(name, current);
    }

    return Array.from(grouped.entries()).map(([name, items]) => ({
      name,
      slug: collectionToSlug(name),
      products: items,
      inStockCount: items.filter((product) => product.stock === "in_stock").length
    }));
  }, [visible]);

  return (
    <section
      className="shopSection"
      data-ready={ready}
      data-commerce-source={dataSource}
      data-material-filter={activeMaterial.id}
      style={materialStateCssVars(filter === "All" ? undefined : filter)}
    >
      <div className="shopIntro">
        <p className="eyebrow">Ceramics / available pieces</p>
        <h1>Ceramics, held in context.</h1>
        <p>
          Browse Fokhara’s handmade pieces by fired surface and form. Prices and
          stock reflect the current shop.
        </p>
      </div>

      {dataSource === "fixture" ? (
        <div className="dataFallback" role="status">
          The shop is temporarily unavailable. Showing a saved selection of
          Fokhara ceramics.
          {dataError ? <span>{dataError}</span> : null}
        </div>
      ) : null}

      <div className="shopCollectionEntry">
        <span>Browse by fired surface.</span>
        <Link href="/collections">See all collections →</Link>
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

      <div className="shopChapters">
        {chapters.map((chapter, chapterIndex) => {
          const material = materialStateForCollection(chapter.name);
          const countClass =
            chapter.products.length >= 4
              ? "productGrid--count-4"
              : `productGrid--count-${chapter.products.length}`;

          return (
            <section
              className="shopChapter"
              key={chapter.name}
              data-material={material.id}
              style={materialStateCssVars(chapter.name)}
            >
              <header className="shopChapter__header">
                <div>
                  <p className="eyebrow">
                    {String(chapterIndex + 1).padStart(2, "0")} / collection
                  </p>
                  <h2>{chapter.name}</h2>
                  <span className="materialTrace" aria-hidden="true" />
                </div>
                <div className="shopChapter__meta">
                  <span>{chapter.products.length} forms</span>
                  <span>{chapter.inStockCount} in stock</span>
                  {chapter.name !== "Ceramics" ? (
                    <Link href={`/collections/${chapter.slug}`}>
                      View collection →
                    </Link>
                  ) : null}
                </div>
              </header>

              <div className={`productGrid productGrid--chapter ${countClass}`}>
                {chapter.products.map((product, index) => (
                  <CarryProductLink
                    key={product.id}
                    product={product}
                    className="productCard"
                    style={materialStateCssVars(product.collection)}
                    visualRole="browse"
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
        })}
      </div>
    </section>
  );
}
