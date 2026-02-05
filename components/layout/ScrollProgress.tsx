"use client";

import { useEffect, useRef } from "react";
import styles from "@/components/layout/layout.module.css";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function ScrollProgress() {
  const barRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      const bar = barRef.current;
      if (!bar) {
        frameId = 0;
        return;
      }

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = maxScroll > 0 ? clamp(window.scrollY / maxScroll) : 0;
      bar.style.transform = `scaleX(${ratio})`;
      frameId = 0;
    };

    const requestUpdate = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateProgress);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div className={styles.scrollProgress} aria-hidden="true">
      <span ref={barRef} className={styles.scrollProgressBar} />
    </div>
  );
}
