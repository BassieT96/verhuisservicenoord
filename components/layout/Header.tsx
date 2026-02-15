"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonExternal, ButtonLink } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/icons";
import styles from "@/components/layout/layout.module.css";

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

type HeaderProps = {
  companyName: string;
  phoneHref: string;
};

export function Header({ companyName, phoneHref }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const servicePaths = ["/verhuisdiensten", "/zakelijk-verhuizen", "/seniorenverhuizing", "/spoedverhuizing"];
  const servicesActive = servicePaths.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const headerClass = `${styles.header} ${scrolled ? styles.headerScrolled : ""}`.trim();

  return (
    <header className={headerClass}>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <Link href="/" className={styles.brand} aria-label="Ga naar homepage">
          <span className={styles.brandLine}>
            <span className={styles.brandDot} aria-hidden="true" />
            {companyName}
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
            href={phoneHref}
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

        <button
          type="button"
          className={styles.menuButton}
          aria-label={menuOpen ? "Sluit menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`${styles.mobileMenuBackdrop} ${menuOpen ? styles.mobileMenuBackdropOpen : ""}`.trim()}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <div id="mobile-menu" className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`.trim()}>
        <div className={styles.mobileMenuHeader}>
          <span>Menu</span>
          <button type="button" className={styles.menuClose} onClick={() => setMenuOpen(false)}>
            Sluiten
          </button>
        </div>

        <nav className={styles.mobileMenuNav} aria-label="Mobiel menu">
          {headerNavigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? styles.mobileMenuActive : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}

          <div className={styles.mobileMenuGroup}>
            <span className={styles.mobileMenuLabel}>Diensten</span>
            {serviceMenuItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active ? styles.mobileMenuActive : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className={styles.mobileMenuActions}>
          <ButtonExternal href={phoneHref} variant="secondary" dataTrackEvent="header_click" dataTrackLabel="bel_direct" dataTrackLocation="mobile_menu">
            <PhoneIcon width={18} height={18} />
            Bel direct
          </ButtonExternal>
          <ButtonLink href="/contact#offerte" dataTrackEvent="header_click" dataTrackLabel="offerte" dataTrackLocation="mobile_menu">
            Vrijblijvende offerte
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
