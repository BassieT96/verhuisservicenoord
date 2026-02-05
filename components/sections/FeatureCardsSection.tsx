import type { ComponentType, SVGProps } from "react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import sectionStyles from "@/components/sections/sections.module.css";

type FeatureIcon = ComponentType<SVGProps<SVGSVGElement>>;

type FeatureItem = {
  title: string;
  text: string;
  bullets?: readonly string[];
  icon: FeatureIcon;
};

type FeatureCardsSectionProps = {
  id: string;
  title: string;
  description: string;
  items: readonly FeatureItem[];
};

export function FeatureCardsSection({ id, title, description, items }: FeatureCardsSectionProps) {
  return (
    <Container section>
      <div className={sectionStyles.sectionHeading}>
        <h2 id={id}>{title}</h2>
        <p>{description}</p>
      </div>

      <div className={sectionStyles.featureGrid} aria-labelledby={id}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className={sectionStyles.featureCardCol}>
              <Card tilt className={sectionStyles.featureCard}>
                <span className={sectionStyles.iconWrap}>
                  <Icon width={20} height={20} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {item.bullets && item.bullets.length > 0 ? (
                  <ul className={sectionStyles.miniList}>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : (
                  <span className={sectionStyles.featureSpacer} aria-hidden="true" />
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
