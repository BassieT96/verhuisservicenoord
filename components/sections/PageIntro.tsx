import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";
import { ButtonExternal, ButtonLink } from "@/components/ui/Button";
import { MessageCircleIcon, PhoneIcon } from "@/components/ui/icons";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";
import { siteConfig } from "@/lib/site";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

const introImages = [
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    alt: "Verhuisdozen in een nette woonkamer",
    label: "Zorgvuldig ingepakt",
  },
  {
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    alt: "Verhuiswagen bij een woning",
    label: "Stipt en verzekerd vervoer",
  },
  {
    src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    alt: "Nette oplevering in een nieuw huis",
    label: "Nette oplevering",
  },
] as const;

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className={layoutStyles.section}>
      <div className={layoutStyles.container}>
        <Reveal className={styles.pageIntroPanel}>
          <p className={styles.heroEyebrow}>{eyebrow}</p>
          <h1>{title}</h1>
          <p className={styles.heroSub}>{description}</p>
          <div className={styles.heroCtas}>
            <ButtonLink href="/contact#offerte">Vrijblijvende offerte</ButtonLink>
            <ButtonExternal href={siteConfig.phoneHref} variant="secondary">
              <PhoneIcon width={18} height={18} />
              Bel direct
            </ButtonExternal>
            <ButtonExternal href={siteConfig.whatsappHref} target="_blank" rel="noreferrer" variant="secondary">
              <MessageCircleIcon width={18} height={18} />
              WhatsApp
            </ButtonExternal>
          </div>

          <div className={styles.introMediaGrid}>
            {introImages.map((item) => (
              <div key={item.label} className={styles.introMediaCard}>
                <div className={styles.introMediaImageWrap}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className={styles.introMediaImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <span className={styles.introMediaCaption}>{item.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
