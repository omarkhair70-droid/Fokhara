"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import type { Product } from "@/lib/products";
import { ProductVisual } from "@/components/ProductVisual";
import type { ProductVisualRole } from "@/lib/visual/image-choreography";
import {
  CARRY_LIFT_MS,
  carryPhysicsForRects
} from "@/lib/visual/carry-physics";
import {
  materialStateCssVars,
  materialStateForCollection
} from "@/lib/visual/material-state";

type Rect = { x: number; y: number; width: number; height: number };
type Phase =
  | "idle"
  | "captured"
  | "lifting"
  | "navigating"
  | "target-ready"
  | "recomposing"
  | "settled"
  | "cancelled";

export type ProductComposition =
  | "mass-left"
  | "mass-right"
  | "vertical-pressure";

type CarrySnapshot = {
  product: Product;
  sourceRoute: string;
  destinationRoute: string;
  sourceRect: Rect;
  composition: ProductComposition;
  sourceVisualRole: ProductVisualRole;
  targetRect?: Rect;
};

type CarryContextValue = {
  phase: Phase;
  beginProductCarry: (
    product: Product,
    source: HTMLElement,
    destinationRoute: string,
    returnState?: Record<string, unknown>,
    sourceVisualRole?: ProductVisualRole
  ) => void;
  registerProductTarget: (productId: string, element: HTMLElement | null) => void;
  isCarrying: (productId: string) => boolean;
  getProductComposition: (productId: string) => ProductComposition | null;
};

const CarryContext = createContext<CarryContextValue | null>(null);

const rectOf = (element: HTMLElement): Rect => {
  const rect = element.getBoundingClientRect();
  return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
};

const chooseComposition = (
  product: Product,
  sourceRect: Rect
): ProductComposition => {
  if (window.innerWidth <= 820) return "vertical-pressure";

  const sourceCenter = sourceRect.x + sourceRect.width / 2;
  const ratio = sourceCenter / window.innerWidth;

  if (ratio < 0.38) return "mass-left";
  if (ratio > 0.62) return "mass-right";

  // Center-band selections intentionally become a more compressed,
  // vertically resolved detail state. Product form only breaks near ties.
  if (product.form === "mug" && ratio >= 0.5) return "mass-right";
  return "vertical-pressure";
};

export function CarryProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [snapshot, setSnapshot] = useState<CarrySnapshot | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const targetRef = useRef<HTMLElement | null>(null);
  const cleanupTimer = useRef<number | null>(null);
  const navigationTimer = useRef<number | null>(null);

  const clearCarry = useCallback((nextPhase: Phase = "idle") => {
    if (cleanupTimer.current) window.clearTimeout(cleanupTimer.current);
    if (navigationTimer.current) window.clearTimeout(navigationTimer.current);
    cleanupTimer.current = null;
    navigationTimer.current = null;
    targetRef.current = null;
    setPhase(nextPhase);
    setSnapshot(null);
  }, []);

  useEffect(() => {
    return () => {
      if (cleanupTimer.current) window.clearTimeout(cleanupTimer.current);
      if (navigationTimer.current) window.clearTimeout(navigationTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!snapshot) return;
    if (pathname !== snapshot.destinationRoute) return;

    if (reducedMotion) {
      clearCarry();
      return;
    }

    const timer = window.setTimeout(() => {
      if (!targetRef.current) clearCarry("cancelled");
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [pathname, snapshot, reducedMotion, clearCarry]);

  const beginProductCarry = useCallback(
    (
      product: Product,
      source: HTMLElement,
      destinationRoute: string,
      returnState?: Record<string, unknown>,
      sourceVisualRole: ProductVisualRole = "browse"
    ) => {
      if (returnState) {
        sessionStorage.setItem("fokhara:shop-return", JSON.stringify(returnState));
      }

      const sourceRect = rectOf(source);
      const next: CarrySnapshot = {
        product,
        sourceRoute: pathname,
        destinationRoute,
        sourceRect,
        composition: chooseComposition(product, sourceRect),
        sourceVisualRole
      };

      if (cleanupTimer.current) window.clearTimeout(cleanupTimer.current);
      if (navigationTimer.current) window.clearTimeout(navigationTimer.current);

      setSnapshot(next);

      if (reducedMotion) {
        setPhase("navigating");
        router.push(destinationRoute);
        return;
      }

      setPhase("captured");

      requestAnimationFrame(() => {
        setPhase("lifting");
        navigationTimer.current = window.setTimeout(() => {
          navigationTimer.current = null;
          setPhase("navigating");
          router.push(destinationRoute);
        }, CARRY_LIFT_MS);
      });
    },
    [pathname, reducedMotion, router]
  );

  const registerProductTarget = useCallback(
    (productId: string, element: HTMLElement | null) => {
      if (!snapshot || snapshot.product.id !== productId || !element) return;
      if (pathname !== snapshot.destinationRoute) return;

      targetRef.current = element;

      if (reducedMotion) {
        clearCarry();
        return;
      }

      const targetRect = rectOf(element);
      const physics = carryPhysicsForRects(snapshot.sourceRect, targetRect);

      setSnapshot((current) =>
        current ? { ...current, targetRect } : current
      );
      setPhase("target-ready");

      requestAnimationFrame(() => {
        setPhase("recomposing");
        cleanupTimer.current = window.setTimeout(() => {
          setPhase("settled");
          cleanupTimer.current = window.setTimeout(() => clearCarry(), 90);
        }, physics.settleMs);
      });
    },
    [snapshot, pathname, reducedMotion, clearCarry]
  );

  const value = useMemo(
    () => ({
      phase,
      beginProductCarry,
      registerProductTarget,
      isCarrying: (productId: string) =>
        Boolean(snapshot && snapshot.product.id === productId && phase !== "idle"),
      getProductComposition: (productId: string) =>
        snapshot?.product.id === productId ? snapshot.composition : null
    }),
    [phase, beginProductCarry, registerProductTarget, snapshot]
  );

  const overlayRect =
    phase === "recomposing" || phase === "target-ready" || phase === "settled"
      ? snapshot?.targetRect ?? snapshot?.sourceRect
      : snapshot?.sourceRect;

  const physics = snapshot
    ? carryPhysicsForRects(snapshot.sourceRect, snapshot.targetRect)
    : null;

  const material = snapshot
    ? materialStateForCollection(snapshot.product.collection)
    : null;

  const overlayScale =
    phase === "lifting"
      ? 1.014
      : phase === "navigating"
        ? 1.008
        : phase === "settled"
          ? 0.998
          : 1;

  return (
    <CarryContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {snapshot && overlayRect && !reducedMotion ? (
          <motion.div
            key={snapshot.product.id}
            className="carryOverlay"
            aria-hidden="true"
            data-phase={phase}
            data-material={material?.id ?? "neutral"}
            data-distance-profile={physics?.id ?? "near"}
            style={materialStateCssVars(snapshot.product.collection)}
            initial={{
              left: snapshot.sourceRect.x,
              top: snapshot.sourceRect.y,
              width: snapshot.sourceRect.width,
              height: snapshot.sourceRect.height,
              opacity: 1,
              scale: 1
            }}
            animate={{
              left: overlayRect.x,
              top: overlayRect.y,
              width: overlayRect.width,
              height: overlayRect.height,
              opacity: phase === "settled" ? 0 : 1,
              scale: overlayScale
            }}
            exit={{ opacity: 0 }}
            transition={{
              left: {
                type: "spring",
                stiffness: physics?.stiffness ?? 176,
                damping: physics?.damping ?? 24,
                mass: physics?.mass ?? 0.82
              },
              top: {
                type: "spring",
                stiffness: physics?.stiffness ?? 176,
                damping: physics?.damping ?? 24,
                mass: physics?.mass ?? 0.82
              },
              width: {
                type: "spring",
                stiffness: physics?.stiffness ?? 176,
                damping: physics?.damping ?? 24,
                mass: physics?.mass ?? 0.82
              },
              height: {
                type: "spring",
                stiffness: physics?.stiffness ?? 176,
                damping: physics?.damping ?? 24,
                mass: physics?.mass ?? 0.82
              },
              scale: {
                duration: phase === "lifting" ? 0.11 : 0.28,
                ease: [0.2, 0.65, 0.25, 1]
              },
              opacity: {
                duration: 0.12,
                ease: "easeOut"
              }
            }}
            data-recomposing={
              phase === "target-ready" || phase === "recomposing"
            }
          >
            <div className="carryOverlayVisual">
              <ProductVisual
                product={snapshot.product}
                visualRole={snapshot.sourceVisualRole}
                className="carryOverlayVisual__source"
              />
              <ProductVisual
                product={snapshot.product}
                visualRole="detail"
                className="carryOverlayVisual__destination"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </CarryContext.Provider>
  );
}

export function useCarry() {
  const value = useContext(CarryContext);
  if (!value) throw new Error("useCarry must be used inside CarryProvider");
  return value;
}
