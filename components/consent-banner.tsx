"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  captureAnalyticsEvent,
  dispatchConsentChange,
} from "@/components/analytics-provider";
import { consentSettingsEvent } from "@/components/consent-settings-button";
import {
  consentStorageKey,
  isAnalyticsConfigured,
  recordConsent,
  type ConsentChoice,
} from "@/lib/analytics";

type ConsentSnapshot = ConsentChoice | "unset" | "unknown";

function readConsent(): ConsentSnapshot {
  if (typeof window === "undefined") {
    return "unknown";
  }

  const stored = window.localStorage.getItem(consentStorageKey);
  return stored === "accepted" || stored === "rejected" ? stored : "unset";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("benchfinity-consent-change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("benchfinity-consent-change", callback);
  };
}

export function ConsentBanner() {
  const choice = useSyncExternalStore(subscribe, readConsent, () => "unknown");
  const [showDetails, setShowDetails] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    function openSettings() {
      setShowDetails(true);
      setSettingsOpen(true);
    }

    window.addEventListener(consentSettingsEvent, openSettings);
    return () => window.removeEventListener(consentSettingsEvent, openSettings);
  }, []);

  if (choice !== "unset" && !settingsOpen) {
    return null;
  }

  function choose(nextChoice: ConsentChoice) {
    recordConsent(nextChoice);
    dispatchConsentChange();
    setSettingsOpen(false);
    void captureAnalyticsEvent("consent_updated", {
      consent: nextChoice,
    });
  }

  return (
    <section
      aria-label="Cookie consent"
      className="border-bf-border bg-bf-surface fixed right-4 bottom-4 left-4 z-50 border p-4 shadow-2xl sm:left-auto sm:max-w-xl"
    >
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-bf-text text-base font-semibold">
            Analytics consent
          </h2>
          <p className="text-bf-text-muted mt-2 text-sm leading-6">
            Benchfinity uses self-hosted analytics to understand adoption and
            improve the site. Reject works. Generated designs are not uploaded.
          </p>
          {choice !== "unset" ? (
            <p className="text-bf-text-muted mt-2 text-sm">
              Current setting: {choice === "accepted" ? "accepted" : "rejected"}
              .
            </p>
          ) : null}
        </div>
        {showDetails ? (
          <div className="border-bf-border bg-bf-bg border p-3 text-sm">
            <p className="text-bf-text font-mono uppercase">Categories</p>
            <ul className="text-bf-text-muted mt-3 space-y-2">
              <li>Necessary: keeps the site working.</li>
              <li>
                Analytics: page views, referrers, CTA clicks, and basic device
                data after consent.
              </li>
              <li>
                Status:{" "}
                {isAnalyticsConfigured()
                  ? "analytics endpoint configured"
                  : "analytics endpoint pending"}
              </li>
            </ul>
          </div>
        ) : null}
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            className="border-bf-accent bg-bf-accent text-bf-bg hover:bg-bf-accent-bright min-h-11 border px-4 text-sm font-semibold"
            type="button"
            onClick={() => choose("accepted")}
          >
            Accept analytics
          </button>
          <button
            className="border-bf-border bg-bf-bg text-bf-text hover:border-bf-accent min-h-11 border px-4 text-sm font-semibold"
            type="button"
            onClick={() => choose("rejected")}
          >
            Reject
          </button>
          <button
            className="text-bf-accent-bright min-h-11 px-2 text-sm font-semibold underline"
            type="button"
            onClick={() => setShowDetails((value) => !value)}
          >
            Manage
          </button>
          {settingsOpen ? (
            <button
              className="text-bf-text-muted hover:text-bf-accent-bright min-h-11 px-2 text-sm font-semibold underline"
              type="button"
              onClick={() => setSettingsOpen(false)}
            >
              Close
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
