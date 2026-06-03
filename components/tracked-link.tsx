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

function isExternalHref(href: unknown): href is string {
  return typeof href === "string" && /^https?:\/\//i.test(href);
}

export function TrackedLink({
  event = "outbound_link_clicked",
  eventProperties,
  href,
  onClick,
  rel,
  children,
  ...props
}: TrackedLinkProps) {
  // External links get a hardening rel; preserve any caller-passed rel.
  const resolvedRel =
    rel ?? (isExternalHref(href) ? "noopener noreferrer" : undefined);

  return (
    <a
      href={href}
      rel={resolvedRel}
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
