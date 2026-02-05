import { Card } from "@/components/ui/Card";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";
import { serviceAreas, siteConfig } from "@/lib/site";

export function ContactCard() {
  return (
    <section className={layoutStyles.section} aria-labelledby="contact-info">
      <div className={layoutStyles.container}>
        <Card>
          <div className={styles.sectionHeading}>
            <h2 id="contact-info">Direct contact</h2>
          </div>
          <p>{siteConfig.legalName}</p>
          <p>
            {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}
          </p>
          <p>
            Telefoon: <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
          </p>
          <p>
            E-mail: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
          <p>Werkgebied: {serviceAreas.join(", ")} en de rest van Friesland.</p>
          <p>Openingstijden: {siteConfig.openingHours}</p>
        </Card>
      </div>
    </section>
  );
}
