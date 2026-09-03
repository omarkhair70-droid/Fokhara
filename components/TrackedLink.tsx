"use client";

import Link from "next/link";
import type { AnalyticsEvent, AnalyticsPayload } from "@/lib/analytics";
import { track } from "@/lib/analytics";

type Props = React.ComponentProps<typeof Link> & {
  eventName: AnalyticsEvent;
  eventPayload?: AnalyticsPayload;
};

export function TrackedLink({
  eventName,
  eventPayload,
  onClick,
  ...props
}: Props) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        track(eventName, eventPayload);
        onClick?.(event);
      }}
    />
  );
}
