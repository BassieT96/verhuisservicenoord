import type { ReactNode } from "react";
import styles from "@/components/ui/ui.module.css";

type CardProps = {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
};

export function Card({ children, className, tilt = false }: CardProps) {
  const tiltClass = tilt ? styles.tiltCard : "";
  return <article className={`${styles.card} ${tiltClass} ${className ?? ""}`.trim()}>{children}</article>;
}
