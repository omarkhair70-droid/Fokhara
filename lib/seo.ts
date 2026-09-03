import type { Product } from "@/lib/products";
import type { Workshop } from "@/lib/workshops";

function availabilityUrl(stock: Product["stock"]) {
  if (stock === "in_stock") return "https://schema.org/InStock";
  if (stock === "on_backorder") return "https://schema.org/BackOrder";
  return "https://schema.org/OutOfStock";
}

export function productStructuredData(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image?.src ? [product.image.src] : undefined,
    category: product.collection ?? "Ceramics",
    brand: {
      "@type": "Brand",
      name: "Fokhara Studio & Shop"
    },
    sameAs: product.sourceUrl,
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      price: product.priceEgp,
      availability: availabilityUrl(product.stock),
      url: product.sourceUrl
    }
  };
}

export function workshopStructuredData(workshop: Workshop) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: workshop.name,
    description: workshop.summary,
    provider: {
      "@type": "Organization",
      name: "Fokhara Studio & Shop"
    },
    sameAs: workshop.sourceUrl,
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      price: workshop.priceFromEgp,
      url: workshop.sourceUrl
    }
  };
}

export function serializeStructuredData(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
