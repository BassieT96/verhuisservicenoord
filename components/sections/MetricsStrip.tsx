"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";
import { useReducedMotionPreference } from "@/components/animations/useReducedMotionPreference";
import type { CmsMetricItem } from "@/sanity/lib/content";

type MetricsStripProps = {
  items: CmsMetricItem[];
};

function formatMetric(metric: CmsMetricItem, current: number) {
  if (metric.suffix === "%") return `${current}${metric.suffix}`;
  return `${current}${metric.suffix ?? ""}`;
}

export function MetricsStrip({ items }: MetricsStripProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [values, setValues] = useState<number[]>(items.map(() => 0));
  const reduceMotion = useReducedMotionPreference();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    if (reduceMotion) {
      const frame = requestAnimationFrame(() => {
        setValues(items.map((item) => item.value));
      });
      return () => cancelAnimationFrame(frame);
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1000;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setValues(items.map((item) => Math.round(item.value * eased)));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, items, reduceMotion]);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className={layoutStyles.section} aria-label="Kerncijfers">
      <div className={layoutStyles.container}>
        <div className={styles.metrics} ref={ref}>
          {items.map((metric, index) => (
            <div key={metric.label} className={styles.metricItem}>
              <strong>{formatMetric(metric, values[index] ?? 0)}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
