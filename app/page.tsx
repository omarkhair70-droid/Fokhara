import { HomeObjectEntry } from "@/components/HomeObjectEntry";
import { HomeMakerEntry } from "@/components/HomeMakerEntry";
import { getCeramicProducts } from "@/lib/commerce/woo";
import { featuredProduct as fallbackFeatured } from "@/lib/products";
import { featuredWorkshop } from "@/lib/workshops";

export const revalidate = 60;

export default async function HomePage() {
  const products = await getCeramicProducts();
  const featured =
    products.data.find((product) => product.stock === "in_stock") ??
    products.data[0] ??
    fallbackFeatured;

  return (
    <>
      <HomeObjectEntry product={featured} />
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
