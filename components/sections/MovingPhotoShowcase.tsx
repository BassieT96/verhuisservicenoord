import Image from "next/image";
import { Card } from "@/components/ui/Card";
import layoutStyles from "@/components/layout/layout.module.css";
import styles from "@/components/sections/sections.module.css";
import type { CmsGalleryItem } from "@/sanity/lib/content";

type MovingPhotoShowcaseProps = {
  title: string;
  description: string;
  items: CmsGalleryItem[];
};

export function MovingPhotoShowcase({ title, description, items }: MovingPhotoShowcaseProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className={layoutStyles.section} aria-labelledby="moving-photos-heading">
      <div className={layoutStyles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="moving-photos-heading">{title}</h2>
          <p>{description}</p>
        </div>

        <div className={styles.photoGrid}>
          {items.map((item) => (
            <Card key={item.title} className={styles.photoItem}>
              <div className={styles.photoImageWrap}>
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  className={styles.photoImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                />
              </div>
              <div className={styles.photoOverlay}>
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
