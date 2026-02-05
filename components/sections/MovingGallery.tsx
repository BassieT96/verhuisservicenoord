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
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Efficient transport",
    text: "Slimme planning in heel Friesland met vaste teams.",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Nette oplevering",
    text: "Alles op de juiste plek, met een duidelijke eindcheck.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
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
