import type { Workshop } from "@/lib/workshops";
import { getProductBySlug } from "@/lib/commerce/woo";

function sourceProductSlug(sourceUrl: string) {
  try {
    const url = new URL(sourceUrl);
    const parts = url.pathname.split("/").filter(Boolean);
    const productIndex = parts.lastIndexOf("product");
    return productIndex >= 0 ? parts[productIndex + 1] : parts.at(-1);
  } catch {
    return undefined;
  }
}

export async function withWorkshopMedia(
  workshop: Workshop
): Promise<Workshop> {
  const sourceSlug = sourceProductSlug(workshop.sourceUrl);
  if (!sourceSlug) return workshop;

  const result = await getProductBySlug(sourceSlug);

  if (!result.data?.image?.src) return workshop;

  return {
    ...workshop,
    image: {
      src: result.data.image.src,
      alt: result.data.image.alt || workshop.name
    },
    imageSource: "woo"
  };
}

export async function withWorkshopMediaList(
  source: Workshop[]
): Promise<Workshop[]> {
  return Promise.all(source.map(withWorkshopMedia));
}
