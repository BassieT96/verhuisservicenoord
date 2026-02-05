"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonExternal, ButtonLink } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/icons";
import styles from "@/components/layout/layout.module.css";
import { siteConfig } from "@/lib/site";

const serviceMenuItems = [
  { href: "/verhuisdiensten", label: "Alle diensten" },
  { href: "/zakelijk-verhuizen", label: "Zakelijk verhuizen" },
  { href: "/seniorenverhuizing", label: "Seniorenverhuizing" },
  { href: "/spoedverhuizing", label: "Spoedverhuizing" },
] as const;

const headerNavigation = [
  { href: "/", label: "Home" },
  { href: "/werkgebied", label: "Werkgebied" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const servicePaths = ["/verhuisdiensten", "/zakelijk-verhuizen", "/seniorenverhuizing", "/spoedverhuizing"];
  const servicesActive = servicePaths.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClass = `${styles.header} ${scrolled ? styles.headerScrolled : ""}`.trim();

  return (
    <header className={headerClass}>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <Link href="/" className={styles.brand} aria-label="Ga naar homepage">
          <span className={styles.brandLine}>
            <span className={styles.brandDot} aria-hidden="true" />
            {siteConfig.name}
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Hoofdnavigatie">
          {headerNavigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={active ? styles.navActive : undefined}>
                {item.label}
              </Link>
            );
          })}

          <details className={styles.navDetails}>
            <summary className={servicesActive ? `${styles.navSummary} ${styles.navActive}` : styles.navSummary}>
              Diensten
            </summary>
            <div className={styles.navSubmenu} role="menu" aria-label="Diensten submenu">
              {serviceMenuItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} className={active ? styles.navSubmenuActive : undefined} role="menuitem">
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </details>
        </nav>

        <div className={styles.actions}>
          <ButtonExternal
            href={siteConfig.phoneHref}
            variant="secondary"
            className={`${styles.headerAction} ${styles.headerActionSecondary}`}
            dataTrackEvent="header_click"
            dataTrackLabel="bel_direct"
            dataTrackLocation="header"
          >
            <PhoneIcon width={18} height={18} />
            Bel direct
          </ButtonExternal>
          <ButtonLink
            href="/contact#offerte"
            className={`${styles.headerAction} ${styles.headerActionPrimary}`}
            dataTrackEvent="header_click"
            dataTrackLabel="offerte"
            dataTrackLocation="header"
          >
            Vrijblijvende offerte
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
