import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCeramicProducts } from "@/lib/commerce/woo";
import { findCollection } from "@/lib/collections";
import { formatEgp } from "@/lib/products";
import {
  materialStateCssVars,
  materialStateForCollection
} from "@/lib/visual/material-state";

type Props = {
  params: Promise<{ collectionSlug: string }>;
};

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collectionSlug } = await params;
  const result = await getCeramicProducts();
  const collection = findCollection(result.data, collectionSlug);

  if (!collection) return {};

  return {
    title: collection.name + " Collection",
    description:
      "Current " + collection.name + " ceramics from Fokhara’s live catalog."
  };
}

export default async function CollectionPage({ params }: Props) {
  const { collectionSlug } = await params;
  const result = await getCeramicProducts();
  const collection = findCollection(result.data, collectionSlug);

  if (!collection) notFound();

  const lead =
    collection.products.find((product) => product.image) ??
    collection.products[0];
  const material = materialStateForCollection(collection.name);

  return (
    <article
      className="collectionDetail"
      data-material={material.id}
      data-reflectivity={material.reflectivity}
      style={materialStateCssVars(collection.name)}
    >
      <header className="collectionDetail__hero">
        <div className="collectionDetail__copy">
          <Link href="/collections" className="backLink">
            ← All collections
          </Link>
          <p className="eyebrow">Collection / material state</p>
          <h1>{collection.name}</h1>
          <span className="materialTrace materialTrace--hero" aria-hidden="true" />
          <p>
            A live grouping of the ceramic forms currently carrying the{" "}
            {collection.name} name in Fokhara’s Woo catalog.
          </p>
        </div>

        <div className="collectionDetail__lead">
          {lead?.image ? <img src={lead.image.src} alt={lead.image.alt} /> : null}
        </div>
      </header>

      <div className="collectionDetail__facts">
        <span>{collection.products.length} current forms</span>
        <span>{collection.inStockCount} currently in stock</span>
        <span>from {formatEgp(collection.priceFromEgp)}</span>
      </div>

      <div className="collectionProducts">
        {collection.products.map((product) => (
          <Link
            href={"/shop/" + product.slug}
            key={product.id}
            className="collectionProduct"
            style={materialStateCssVars(product.collection)}
          >
            <div className="collectionProduct__image">
              {product.image ? (
                <img src={product.image.src} alt={product.image.alt} loading="lazy" />
              ) : null}
            </div>
            <div className="collectionProduct__copy">
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
          </Link>
        ))}
      </div>

      <section className="collectionDetail__exit">
        <p className="eyebrow">Collection → whole system</p>
        <h2>Keep the surface. Change the action.</h2>
        <div>
          <Link href="/shop">Return to all ceramics</Link>
          <Link href="/workshops">Make with clay yourself</Link>
        </div>
      </section>
    </article>
  );
}
