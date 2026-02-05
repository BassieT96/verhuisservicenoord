import { Card } from "@/components/ui/Card";
import { serviceAreas } from "@/lib/site";
import layoutStyles from "@/components/layout/layout.module.css";
import styles from "@/components/sections/sections.module.css";

type LocalProofProps = {
  title: string;
  text: string;
};

export function LocalProof({ title, text }: LocalProofProps) {
  return (
    <section className={layoutStyles.section} aria-label="Lokale zekerheid">
      <div className={layoutStyles.container}>
        <Card>
          <div className={styles.proofHeader}>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className={styles.proofGrid}>
            <div>
              <strong>Verzekerd vervoer</strong>
              <span>Uw inboedel professioneel beschermd tijdens transport.</span>
            </div>
            <div>
              <strong>Zorgvuldig ingepakt</strong>
              <span>Labeling en beschermmateriaal per ruimte en item.</span>
            </div>
            <div>
              <strong>Snel ingepland</strong>
              <span>Snelle afstemming in {serviceAreas.join(", ")}.</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
