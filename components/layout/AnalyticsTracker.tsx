"use client";

import { useEffect } from "react";

type DataLayerEvent = {
  event: string;
  label?: string;
  location?: string;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

export function AnalyticsTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const element = target.closest<HTMLElement>("[data-track-event]");
      if (!element) return;

      const eventName = element.dataset.trackEvent;
      if (!eventName) return;

      const payload: DataLayerEvent = {
        event: eventName,
        label: element.dataset.trackLabel,
        location: element.dataset.trackLocation,
      };

      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push(payload);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
