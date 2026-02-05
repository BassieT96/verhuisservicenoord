import Link from "next/link";
import layoutStyles from "@/components/layout/layout.module.css";
import styles from "@/components/sections/sections.module.css";

type BreadcrumbsProps = {
  current: string;
};

export function Breadcrumbs({ current }: BreadcrumbsProps) {
  return (
    <section className={styles.breadcrumbWrap} aria-label="Breadcrumb">
      <div className={layoutStyles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{current}</span>
        </nav>
      </div>
    </section>
  );
}
