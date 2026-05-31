"use client";

export const consentSettingsEvent = "benchfinity-consent-settings-open";

export function openConsentSettings() {
  window.dispatchEvent(new Event(consentSettingsEvent));
}

export function ConsentSettingsButton({ className }: { className?: string }) {
  return (
    <button className={className} type="button" onClick={openConsentSettings}>
      Cookie settings
    </button>
  );
}
