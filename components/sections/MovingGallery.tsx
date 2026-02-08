import Image from "next/image";
import { Card } from "@/components/ui/Card";
import layoutStyles from "@/components/layout/layout.module.css";
import styles from "@/components/sections/sections.module.css";

type MovingGalleryProps = {
  title?: string;
  description?: string;
};

const galleryItems = [
  {
    title: "Zorgvuldig inpakken",
    text: "Professionele handling van meubels en kwetsbare spullen.",
    image:
      "/images/ChatGPT%20Image%20Feb%205,%202026%20at%2008_28_11%20PM.png",
  },
  {
    title: "Efficient transport",
    text: "Slimme planning in heel Friesland met vaste teams.",
    image:
      "/images/ChatGPT%20Image%20Feb%205,%202026%20at%2008_28_15%20PM.png",
  },
  {
    title: "Nette oplevering",
    text: "Alles op de juiste plek, met een duidelijke eindcheck.",
    image:
      "/images/ChatGPT%20Image%20Feb%205,%202026%20at%2008_28_17%20PM.png",
  },
] as const;

export function MovingGallery({
  title = "Verhuizen met een professioneel team",
  description = "Een indruk van onze werkwijze: zorgvuldig, georganiseerd en netjes afgewerkt.",
}: MovingGalleryProps) {
  return (
    <section className={layoutStyles.section} aria-labelledby="moving-gallery-heading">
      <div className={layoutStyles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="moving-gallery-heading">{title}</h2>
          <p>{description}</p>
        </div>

        <div className={styles.galleryGrid}>
          {galleryItems.map((item) => (
            <Card key={item.title} className={styles.galleryItem}>
              <div className={styles.galleryImageWrap}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={styles.galleryImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className={styles.galleryCaption}>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
