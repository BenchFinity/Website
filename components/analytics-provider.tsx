"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import type { PostHog } from "posthog-js";
import {
  analyticsConfig,
  consentStorageKey,
  isAnalyticsConfigured,
  type AnalyticsEventName,
  type AnalyticsEventProperties,
} from "@/lib/analytics";

type ConsentSnapshot = "accepted" | "rejected" | "unset" | "unknown";
type PostHogClient = PostHog;

const consentChangeEvent = "benchfinity-consent-change";

let posthogClient: PostHogClient | null = null;
let initPromise: Promise<PostHogClient | null> | null = null;

function readConsent(): ConsentSnapshot {
  if (typeof window === "undefined") {
    return "unknown";
  }

  const stored = window.localStorage.getItem(consentStorageKey);
  return stored === "accepted" || stored === "rejected" ? stored : "unset";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(consentChangeEvent, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(consentChangeEvent, callback);
  };
}

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
  const consent = useSyncExternalStore(subscribe, readConsent, () => "unknown");

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

  useEffect(() => {
    void captureAnalyticsEvent("page_viewed", {
      path: pathname,
      url: typeof window === "undefined" ? null : window.location.href,
    });
  }, [pathname, consent]);

  return null;
}
