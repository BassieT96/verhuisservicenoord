import { Reveal } from "@/components/animations/Reveal";
import { Card } from "@/components/ui/Card";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";
import type { CmsBenefitItem } from "@/sanity/lib/content";
import { resolveSectionIcon } from "@/components/sections/iconMap";

type BenefitsProps = {
  heading: string;
  description: string;
  items: CmsBenefitItem[];
};

export function Benefits({ heading, description, items }: BenefitsProps) {
  return (
    <section className={layoutStyles.section} aria-labelledby="waarom-vsn">
      <div className={layoutStyles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="waarom-vsn">{heading}</h2>
          <p>{description}</p>
        </div>

        <div className={styles.benefitGrid}>
          {items.map((item, index) => {
            const Icon = resolveSectionIcon(item.iconKey);
            return (
              <Reveal key={item.title} delay={index * 70} className={styles.benefitCard}>
                <div className={styles.flipCard} tabIndex={0}>
                  <div className={styles.flipCardInner}>
                    <Card className={styles.flipCardFront}>
                      <span className={styles.iconWrap}>
                        <Icon width={20} height={20} />
                      </span>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </Card>
                    <Card className={styles.flipCardBack}>
                      <h3>{item.backTitle}</h3>
                      <p>{item.backText}</p>
                    </Card>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
