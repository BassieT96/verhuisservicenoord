import Link from "next/link";
import styles from "@/components/layout/layout.module.css";
import { serviceAreas, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <section>
            <h2>Verhuisservice Noord</h2>
            <p>
              Betrouwbaar verhuisbedrijf in Friesland voor particulieren, bedrijven, senioren en
              spoedverhuizingen.
            </p>
            <address className={styles.address}>
              <p>{siteConfig.legalName}</p>
              <p>{siteConfig.address.street}</p>
              <p>
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </p>
              <p>
                <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
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
          <p>© {new Date().getFullYear()} Verhuisservice Noord. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
