import { consentStorageKey, type ConsentChoice } from "@/lib/analytics";

export type ConsentSnapshot = ConsentChoice | "unset" | "unknown";

export const consentChangeEvent = "benchfinity-consent-change";

export function readConsent(): ConsentSnapshot {
  if (typeof window === "undefined") {
    return "unknown";
  }

  const stored = window.localStorage.getItem(consentStorageKey);
  return stored === "accepted" || stored === "rejected" ? stored : "unset";
}

export function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", callback);
  window.addEventListener(consentChangeEvent, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(consentChangeEvent, callback);
  };
}
