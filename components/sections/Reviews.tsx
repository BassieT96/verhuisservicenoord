"use client";

import { useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { ButtonNative } from "@/components/ui/Button";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";
import type { CmsReview } from "@/sanity/lib/content";

type ReviewsProps = {
  heading: string;
  description: string;
  scoreLabel: string;
  scoreText: string;
  items: CmsReview[];
};

export function Reviews({ heading, description, scoreLabel, scoreText, items }: ReviewsProps) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);

  const max = items.length;
  const translate = useMemo(() => `translateX(-${index * 100}%)`, [index]);
  const activeReview = items[index];

  const next = () => setIndex((prev) => (prev + 1) % max);
  const prev = () => setIndex((prev) => (prev - 1 + max) % max);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className={layoutStyles.section} aria-labelledby="reviews">
      <div className={layoutStyles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="reviews">{heading}</h2>
          <p>{description}</p>
        </div>

        <div className={styles.reviewWrap}>
          <div className={styles.reviewHeaderBar}>
            <div>
              <strong>{scoreLabel}</strong>
              <span>{scoreText}</span>
            </div>
            <span className={styles.reviewRating} aria-label="Vijf sterren beoordeling">
              ☆☆☆☆☆
            </span>
          </div>

          <div
            className={styles.reviewViewport}
            onTouchStart={(event) => {
              touchStart.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              const startX = touchStart.current;
              if (startX === null) return;
              const endX = event.changedTouches[0]?.clientX ?? startX;
              const delta = endX - startX;
              if (delta < -35) next();
              if (delta > 35) prev();
              touchStart.current = null;
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") next();
              if (event.key === "ArrowLeft") prev();
            }}
            tabIndex={0}
            aria-label="Review carousel"
          >
            <div className={styles.reviewTrack} style={{ transform: translate }}>
              {items.map((review) => (
                <div key={`${review.name}-${review.location}`} className={styles.reviewSlide}>
                  <Card>
                    <p className={styles.reviewQuote}>“{review.text}”</p>
                    <p className={styles.reviewMeta}>
                      {review.name} · {review.location}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.carouselControls}>
            <ButtonNative variant="secondary" onClick={prev} ariaLabel="Vorige review">
              Vorige
            </ButtonNative>
            <ButtonNative variant="secondary" onClick={next} ariaLabel="Volgende review">
              Volgende
            </ButtonNative>
            <div className={styles.reviewDots} aria-hidden="true">
              {items.map((review, dotIndex) => (
                <span
                  key={`${review.name}-${review.location}-dot`}
                  className={`${styles.reviewDot} ${dotIndex === index ? styles.reviewDotActive : ""}`.trim()}
                />
              ))}
            </div>
          </div>

          <div className={styles.reviewFooter}>
            <span>
              Nu zichtbaar: <strong>{activeReview?.name}</strong> uit {activeReview?.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
