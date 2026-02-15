import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";
import { ButtonExternal, ButtonLink } from "@/components/ui/Button";
import { MessageCircleIcon, PhoneIcon } from "@/components/ui/icons";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";
import type { CmsGalleryItem } from "@/sanity/lib/content";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  phoneHref: string;
  whatsappHref: string;
  images: CmsGalleryItem[];
};

export function PageIntro({ eyebrow, title, description, phoneHref, whatsappHref, images }: PageIntroProps) {
  return (
    <section className={layoutStyles.section}>
      <div className={layoutStyles.container}>
        <Reveal className={styles.pageIntroPanel}>
          <p className={styles.heroEyebrow}>{eyebrow}</p>
          <h1>{title}</h1>
          <p className={styles.heroSub}>{description}</p>
          <div className={styles.heroCtas}>
            <ButtonLink href="/contact#offerte">Vrijblijvende offerte</ButtonLink>
            <ButtonExternal href={phoneHref} variant="secondary">
              <PhoneIcon width={18} height={18} />
              Bel direct
            </ButtonExternal>
            <ButtonExternal href={whatsappHref} target="_blank" rel="noreferrer" variant="secondary">
              <MessageCircleIcon width={18} height={18} />
              WhatsApp
            </ButtonExternal>
          </div>

          <div className={styles.introMediaGrid}>
            {images.map((item) => (
              <div key={item.title} className={styles.introMediaCard}>
                <div className={styles.introMediaImageWrap}>
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    fill
                    className={styles.introMediaImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <span className={styles.introMediaCaption}>{item.title}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
