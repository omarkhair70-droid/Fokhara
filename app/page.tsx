import { HomeObjectEntry } from "@/components/HomeObjectEntry";
import { featuredProduct } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <HomeObjectEntry product={featuredProduct} />
      <section className="homeProof">
        <p className="eyebrow">P0 thesis proof</p>
        <p className="homeProof__statement">
          Select the object. It should not vanish. The next route should form
          around it, then return you to the same browse context.
        </p>
      </section>
    </>
  );
}
