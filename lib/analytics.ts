export const analyticsConfig = {
  posthogKey:
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ??
    process.env.NEXT_PUBLIC_POSTHOG_KEY,
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST,
} as const;

export function isAnalyticsConfigured() {
  return Boolean(analyticsConfig.posthogKey && analyticsConfig.posthogHost);
}

export type ConsentChoice = "accepted" | "rejected";

export const consentStorageKey = "benchfinity.analytics-consent";

export function recordConsent(choice: ConsentChoice) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(consentStorageKey, choice);
}

export type AnalyticsEventName =
  | "page_viewed"
  | "cta_clicked"
  | "outbound_link_clicked"
  | "consent_updated";

export type AnalyticsEventProperties = Record<
  string,
  string | number | boolean | null | undefined
>;
