"use client";

import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/components/animations/useReveal";
import styles from "@/components/animations/reveal.module.css";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  once?: boolean;
  delay?: number;
};

export function Reveal({ as: Tag = "div", children, className, once = true, delay = 0 }: RevealProps) {
  const { ref, visible } = useReveal({ once });
  const classes = [styles.reveal, visible ? styles.revealVisible : "", className ?? ""]
    .join(" ")
    .trim();

  return (
    <Tag
      ref={ref}
      className={classes}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
