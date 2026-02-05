import { Card } from "@/components/ui/Card";
import type { FaqItem } from "@/lib/site";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";

type FaqProps = {
  title: string;
  items: FaqItem[];
};

export function Faq({ title, items }: FaqProps) {
  return (
    <section className={layoutStyles.section} aria-labelledby="faq-heading">
      <div className={layoutStyles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="faq-heading">{title}</h2>
        </div>

        <Card>
          <div className={styles.faqList}>
            {items.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
