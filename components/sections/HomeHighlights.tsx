import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { BuildingIcon, ClockIcon, FileTextIcon } from "@/components/ui/icons";
import layoutStyles from "@/components/layout/layout.module.css";
import styles from "@/components/sections/sections.module.css";

const highlightItems = [
  {
    title: "Particuliere verhuizing",
    text: "Voor gezinnen en starters met duidelijke planning en vaste verhuiscrew.",
    bullets: ["Inpakken en montage mogelijk", "Scherpe planning per dagdeel"],
    href: "/verhuisdiensten",
    cta: "Bekijk verhuisdiensten",
    icon: FileTextIcon,
  },
  {
    title: "Zakelijk verhuizen",
    text: "Kantoorverhuizing met minimale downtime en strakke projectbegeleiding.",
    bullets: ["Buiten kantooruren mogelijk", "Vaste projectleider"],
    href: "/zakelijk-verhuizen",
    cta: "Bekijk zakelijke aanpak",
    icon: BuildingIcon,
  },
  {
    title: "Spoedverhuizing Friesland",
    text: "Bij urgente situaties schakelen wij snel, veilig en met heldere communicatie.",
    bullets: ["Direct telefonisch afgestemd", "Snelle inzet in heel Friesland"],
    href: "/spoedverhuizing",
    cta: "Bekijk spoedverhuizing",
    icon: ClockIcon,
  },
] as const;

export function HomeHighlights() {
  return (
    <section className={layoutStyles.section} aria-labelledby="home-highlights-heading">
      <div className={layoutStyles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="home-highlights-heading">Kies direct uw verhuisoplossing</h2>
          <p>
            Snel schakelen? Hieronder kiest u direct de route die past bij uw situatie in Friesland.
          </p>
        </div>

        <div className={styles.highlightGrid}>
          {highlightItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} tilt className={styles.highlightCard}>
                <span className={styles.iconWrap}>
                  <Icon width={20} height={20} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ul className={styles.miniList}>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <Link href={item.href}>{item.cta}</Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
