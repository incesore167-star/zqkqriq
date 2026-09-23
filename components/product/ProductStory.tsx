'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './ProductStory.module.css';

export interface StoryItem {
  src: string;
  eyebrow: string;
  title: string;
  text: string;
}

interface Props {
  name: string;
  items: StoryItem[];
}

export default function ProductStory({ name, items }: Props) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const rows = root.querySelectorAll(`.${styles.row}`);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.rowVisible);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <section ref={rootRef} className={styles.story} aria-label="Le produit en détail">
      <div className={styles.head}>
        <p className="section-eyebrow">Dans le détail</p>
        <h2 className="section-title">Regardez de plus près</h2>
      </div>
      {items.map((it, i) => (
        <div
          key={it.src}
          className={`${styles.row} ${i % 2 === 1 ? styles.rowReverse : ''}`}
        >
          <div className={styles.imageWrap}>
            <Image
              src={it.src}
              alt={`${name} — ${it.title}`}
              width={1600}
              height={2000}
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.image}
            />
          </div>
          <div className={styles.text}>
            <p className={styles.eyebrow}>{it.eyebrow}</p>
            <h3 className={styles.title}>{it.title}</h3>
            <p className={styles.copy}>{it.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
