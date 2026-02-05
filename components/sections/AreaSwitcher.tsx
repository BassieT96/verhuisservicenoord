"use client";

import { useMemo, useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";
import type { ServiceArea } from "@/lib/site";

const areaData: Record<
  ServiceArea,
  {
    intro: string;
    usp: string;
    statA: string;
    statALabel: string;
    statB: string;
    statBLabel: string;
  }
> = {
  Leeuwarden: {
    intro: "Binnenstad of nieuwbouw: wij plannen slim rond laadplekken en drukke tijdvakken.",
    usp: "Ervaring met appartementen, smalle straten en strakke venstertijden.",
    statA: "<24u",
    statALabel: "Snelle terugkoppeling",
    statB: "350+",
    statBLabel: "Verhuizingen in regio Leeuwarden",
  },
  Drachten: {
    intro: "Voor gezinnen en bedrijven in Drachten werken we met vaste regionale ritten.",
    usp: "Efficiënte routeplanning met korte wachttijden.",
    statA: "7/7",
    statALabel: "Flexibele planning",
    statB: "200+",
    statBLabel: "Projecten per jaar",
  },
  Sneek: {
    intro: "Van stadspand tot eengezinswoning: wij stemmen de verhuizing af op uw tempo.",
    usp: "Rustige uitvoering met duidelijke communicatie.",
    statA: "9.4",
    statALabel: "Gemiddelde klantscore",
    statB: "95%",
    statBLabel: "Aanbevelingsgraad",
  },
  Heerenveen: {
    intro: "Zakelijke en particuliere verhuizingen met betrouwbare planning en vaste teams.",
    usp: "Ook inzetbaar buiten kantooruren.",
    statA: "18",
    statALabel: "Gemiddelde reactietijd (min)",
    statB: "160+",
    statBLabel: "Verhuisdagen per jaar",
  },
  Harlingen: {
    intro: "Ook in kustregio’s zorgen wij voor stabiele planning en veilige transportlijnen.",
    usp: "Snel schakelen bij weersafhankelijke planning.",
    statA: "100%",
    statALabel: "Verzekerd vervoer",
    statB: "120+",
    statBLabel: "Verhuizingen in regio Harlingen",
  },
};

export function AreaSwitcher() {
  const areas = useMemo(() => Object.keys(areaData) as ServiceArea[], []);
  const [activeArea, setActiveArea] = useState<ServiceArea>("Leeuwarden");
  const active = areaData[activeArea];

  return (
    <section className={layoutStyles.section} aria-labelledby="werkgebied-friesland">
      <div className={layoutStyles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="werkgebied-friesland">Werkgebied Friesland</h2>
          <p>Kies uw regio en bekijk onze lokale aanpak, pluspunten en planning.</p>
        </div>

        <div className={styles.areaChips}>
          {areas.map((area) => (
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
              <p>{active.intro}</p>
              <p>{active.usp}</p>
            </div>
            <div className={styles.areaStats}>
              <div className={styles.areaStat}>
                <strong>{active.statA}</strong>
                <span>{active.statALabel}</span>
              </div>
              <div className={styles.areaStat}>
                <strong>{active.statB}</strong>
                <span>{active.statBLabel}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
