"use client";

import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";
import type { CmsServiceCardItem } from "@/sanity/lib/content";
import { resolveSectionIcon } from "@/components/sections/iconMap";

type ServicesProps = {
  heading: string;
  description: string;
  quickFallback: string;
  items: CmsServiceCardItem[];
};

export function Services({ heading, description, quickFallback, items }: ServicesProps) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className={layoutStyles.section} aria-labelledby="diensten">
      <div className={layoutStyles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="diensten">{heading}</h2>
          <p>{description}</p>
        </div>

        <div className={styles.serviceGrid}>
          {items.map((service) => {
            const Icon = resolveSectionIcon(service.iconKey);
            const isActive = active === service.title;
            const quickText = isActive ? service.quick : quickFallback;
            return (
              <div
                key={service.title}
                className={styles.serviceCard}
                onMouseEnter={() => setActive(service.title)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(service.title)}
                onBlur={() => setActive(null)}
              >
                <Card tilt>
                  <span className={styles.iconWrap}>
                    <Icon width={20} height={20} />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <p className={styles.serviceQuick} aria-live="polite">
                    {quickText}
                  </p>
                  <Link href={service.href}>Bekijk dienst</Link>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
