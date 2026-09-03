import type { Metadata } from "next";
import Link from "next/link";
import { getCeramicProducts } from "@/lib/commerce/woo";
import { formatEgp } from "@/lib/products";
import { groupProductsByCollection } from "@/lib/collections";
import {
  materialStateCssVars,
  materialStateForCollection
} from "@/lib/visual/material-state";
import { ProductVisual } from "@/components/ProductVisual";

export const metadata: Metadata = {
  title: "Collections",
  description: "Current Fokhara ceramic collections from the live store."
};

export const revalidate = 60;

export default async function CollectionsPage() {
  const result = await getCeramicProducts();
  const collections = groupProductsByCollection(result.data);

  return (
    <section className="collectionsPage">
      <header className="collectionsHero">
        <p className="eyebrow">Object system / material states</p>
        <h1>One form system. Different fired surfaces.</h1>
        <p>
          Fokhara’s current Woo catalog does not store collection identity as a
          formal taxonomy, so P2 derives these groups from live product names
          and keeps that compatibility rule isolated.
        </p>
      </header>

      {result.source === "fixture" ? (
        <div className="dataFallback" role="status">
          Live catalog unavailable. Collection groups are being shown from the
          curated fallback set.
        </div>
      ) : null}

      <div className="collectionIndex">
        {collections.map((collection, index) => {
          const lead =
            collection.products.find((product) => product.image) ??
            collection.products[0];

          const material = materialStateForCollection(collection.name);
          const rhythm =
            index === 0 ? "anchor" : index % 3 === 0 ? "release" : "scan";

          return (
            <Link
              href={"/collections/" + collection.slug}
              className="collectionIndex__item"
              key={collection.slug}
              data-material={material.id}
              data-reflectivity={material.reflectivity}
              data-rhythm={rhythm}
              style={materialStateCssVars(collection.name)}
            >
              <span className="collectionIndex__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="collectionIndex__image">
                {lead ? (
                  <ProductVisual
                    product={lead}
                    visualRole="collection"
                    label
                  />
                ) : null}
              </div>
              <div className="collectionIndex__copy">
                <p className="eyebrow">Material state</p>
                <h2>{collection.name}</h2>
                <span className="materialTrace" aria-hidden="true" />
                <dl>
                  <div>
                    <dt>Forms</dt>
                    <dd>{collection.products.length}</dd>
                  </div>
                  <div>
                    <dt>In stock</dt>
                    <dd>{collection.inStockCount}</dd>
                  </div>
                  <div>
                    <dt>From</dt>
                    <dd>{formatEgp(collection.priceFromEgp)}</dd>
                  </div>
                </dl>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
