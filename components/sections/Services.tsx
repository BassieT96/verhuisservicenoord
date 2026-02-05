"use client";

import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { BuildingIcon, ClockIcon, FileTextIcon, ShieldIcon } from "@/components/ui/icons";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";

const services = [
  {
    title: "Verhuisdiensten",
    text: "Complete particuliere verhuizingen inclusief inpakservice, transport en montage.",
    quick: "Snel ingepland in heel Friesland.",
    href: "/verhuisdiensten",
    icon: FileTextIcon,
  },
  {
    title: "Zakelijk verhuizen",
    text: "Kantoorverhuizingen met minimale downtime en één vast aanspreekpunt.",
    quick: "Ook in weekend of avond mogelijk.",
    href: "/zakelijk-verhuizen",
    icon: BuildingIcon,
  },
  {
    title: "Seniorenverhuizing",
    text: "Rustige begeleiding voor senioren en familie, stap voor stap en zonder haast.",
    quick: "Persoonlijk en zorgvuldig uitgevoerd.",
    href: "/seniorenverhuizing",
    icon: ShieldIcon,
  },
  {
    title: "Spoedverhuizing",
    text: "Bij onverwachte situaties schakelen wij snel met een flexibel verhuisteam.",
    quick: "Direct telefonisch afgestemd.",
    href: "/spoedverhuizing",
    icon: ClockIcon,
  },
] as const;

export function Services() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className={layoutStyles.section} aria-labelledby="diensten">
      <div className={layoutStyles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="diensten">Diensten in Friesland</h2>
          <p>
            Kies de dienst die past bij uw situatie. Op desktop ziet u extra details door te hoveren,
            op mobiel door te tikken.
          </p>
        </div>

        <div className={styles.serviceGrid}>
          {services.map((service) => {
            const Icon = service.icon;
            const isActive = active === service.title;
            const quickText = isActive ? service.quick : "Snel inzicht in planning en aanpak.";
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
