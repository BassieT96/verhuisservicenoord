"use client";

import { useMemo, useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";
import type { CmsAreaItem } from "@/sanity/lib/content";

type AreaSwitcherProps = {
  heading: string;
  description: string;
  areas: CmsAreaItem[];
};

export function AreaSwitcher({ heading, description, areas }: AreaSwitcherProps) {
  const names = useMemo(() => areas.map((item) => item.name), [areas]);
  const [activeArea, setActiveArea] = useState<string>(names[0] ?? "");
  const active = areas.find((item) => item.name === activeArea) ?? areas[0];

  return (
    <section className={layoutStyles.section} aria-labelledby="werkgebied-friesland">
      <div className={layoutStyles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="werkgebied-friesland">{heading}</h2>
          <p>{description}</p>
        </div>

        <div className={styles.areaChips}>
          {names.map((area) => (
            <Chip
              key={area}
              label={area}
              active={activeArea === area}
              onClick={() => setActiveArea(area)}
              ariaControls="area-switch-panel"
            />
          ))}
        </div>

        <Card>
          <div id="area-switch-panel" className={styles.areaPanel} role="region" aria-live="polite">
            <div>
              <h3>{activeArea}</h3>
              <p>{active?.intro}</p>
              <p>{active?.usp}</p>
            </div>
            <div className={styles.areaStats}>
              <div className={styles.areaStat}>
                <strong>{active?.statA}</strong>
                <span>{active?.statALabel}</span>
              </div>
              <div className={styles.areaStat}>
                <strong>{active?.statB}</strong>
                <span>{active?.statBLabel}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
