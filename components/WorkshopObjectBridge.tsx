import Link from "next/link";
import { TrackedLink } from "@/components/TrackedLink";
import type { Product } from "@/lib/products";
import { formatEgp } from "@/lib/products";
import { collectionToSlug } from "@/lib/collections";

export function WorkshopObjectBridge({
  products
}: {
  products: Product[];
}) {
  const visible = products
    .filter((product) => product.stock === "in_stock")
    .slice(0, 3);

  if (visible.length === 0) return null;

  return (
    <section className="workshopObjectBridge">
      <header>
        <p className="eyebrow">Participation → object</p>
        <h2>Making returns to everyday life.</h2>
        <p>
          Workshops teach the process. The shop shows another side of the same
          studio: finished functional ceramics made to be held and used.
        </p>
      </header>

      <div className="workshopObjectBridge__grid">
        {visible.map((product) => (
          <TrackedLink
            href={"/shop/" + product.slug}
            key={product.id}
            className="workshopObjectBridge__item"
            eventName="workshop_to_product"
            eventPayload={{
              productId: product.id,
              productSlug: product.slug
            }}
          >
            {product.image ? (
              <img
                src={product.image.src}
                alt={product.image.alt}
                loading="lazy"
              />
            ) : (
              <span className="workshopObjectBridge__imageFallback" />
            )}
            <div>
              <span>
                {product.collection
                  ? product.collection + " · " + formatEgp(product.priceEgp)
                  : formatEgp(product.priceEgp)}
              </span>
              <strong>{product.name}</strong>
            </div>
          </TrackedLink>
        ))}
      </div>

      <div className="workshopObjectBridge__actions">
        <Link href="/shop">Browse all ceramics</Link>
        {visible[0]?.collection ? (
          <Link
            href={
              "/collections/" + collectionToSlug(visible[0].collection)
            }
          >
            Enter {visible[0].collection}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
