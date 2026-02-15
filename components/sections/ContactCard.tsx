import { Card } from "@/components/ui/Card";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";
type ContactCardProps = {
  companyName: string;
  address: string;
  phoneHref: string;
  phoneDisplay: string;
  email: string;
  serviceAreas: string[];
  openingHours: string;
};

export function ContactCard({ companyName, address, phoneHref, phoneDisplay, email, serviceAreas, openingHours }: ContactCardProps) {
  return (
    <section className={layoutStyles.section} aria-labelledby="contact-info">
      <div className={layoutStyles.container}>
        <Card>
          <div className={styles.sectionHeading}>
            <h2 id="contact-info">Direct contact</h2>
          </div>
          <p>{companyName}</p>
          <p>{address}</p>
          <p>
            Telefoon: <a href={phoneHref}>{phoneDisplay}</a>
          </p>
          <p>
            E-mail: <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p>Werkgebied: {serviceAreas.join(", ")} en de rest van Friesland.</p>
          <p>Openingstijden: {openingHours}</p>
        </Card>
      </div>
    </section>
  );
}
