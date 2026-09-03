import type { Metadata } from "next";
import { getCeramicProducts } from "@/lib/commerce/woo";
import { formatEgp } from "@/lib/products";
import { groupProductsByCollection } from "@/lib/collections";
import {
  materialStateCssVars,
  materialStateForCollection
} from "@/lib/visual/material-state";
import { ProductVisual } from "@/components/ProductVisual";
import { CollectionMemoryLink } from "@/components/CollectionMemoryLink";

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
        <p className="eyebrow">Collections / fired surfaces</p>
        <h1>One form system. Different fired surfaces.</h1>
        <p>
          The same functional forms shift character through glaze, oxide,
          depth and exposed clay. Browse the current collections by surface.
        </p>
      </header>

      {result.source === "fixture" ? (
        <div className="dataFallback" role="status">
          The current shop is temporarily unavailable. Showing a saved
          collection selection.
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
            <CollectionMemoryLink
              href={"/collections/" + collection.slug}
              collectionSlug={collection.slug}
              className="collectionIndex__item"
              key={collection.slug}
              style={materialStateCssVars(collection.name)}
              materialId={material.id}
              reflectivity={material.reflectivity}
              rhythm={rhythm}
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
                <p className="eyebrow">Fired surface</p>
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
            </CollectionMemoryLink>
          );
        })}
      </div>
    </section>
  );
}
