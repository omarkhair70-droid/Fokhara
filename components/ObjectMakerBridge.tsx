import type { Product } from "@/lib/products";
import { TrackedLink } from "@/components/TrackedLink";

export function ObjectMakerBridge({ product }: { product: Product }) {
  return (
    <section className="objectMakerBridge">
      <div>
        <p className="eyebrow">From object to making</p>
        <h2>Own the form. Or enter the process.</h2>
      </div>
      <div className="objectMakerBridge__copy">
        <p>
          Take a finished piece home, or move from looking at clay to working
          with it yourself. Fokhara offers both handbuilding and wheelthrowing
          workshops.
        </p>
        <p>
          Choose the process you want to try and start with your own hands.
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
