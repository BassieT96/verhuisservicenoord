import type { ReactNode } from "react";
import styles from "@/components/layout/layout.module.css";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  section?: boolean;
  id?: string;
};

export function Container({ children, className, section = false, id }: ContainerProps) {
  const sectionClass = section ? styles.section : "";
  return (
    <section id={id} className={`${sectionClass} ${className ?? ""}`.trim()}>
      <div className={styles.container}>{children}</div>
    </section>
  );
}
