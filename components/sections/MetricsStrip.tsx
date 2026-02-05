"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";
import { useReducedMotionPreference } from "@/components/animations/useReducedMotionPreference";

type Metric = {
  value: number;
  suffix?: string;
  label: string;
};

const metrics: Metric[] = [
  { value: 1500, suffix: "+", label: "Verhuizingen uitgevoerd" },
  { value: 15, suffix: "+", label: "Jaar ervaring in Friesland" },
  { value: 94, suffix: "%", label: "Klanten die ons aanbevelen" },
];

function formatMetric(metric: Metric, current: number) {
  if (metric.suffix === "%") return `${current}${metric.suffix}`;
  return `${current}${metric.suffix ?? ""}`;
}

export function MetricsStrip() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [values, setValues] = useState<number[]>(metrics.map(() => 0));
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
        setValues(metrics.map((item) => item.value));
      });
      return () => cancelAnimationFrame(frame);
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1000;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setValues(metrics.map((item) => Math.round(item.value * eased)));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduceMotion]);

  return (
    <section className={layoutStyles.section} aria-label="Kerncijfers">
      <div className={layoutStyles.container}>
        <div className={styles.metrics} ref={ref}>
          {metrics.map((metric, index) => (
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
