"use client";

import { useEffect, useState } from "react";

const KEY = "drivesmart_cookie_consent_v1";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!localStorage.getItem(KEY));
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 w-[95%] max-w-3xl -translate-x-1/2 rounded-lg border border-slate-300 bg-white p-4 shadow-xl"
      role="dialog"
      aria-live="polite"
    >
      <p className="text-sm text-slate-700">
        We use essential and analytics cookies to improve your experience. You can request data export/deletion from the
        privacy center.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          className="rounded bg-brand-blue px-3 py-2 text-sm font-semibold text-white"
          onClick={() => {
            localStorage.setItem(KEY, "accepted");
            setVisible(false);
          }}
        >
          Accept
        </button>
        <button
          className="rounded border px-3 py-2 text-sm"
          onClick={() => {
            localStorage.setItem(KEY, "essential");
            setVisible(false);
          }}
        >
          Essential only
        </button>
      </div>
    </div>
  );
}
