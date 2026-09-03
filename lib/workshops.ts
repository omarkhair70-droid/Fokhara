export type WorkshopFormat = "single" | "package" | "course";
export type AvailabilityMode = "request" | "next_available" | "contact" | "live";

export type WorkshopImage = {
  src: string;
  alt: string;
};

export type Workshop = {
  id: string;
  slug: string;
  name: string;
  format: WorkshopFormat;
  process: string[];
  audience: string;
  age: string;
  duration: string;
  sessions: number;
  priceFromEgp: number;
  priceToEgp?: number;
  compareAtEgp?: number;
  availabilityMode: AvailabilityMode;
  summary: string;
  actions: string[];
  outcome: string;
  materials?: string;
  recurringDays?: string[];
  sourceUrl: string;
  accent: string;
  image?: WorkshopImage;
  imageSource?: "woo" | "official-site";
};

export const workshops: Workshop[] = [
  {
    id: "handbuilding",
    slug: "handbuilding-pottery-workshop",
    name: "Handbuilding Pottery Workshop",
    format: "single",
    process: ["handbuilding"],
    audience: "Adults",
    age: "16+",
    duration: "3 hrs",
    sessions: 1,
    priceFromEgp: 800,
    availabilityMode: "request",
    summary:
      "A single-session introduction to handbuilding with clay, focused on forming your own pottery piece.",
    actions: ["Handle", "Shape", "Form"],
    outcome: "Form your own pottery piece.",
    materials: "600 g clay + firing.",
    recurringDays: [
      "Saturday · 7 PM",
      "Thursday · 11 AM",
      "Tuesday · 7 PM",
      "Wednesday · 7 PM"
    ],
    sourceUrl:
      "https://fokharastudioandshop.com/product/pottery-hand-building-pottery-workshop-cairo/",
    accent: "#9b6448"
  },
  {
    id: "wheelthrowing",
    slug: "wheelthrowing-pottery-workshop",
    name: "Wheelthrowing Pottery Workshop",
    format: "single",
    process: ["wheelthrowing"],
    audience: "Adults",
    age: "16+",
    duration: "3 hrs",
    sessions: 1,
    priceFromEgp: 900,
    availabilityMode: "request",
    summary:
      "A hands-on introduction to the pottery wheel, learning centering, pulling, and shaping.",
    actions: ["Center", "Pull", "Shape"],
    outcome: "Create your own wheel-thrown piece.",
    materials: "3 trials (500 g each) + firing of 2 pots.",
    recurringDays: [
      "Saturday · 7 PM",
      "Thursday · 11 AM",
      "Tuesday · 7 PM",
      "Wednesday · 7 PM"
    ],
    sourceUrl:
      "https://fokharastudioandshop.com/product/wheelthrowing-pottery-workshop-cairo/",
    accent: "#315d63"
  },
  {
    id: "short-course",
    slug: "1-month-pottery-course",
    name: "1-Month Pottery Course",
    format: "course",
    process: ["handbuilding", "wheelthrowing", "trimming", "glazing"],
    audience: "Adults",
    age: "16+",
    duration: "3 hrs / session",
    sessions: 4,
    priceFromEgp: 3100,
    compareAtEgp: 3400,
    availabilityMode: "request",
    summary:
      "A four-week program covering the full pottery-making sequence from forming through glazing.",
    actions: ["Handbuild", "Wheelthrow", "Trim", "Glaze"],
    outcome: "Move through four stages of the pottery-making process.",
    materials: "Pottery tools, clay, firing and glazing for the set course amounts.",
    recurringDays: [
      "Saturday · 7 PM",
      "Thursday · 11 AM",
      "Tuesday · 7 PM",
      "Wednesday · 7 PM"
    ],
    sourceUrl:
      "https://fokharastudioandshop.com/product/1-month-pottery-course-cairo/",
    accent: "#6b6678"
  },
  {
    id: "make-paint",
    slug: "make-and-paint-package",
    name: "Make & Paint 2 Workshops Package",
    format: "package",
    process: ["making", "decorating"],
    audience: "Adults",
    age: "16+",
    duration: "Day 1 · 3 hrs / Day 2 · 1.5–2 hrs",
    sessions: 2,
    priceFromEgp: 1500,
    priceToEgp: 1600,
    availabilityMode: "request",
    summary:
      "Make your own pot first, then return for a second session to paint or glaze it.",
    actions: ["Make", "Wait", "Finish"],
    outcome: "Create a pot, then return to decorate it.",
    sourceUrl:
      "https://fokharastudioandshop.com/product/two-day-pottery-workshop-cairo/",
    accent: "#7b6b3e"
  },
  {
    id: "family-time",
    slug: "family-time-pottery-workshop",
    name: "Family Time Pottery Workshop",
    format: "single",
    process: ["handbuilding", "painting"],
    audience: "Families",
    age: "Adults + kids 5+",
    duration: "2 hrs",
    sessions: 1,
    priceFromEgp: 1450,
    priceToEgp: 4300,
    availabilityMode: "request",
    summary:
      "A family session for adults and children to make side by side through handbuilding or painting.",
    actions: ["Choose", "Make", "Share"],
    outcome: "Make individual or shared pieces together.",
    sourceUrl:
      "https://fokharastudioandshop.com/product/family-pottery-workshop-cairo/",
    accent: "#5d744d"
  }
];

export const featuredWorkshop = workshops[1];

export function getWorkshop(slug: string) {
  return workshops.find((workshop) => workshop.slug === slug);
}

export function formatWorkshopPrice(workshop: Workshop) {
  const format = (value: number) =>
    new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0
    }).format(value);

  if (workshop.priceToEgp) {
    return `${format(workshop.priceFromEgp)} – ${format(workshop.priceToEgp)}`;
  }

  return format(workshop.priceFromEgp);
}
