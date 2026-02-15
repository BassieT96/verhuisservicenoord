import Link from "next/link";
import styles from "@/components/layout/layout.module.css";
type FooterProps = {
  companyName: string;
  description: string;
  address: string;
  phoneHref: string;
  phoneDisplay: string;
  email: string;
  serviceAreas: string[];
};

export function Footer({ companyName, description, address, phoneHref, phoneDisplay, email, serviceAreas }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <section>
            <h2>{companyName}</h2>
            <p>{description}</p>
            <address className={styles.address}>
              <p>{companyName}</p>
              <p>{address}</p>
              <p>
                <a href={phoneHref}>{phoneDisplay}</a>
              </p>
              <p>
                <a href={`mailto:${email}`}>{email}</a>
              </p>
            </address>
          </section>

          <section>
            <h2>Snel naar</h2>
            <ul>
              <li>
                <Link href="/verhuisdiensten">Verhuisdiensten</Link>
              </li>
              <li>
                <Link href="/zakelijk-verhuizen">Zakelijk verhuizen</Link>
              </li>
              <li>
                <Link href="/seniorenverhuizing">Seniorenverhuizing</Link>
              </li>
              <li>
                <Link href="/spoedverhuizing">Spoedverhuizing</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </section>

          <section>
            <h2>Werkgebied Friesland</h2>
            <ul>
              {serviceAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} {companyName}. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
