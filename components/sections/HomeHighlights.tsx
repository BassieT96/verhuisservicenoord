import Link from "next/link";
import { Card } from "@/components/ui/Card";
import layoutStyles from "@/components/layout/layout.module.css";
import styles from "@/components/sections/sections.module.css";
import type { CmsHighlightItem } from "@/sanity/lib/content";
import { resolveSectionIcon } from "@/components/sections/iconMap";

type HomeHighlightsProps = {
  heading: string;
  description: string;
  items: CmsHighlightItem[];
};

export function HomeHighlights({ heading, description, items }: HomeHighlightsProps) {
  return (
    <section className={layoutStyles.section} aria-labelledby="home-highlights-heading">
      <div className={layoutStyles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="home-highlights-heading">{heading}</h2>
          <p>{description}</p>
        </div>

        <div className={styles.highlightGrid}>
          {items.map((item) => {
            const Icon = resolveSectionIcon(item.iconKey);
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
