"use client";

import { useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { ButtonNative } from "@/components/ui/Button";
import { ReviewItem } from "@/lib/site";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";

const reviewItems: ReviewItem[] = [
  {
    quote:
      "Alles liep strak volgens planning. In Leeuwarden was de toegang lastig, maar het team loste dat rustig op.",
    author: "Familie de Boer",
    location: "Leeuwarden",
  },
  {
    quote:
      "Onze kantoorverhuizing in Drachten was in één weekend afgerond. Maandag konden we direct door.",
    author: "OfficeHub Friesland",
    location: "Drachten",
  },
  {
    quote:
      "Bij de seniorenverhuizing van mijn moeder namen ze echt de tijd. Dat gaf veel vertrouwen.",
    author: "Anita Visser",
    location: "Heerenveen",
  },
  {
    quote:
      "Spoedverhuizing in Sneek binnen korte tijd geregeld. Heldere communicatie en nette afwerking.",
    author: "J. Hoekstra",
    location: "Sneek",
  },
];

export function Reviews() {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);

  const max = reviewItems.length;
  const translate = useMemo(() => `translateX(-${index * 100}%)`, [index]);
  const activeReview = reviewItems[index];

  const next = () => setIndex((prev) => (prev + 1) % max);
  const prev = () => setIndex((prev) => (prev - 1 + max) % max);

  return (
    <section className={layoutStyles.section} aria-labelledby="reviews">
      <div className={layoutStyles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="reviews">Reviews van klanten in Friesland</h2>
          <p>Ervaringen uit Leeuwarden, Drachten, Sneek, Heerenveen en Harlingen.</p>
        </div>

        <div className={styles.reviewWrap}>
          <div className={styles.reviewHeaderBar}>
            <div>
              <strong>Gemiddeld beoordeeld met 9.4</strong>
              <span>Gebaseerd op recente verhuizingen in Friesland</span>
            </div>
            <span className={styles.reviewRating} aria-label="Vijf hartjes beoordeling">
              ♡♡♡♡♡
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
              {reviewItems.map((review) => (
                <div key={`${review.author}-${review.location}`} className={styles.reviewSlide}>
                  <Card>
                    <p className={styles.reviewQuote}>“{review.quote}”</p>
                    <p className={styles.reviewMeta}>
                      {review.author} · {review.location}
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
              {reviewItems.map((review, dotIndex) => (
                <span
                  key={`${review.author}-${review.location}-dot`}
                  className={`${styles.reviewDot} ${dotIndex === index ? styles.reviewDotActive : ""}`.trim()}
                />
              ))}
            </div>
          </div>

          <div className={styles.reviewFooter}>
            <span>
              Nu zichtbaar: <strong>{activeReview.author}</strong> uit {activeReview.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
