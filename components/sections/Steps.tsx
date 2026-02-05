"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { FileTextIcon, RouteIcon, ShieldIcon } from "@/components/ui/icons";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";

const steps = [
  {
    id: "intake",
    title: "Intake & inventarisatie",
    detail:
      "We brengen uw wensen in kaart: volume, route, toegang en gewenste datum. U krijgt direct helder advies over de slimste aanpak.",
    icon: FileTextIcon,
  },
  {
    id: "planning",
    title: "Planning & voorbereiding",
    detail:
      "U ontvangt een duidelijke offerte en planning. Wij stemmen af welke materialen, voertuigen en extra hulp nodig zijn.",
    icon: RouteIcon,
  },
  {
    id: "uitvoering",
    title: "Verhuisdag & oplevering",
    detail:
      "Ons team verhuist zorgvuldig, zet alles op de juiste plek en loopt de oplevering samen met u na. Zo rondt u de dag zonder losse eindjes af.",
    icon: ShieldIcon,
  },
] as const;

export function Steps() {
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

  const ActiveIcon = steps[active].icon;

  return (
    <section className={layoutStyles.section} aria-labelledby="werkwijze">
      <div className={layoutStyles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="werkwijze">Werkwijze in 3 stappen</h2>
          <p>Van eerste belletje tot laatste doos: u weet precies waar u aan toe bent.</p>
        </div>

        <div className={styles.stepsLayout}>
          <div className={styles.stepList}>
            {steps.map((step, index) => (
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
                <ActiveIcon width={20} height={20} />
              </span>
              <h3>{steps[active].title}</h3>
              <p>{steps[active].detail}</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
