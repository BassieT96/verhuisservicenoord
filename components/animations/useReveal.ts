"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionPreference } from "@/components/animations/useReducedMotionPreference";

type RevealOptions = {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
};

export function useReveal(options: RevealOptions = {}) {
  const { rootMargin = "0px 0px -8% 0px", threshold = 0.14, once = true } = options;
  const ref = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotionPreference();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setRevealed(false);
          }
        });
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, reducedMotion, rootMargin, threshold]);

  return { ref, visible: reducedMotion || revealed };
}
