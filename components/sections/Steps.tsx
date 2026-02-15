"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";
import { renderSectionIcon } from "@/components/sections/iconMap";
import type { CmsStepItem } from "@/sanity/lib/content";

type StepsProps = {
  heading: string;
  description: string;
  items: CmsStepItem[];
};

export function Steps({ heading, description, items }: StepsProps) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const nodes = refs.current.filter(Boolean) as HTMLButtonElement[];
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = nodes.findIndex((node) => node === entry.target);
            if (index >= 0) setActive(index);
          }
        });
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: 0.3 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const activeIconKey = items[active]?.iconKey ?? "file";

  return (
    <section className={layoutStyles.section} aria-labelledby="werkwijze">
      <div className={layoutStyles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="werkwijze">{heading}</h2>
          <p>{description}</p>
        </div>

        <div className={styles.stepsLayout}>
          <div className={styles.stepList}>
            {items.map((step, index) => (
              <button
                key={step.id}
                type="button"
                ref={(node) => {
                  refs.current[index] = node;
                }}
                onClick={() => setActive(index)}
                className={styles.stepButton}
                data-active={active === index}
                aria-current={active === index ? "step" : undefined}
              >
                <span className={styles.stepIndex}>0{index + 1}</span>
                <span>{step.title}</span>
              </button>
            ))}
          </div>

          <div className={styles.stepDetail}>
            <Card>
              <span className={styles.iconWrap}>
                {renderSectionIcon(activeIconKey, 20, 20)}
              </span>
              <h3>{items[active]?.title}</h3>
              <p>{items[active]?.detail}</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
