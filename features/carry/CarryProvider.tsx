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

type Rect = { x: number; y: number; width: number; height: number };
type Phase =
  | "idle"
  | "captured"
  | "navigating"
  | "target-ready"
  | "recomposing"
  | "settled"
  | "cancelled";

type CarrySnapshot = {
  product: Product;
  sourceRoute: string;
  destinationRoute: string;
  sourceRect: Rect;
  targetRect?: Rect;
};

type CarryContextValue = {
  phase: Phase;
  beginProductCarry: (
    product: Product,
    source: HTMLElement,
    destinationRoute: string,
    returnState?: Record<string, unknown>
  ) => void;
  registerProductTarget: (productId: string, element: HTMLElement | null) => void;
  isCarrying: (productId: string) => boolean;
};

const CarryContext = createContext<CarryContextValue | null>(null);

const rectOf = (element: HTMLElement): Rect => {
  const rect = element.getBoundingClientRect();
  return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
};

export function CarryProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [snapshot, setSnapshot] = useState<CarrySnapshot | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const targetRef = useRef<HTMLElement | null>(null);
  const cleanupTimer = useRef<number | null>(null);

  const clearCarry = useCallback((nextPhase: Phase = "idle") => {
    if (cleanupTimer.current) window.clearTimeout(cleanupTimer.current);
    targetRef.current = null;
    setPhase(nextPhase);
    setSnapshot(null);
  }, []);

  useEffect(() => {
    return () => {
      if (cleanupTimer.current) window.clearTimeout(cleanupTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!snapshot) return;
    if (pathname !== snapshot.destinationRoute) return;

    if (reducedMotion) {
      setPhase("settled");
      cleanupTimer.current = window.setTimeout(() => clearCarry(), 140);
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
      returnState?: Record<string, unknown>
    ) => {
      if (returnState) {
        sessionStorage.setItem("fokhara:shop-return", JSON.stringify(returnState));
      }

      const next: CarrySnapshot = {
        product,
        sourceRoute: pathname,
        destinationRoute,
        sourceRect: rectOf(source)
      };

      setSnapshot(next);
      setPhase(reducedMotion ? "navigating" : "captured");

      requestAnimationFrame(() => {
        setPhase("navigating");
        router.push(destinationRoute);
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
        setPhase("settled");
        cleanupTimer.current = window.setTimeout(() => clearCarry(), 120);
        return;
      }

      setSnapshot((current) =>
        current ? { ...current, targetRect: rectOf(element) } : current
      );
      setPhase("target-ready");

      requestAnimationFrame(() => {
        setPhase("recomposing");
        cleanupTimer.current = window.setTimeout(() => {
          setPhase("settled");
          cleanupTimer.current = window.setTimeout(() => clearCarry(), 90);
        }, 560);
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
        Boolean(snapshot && snapshot.product.id === productId && phase !== "idle")
    }),
    [phase, beginProductCarry, registerProductTarget, snapshot]
  );

  const overlayRect =
    phase === "recomposing" || phase === "target-ready"
      ? snapshot?.targetRect ?? snapshot?.sourceRect
      : snapshot?.sourceRect;

  return (
    <CarryContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {snapshot && overlayRect && !reducedMotion ? (
          <motion.div
            key={snapshot.product.id}
            className="carryOverlay"
            aria-hidden="true"
            initial={{
              left: snapshot.sourceRect.x,
              top: snapshot.sourceRect.y,
              width: snapshot.sourceRect.width,
              height: snapshot.sourceRect.height,
              opacity: 1
            }}
            animate={{
              left: overlayRect.x,
              top: overlayRect.y,
              width: overlayRect.width,
              height: overlayRect.height,
              opacity: phase === "settled" ? 0 : 1
            }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 170,
              damping: 24,
              mass: 0.82
            }}
          >
            <ProductVisual product={snapshot.product} />
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
