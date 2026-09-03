import type { Product } from "@/lib/products";
import { TrackedLink } from "@/components/TrackedLink";

export function ObjectMakerBridge({ product }: { product: Product }) {
  return (
    <section className="objectMakerBridge">
      <div>
        <p className="eyebrow">Object → participation</p>
        <h2>Own the form. Or enter the process.</h2>
      </div>
      <div className="objectMakerBridge__copy">
        <p>
          This finished object belongs to Fokhara’s shop. The studio also teaches
          the two core making paths it currently offers publicly: handbuilding
          and wheelthrowing.
        </p>
        <p>
          This bridge does not claim that this exact {product.name} was formed by
          either method. It gives you a truthful way to move from admiring a
          ceramic object to working with clay yourself.
        </p>
        <div className="objectMakerBridge__actions">
          <TrackedLink
            href="/workshops/handbuilding-pottery-workshop"
            eventName="product_to_workshop"
            eventPayload={{
              productId: product.id,
              workshopSlug: "handbuilding-pottery-workshop"
            }}
          >
            Try handbuilding
          </TrackedLink>
          <TrackedLink
            href="/workshops/wheelthrowing-pottery-workshop"
            eventName="product_to_workshop"
            eventPayload={{
              productId: product.id,
              workshopSlug: "wheelthrowing-pottery-workshop"
            }}
          >
            Try wheelthrowing
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
