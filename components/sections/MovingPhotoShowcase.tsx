import Image from "next/image";
import { Card } from "@/components/ui/Card";
import layoutStyles from "@/components/layout/layout.module.css";
import styles from "@/components/sections/sections.module.css";

const photoItems = [
  {
    title: "Inpakken op locatie",
    text: "Bescherming en labeling per ruimte voor een snelle uitpakfase.",
    alt: "Verhuisdozen in een woning klaar voor transport",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Netjes overdragen",
    text: "Van oplevering tot laatste check: alles op de juiste plek.",
    alt: "Net ingerichte woonkamer na een verhuizing",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Strakke planning",
    text: "Heldere route en tijdvakken voor verhuizingen in Friesland.",
    alt: "Modern huis als bestemming voor een verhuizing",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Zorgvuldig resultaat",
    text: "Uw spullen veilig verhuisd en direct gebruiksklaar geplaatst.",
    alt: "Lichte woonruimte met verhuisdozen en meubels",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
  },
] as const;

export function MovingPhotoShowcase() {
  return (
    <section className={layoutStyles.section} aria-labelledby="moving-photos-heading">
      <div className={layoutStyles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="moving-photos-heading">Meer indrukken van onze verhuisaanpak</h2>
          <p>Van voorbereiding tot oplevering: zo ziet zorgvuldig verhuizen er in de praktijk uit.</p>
        </div>

        <div className={styles.photoGrid}>
          {photoItems.map((item) => (
            <Card key={item.title} className={styles.photoItem}>
              <div className={styles.photoImageWrap}>
                <Image
                  src={item.image}
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
