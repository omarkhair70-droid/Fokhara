import { HomeObjectEntry } from "@/components/HomeObjectEntry";
import { HomeMakerEntry } from "@/components/HomeMakerEntry";
import { featuredProduct } from "@/lib/products";
import { featuredWorkshop } from "@/lib/workshops";

export default function HomePage() {
  return (
    <>
      <HomeObjectEntry product={featuredProduct} />
      <HomeMakerEntry workshop={featuredWorkshop} />
      <section className="homeProof">
        <p className="eyebrow">Two product systems</p>
        <p className="homeProof__statement">
          Own the object, or cross the threshold and become the maker.
        </p>
      </section>
    </>
  );
}
