"use client";

import type { AnchorHTMLAttributes } from "react";
import { captureAnalyticsEvent } from "@/components/analytics-provider";
import type {
  AnalyticsEventName,
  AnalyticsEventProperties,
} from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event?: AnalyticsEventName;
  eventProperties?: AnalyticsEventProperties;
};

export function TrackedLink({
  event = "outbound_link_clicked",
  eventProperties,
  href,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      href={href}
      onClick={(clickEvent) => {
        onClick?.(clickEvent);
        void captureAnalyticsEvent(event, {
          href,
          label:
            typeof children === "string" ? children : eventProperties?.label,
          ...eventProperties,
        });
      }}
      {...props}
    >
      {children}
    </a>
  );
}
