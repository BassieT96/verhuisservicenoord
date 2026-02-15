import Image from "next/image";
import { Card } from "@/components/ui/Card";
import layoutStyles from "@/components/layout/layout.module.css";
import styles from "@/components/sections/sections.module.css";
import type { CmsGalleryItem } from "@/sanity/lib/content";

type MovingGalleryProps = {
  title: string;
  description: string;
  items: CmsGalleryItem[];
};

export function MovingGallery({ title, description, items }: MovingGalleryProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className={layoutStyles.section} aria-labelledby="moving-gallery-heading">
      <div className={layoutStyles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="moving-gallery-heading">{title}</h2>
          <p>{description}</p>
        </div>

        <div className={styles.galleryGrid}>
          {items.map((item) => (
            <Card key={item.title} className={styles.galleryItem}>
              <div className={styles.galleryImageWrap}>
                <Image
                  src={item.imageUrl}
                  alt={item.alt || item.title}
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
