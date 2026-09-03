export type CarryPhysicsProfile = {
  id: "near" | "medium" | "far";
  stiffness: number;
  damping: number;
  mass: number;
  settleMs: number;
};

type RectLike = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const CARRY_LIFT_MS = 92;

function center(rect: RectLike) {
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2
  };
}

export function carryTravelDistance(source: RectLike, target?: RectLike) {
  if (!target) return 0;
  const a = center(source);
  const b = center(target);
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export function carryPhysicsForDistance(
  distance: number
): CarryPhysicsProfile {
  if (distance > 900) {
    return {
      id: "far",
      stiffness: 132,
      damping: 26,
      mass: 0.98,
      settleMs: 620
    };
  }

  if (distance > 520) {
    return {
      id: "medium",
      stiffness: 150,
      damping: 25,
      mass: 0.9,
      settleMs: 580
    };
  }

  return {
    id: "near",
    stiffness: 176,
    damping: 24,
    mass: 0.82,
    settleMs: 540
  };
}

export function carryPhysicsForRects(
  source: RectLike,
  target?: RectLike
): CarryPhysicsProfile {
  return carryPhysicsForDistance(carryTravelDistance(source, target));
}
