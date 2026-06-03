"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import type { PostHog } from "posthog-js";
import {
  analyticsConfig,
  isAnalyticsConfigured,
  type AnalyticsEventName,
  type AnalyticsEventProperties,
} from "@/lib/analytics";
import {
  consentChangeEvent,
  readConsent,
  subscribe,
  type ConsentSnapshot,
} from "@/lib/consent";

type PostHogClient = PostHog;

let posthogClient: PostHogClient | null = null;
let initPromise: Promise<PostHogClient | null> | null = null;

async function getPostHogClient() {
  const { posthogHost, posthogKey } = analyticsConfig;

  if (!isAnalyticsConfigured() || !posthogHost || !posthogKey) {
    return null;
  }

  if (posthogClient) {
    return posthogClient;
  }

  initPromise ??= import("posthog-js").then((module) => {
    module.default.init(posthogKey, {
      api_host: posthogHost,
      defaults: "2026-01-30",
      capture_pageview: false,
      autocapture: false,
      disable_session_recording: true,
      opt_out_capturing_by_default: true,
    });

    posthogClient = module.default;
    return posthogClient;
  });

  return initPromise;
}

export async function captureAnalyticsEvent(
  event: AnalyticsEventName,
  properties: AnalyticsEventProperties = {},
) {
  if (readConsent() !== "accepted") {
    return;
  }

  const client = await getPostHogClient();
  client?.opt_in_capturing();
  client?.capture(event, properties);
}

export function dispatchConsentChange() {
  window.dispatchEvent(new Event(consentChangeEvent));
}

export function AnalyticsProvider() {
  const pathname = usePathname();
  const consent = useSyncExternalStore<ConsentSnapshot>(
    subscribe,
    readConsent,
    () => "unknown",
  );
  const previousConsent = useRef<ConsentSnapshot>(consent);

  useEffect(() => {
    if (consent === "accepted") {
      void getPostHogClient().then((client) => client?.opt_in_capturing());
      return;
    }

    if (consent === "rejected" && posthogClient) {
      posthogClient.opt_out_capturing();
      posthogClient.reset();
    }
  }, [consent]);

  // Fire page_viewed on navigation (pathname change). captureAnalyticsEvent
  // is gated on accepted consent, so this no-ops until the user opts in.
  useEffect(() => {
    void captureAnalyticsEvent("page_viewed", {
      path: pathname,
      url: typeof window === "undefined" ? null : window.location.href,
    });
  }, [pathname]);

  // Backfill the current page_viewed exactly once on the genuine transition
  // into "accepted" (e.g. unset/rejected -> accepted). Tracking the previous
  // consent in a ref prevents re-firing on repeated consent toggles for the
  // same path.
  useEffect(() => {
    const wasAccepted = previousConsent.current === "accepted";
    previousConsent.current = consent;

    if (consent === "accepted" && !wasAccepted) {
      void captureAnalyticsEvent("page_viewed", {
        path: pathname,
        url: typeof window === "undefined" ? null : window.location.href,
      });
    }
  }, [consent, pathname]);

  return null;
}
