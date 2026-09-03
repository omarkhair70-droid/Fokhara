export type AnalyticsEvent =
  | "home_shop_enter"
  | "home_workshops_enter"
  | "product_open"
  | "product_to_workshop"
  | "add_to_cart"
  | "workshop_open"
  | "workshop_to_product"
  | "booking_start"
  | "preferred_schedule_selected"
  | "booking_commit"
  | "checkout_start"
  | "purchase_complete";

export type AnalyticsPayload = Record<
  string,
  string | number | boolean | null | undefined
>;

export function track(
  event: AnalyticsEvent,
  payload: AnalyticsPayload = {}
) {
  if (typeof window === "undefined") return;

  const detail = {
    event,
    ...payload
  };

  window.dispatchEvent(
    new CustomEvent("fokhara:analytics", {
      detail
    })
  );

  const analyticsWindow = window as Window & {
    dataLayer?: Array<Record<string, unknown>>;
  };

  if (Array.isArray(analyticsWindow.dataLayer)) {
    analyticsWindow.dataLayer.push(detail);
  }
}
