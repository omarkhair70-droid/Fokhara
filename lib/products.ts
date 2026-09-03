export type ProductCollection = "Nebula" | "Midnight" | "Ocean";

export type Product = {
  id: string;
  slug: string;
  name: string;
  priceEgp: number;
  stock: "in_stock" | "out_of_stock";
  collection: ProductCollection;
  form: "espresso" | "pinch" | "mug";
  accent: string;
  accentInk: string;
  description?: string;
  sourceUrl: string;
};

export const products: Product[] = [
  {
    id: "nebula-espresso",
    slug: "nebula-espresso-cup",
    name: "Nebula Espresso Cup",
    priceEgp: 300,
    stock: "in_stock",
    collection: "Nebula",
    form: "espresso",
    accent: "#65677f",
    accentInk: "#f5f2ea",
    sourceUrl: "https://fokharastudioandshop.com/"
  },
  {
    id: "nebula-pinch",
    slug: "nebula-pinch-cup",
    name: "Nebula Pinch Cup",
    priceEgp: 450,
    stock: "in_stock",
    collection: "Nebula",
    form: "pinch",
    accent: "#79768a",
    accentInk: "#f7f2e9",
    description:
      "A handmade pinch cup finished in Fokhara's Nebula glaze and made for daily use.",
    sourceUrl: "https://fokharastudioandshop.com/product/nebula-pinch-cup/"
  },
  {
    id: "midnight-pinch",
    slug: "midnight-pinch-cup",
    name: "Midnight Pinch Cup",
    priceEgp: 450,
    stock: "out_of_stock",
    collection: "Midnight",
    form: "pinch",
    accent: "#2b2d30",
    accentInk: "#f4efe4",
    sourceUrl: "https://fokharastudioandshop.com/"
  },
  {
    id: "midnight-mug",
    slug: "midnight-mug",
    name: "Midnight Mug",
    priceEgp: 450,
    stock: "out_of_stock",
    collection: "Midnight",
    form: "mug",
    accent: "#26292c",
    accentInk: "#f4efe4",
    sourceUrl: "https://fokharastudioandshop.com/"
  },
  {
    id: "ocean-espresso",
    slug: "ocean-espresso-cup",
    name: "Ocean Espresso Cup",
    priceEgp: 300,
    stock: "out_of_stock",
    collection: "Ocean",
    form: "espresso",
    accent: "#3f7377",
    accentInk: "#eff6f2",
    description:
      "A handmade short cup finished in Fokhara's Ocean glaze and designed for daily use.",
    sourceUrl: "https://fokharastudioandshop.com/product/ocean-espresso-cup/"
  },
  {
    id: "ocean-pinch",
    slug: "ocean-pinch-cup",
    name: "Ocean Pinch Cup",
    priceEgp: 450,
    stock: "out_of_stock",
    collection: "Ocean",
    form: "pinch",
    accent: "#43797c",
    accentInk: "#eff6f2",
    sourceUrl: "https://fokharastudioandshop.com/"
  }
];

export const featuredProduct = products[1];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatEgp(value: number) {
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0
  }).format(value);
}
