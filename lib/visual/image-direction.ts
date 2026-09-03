export type FokharaImageMode =
  | "object-truth"
  | "material-evidence"
  | "action-hand"
  | "human-life"
  | "studio-field";

export type FokharaImageDistance = "M0" | "M1" | "M2" | "M3" | "M4";

export type FokharaImageRole =
  | "product-primary"
  | "product-alternate"
  | "material-macro"
  | "process"
  | "participant"
  | "founder"
  | "object-in-use"
  | "studio-wide"
  | "visit-arrival";

export const imageDirection = {
  modes: {
    objectTruth: {
      mode: "object-truth",
      distance: "M2",
      priority: ["colour-accuracy", "silhouette", "volume"]
    },
    materialEvidence: {
      mode: "material-evidence",
      distance: "M0",
      priority: ["real-surface", "texture", "light-angle"]
    },
    actionHand: {
      mode: "action-hand",
      distance: "M1",
      priority: ["contact-point", "pressure", "tool-causality"]
    },
    humanLife: {
      mode: "human-life",
      distance: "M3",
      priority: ["activity", "scale", "use"]
    },
    studioField: {
      mode: "studio-field",
      distance: "M4",
      priority: ["place", "practice-evidence", "orientation"]
    }
  },
  routeSequences: {
    home: ["M0", "M2", "M1", "M3", "M4"],
    shop: ["M2"],
    collection: ["M2", "M0", "M2"],
    product: ["M2", "M0", "M2", "M3"],
    workshop: ["M1", "M3", "M1", "M2"],
    studio: ["M4", "M3", "M1", "M0", "M2", "M4"],
    visit: ["M4", "M4"],
    cart: ["M2"]
  }
} as const;
