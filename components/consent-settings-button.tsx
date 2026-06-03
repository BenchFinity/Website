"use client";

import { useEffect, useState } from "react";

export const consentSettingsEvent = "benchfinity-consent-settings-open";
export const consentSettingsCloseEvent = "benchfinity-consent-settings-close";

export function openConsentSettings() {
  window.dispatchEvent(new Event(consentSettingsEvent));
}

export function ConsentSettingsButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    window.addEventListener(consentSettingsEvent, onOpen);
    window.addEventListener(consentSettingsCloseEvent, onClose);

    return () => {
      window.removeEventListener(consentSettingsEvent, onOpen);
      window.removeEventListener(consentSettingsCloseEvent, onClose);
    };
  }, []);

  return (
    <button
      className={className}
      type="button"
      aria-expanded={open}
      onClick={openConsentSettings}
    >
      Cookie settings
    </button>
  );
}
