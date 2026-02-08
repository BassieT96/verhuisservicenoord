import { ButtonExternal, ButtonLink } from "@/components/ui/Button";
import { BoxIcon, FileTextIcon, MessageCircleIcon, PhoneIcon, RouteIcon, ShieldIcon, TruckIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";

type HeroProps = {
  title?: string;
  subtitle?: string;
};

export function Hero({
  title = "Verhuizen in Friesland, zonder stress.",
  subtitle = "Van Leeuwarden tot Harlingen: wij regelen uw verhuizing zorgvuldig, snel en met heldere afspraken. Zo houdt u rust op de verhuisdag.",
}: HeroProps) {
  return (
    <section className={styles.hero} aria-label="Hero Verhuisservice Noord">
      <div className={`${styles.aurora} ${styles.auroraOne}`} aria-hidden="true" />
      <div className={`${styles.aurora} ${styles.auroraTwo}`} aria-hidden="true" />

      <div className={layoutStyles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>Verhuisservice Noord · Friesland</p>
            <h1>{title}</h1>
            <p className={styles.heroSub}>{subtitle}</p>

            <div className={styles.heroCtas}>
              <ButtonLink href="/contact#offerte" dataTrackEvent="hero_click" dataTrackLabel="offerte" dataTrackLocation="hero">
                <FileTextIcon width={18} height={18} />
                Vrijblijvende offerte
              </ButtonLink>
              <ButtonExternal
                href={siteConfig.phoneHref}
                variant="secondary"
                dataTrackEvent="hero_click"
                dataTrackLabel="bel_direct"
                dataTrackLocation="hero"
              >
                <PhoneIcon width={18} height={18} />
                Bel direct
              </ButtonExternal>
              <ButtonExternal
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                className={styles.heroCtaOptional}
                dataTrackEvent="hero_click"
                dataTrackLabel="whatsapp"
                dataTrackLocation="hero"
              >
                <MessageCircleIcon width={18} height={18} />
                WhatsApp
              </ButtonExternal>
            </div>

            <div className={styles.heroTrust}>
              {siteConfig.trustPoints.map((point) => (
                <span key={point}>
                  <ShieldIcon width={16} height={16} />
                  {point}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.routeGraphic}>
              <div className={styles.routeTop}>
                <span>Ophalen</span>
                <span>Opleveren</span>
              </div>
              <div className={styles.routeBackdrop} aria-hidden="true" />
              <div className={styles.routeLine} />
              <span className={styles.routeDrop} aria-hidden="true">
                <TruckIcon width={16} height={16} />
              </span>
              <span className={`${styles.routeNode} ${styles.routeNodeStart}`}>
                <span className={`${styles.rippleRing} ${styles.rippleRingOne}`} />
                <span className={`${styles.rippleRing} ${styles.rippleRingOneAlt}`} />
              </span>
              <span className={`${styles.routeNode} ${styles.routeNodeMid}`}>
                <span className={`${styles.rippleRing} ${styles.rippleRingTwo}`} />
                <span className={`${styles.rippleRing} ${styles.rippleRingTwoAlt}`} />
              </span>
              <span className={`${styles.routeNode} ${styles.routeNodeEnd}`}>
                <span className={`${styles.rippleRing} ${styles.rippleRingThree}`} />
                <span className={`${styles.rippleRing} ${styles.rippleRingThreeAlt}`} />
              </span>
              <div className={`${styles.routeBox} ${styles.routeBoxOne}`}>
                <BoxIcon width={18} height={18} />
                Inpakken
              </div>
              <div className={`${styles.routeBox} ${styles.routeBoxTwo}`}>
                <RouteIcon width={18} height={18} />
                Opleveren
              </div>
              <div className={styles.routeStats}>
                <div>
                  <strong>15+</strong>
                  <span>Jaar ervaring</span>
                </div>
                <div>
                  <strong>9.4</strong>
                  <span>Klantscore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
