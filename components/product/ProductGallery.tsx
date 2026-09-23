'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import styles from './ProductGallery.module.css';

export interface GalleryImage {
  src: string;
  label: string;
}

interface CarouselItem {
  img: GalleryImage;
  isColor: boolean;
}

interface Props {
  name: string;
  colorName: string;
  mainSrc: string;
  views: GalleryImage[];
  variants: GalleryImage[];
}

export default function ProductGallery({
  name,
  colorName,
  mainSrc,
  views,
  variants,
}: Props) {
  const colors: GalleryImage[] = [
    { src: mainSrc, label: colorName },
    ...variants,
  ];
  const items: CarouselItem[] = [
    ...colors.map((img) => ({ img, isColor: true })),
    ...views.map((img) => ({ img, isColor: false })),
  ];

  const [current, setCurrent] = useState<GalleryImage>(colors[0]);
  const [color, setColor] = useState(colorName);
  const viewportRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const currentIndex = items.findIndex((item) => item.img.src === current.src);

  const select = (item: CarouselItem) => {
    setCurrent(item.img);
    if (item.isColor) setColor(item.img.label);
  };

  const slide = (dir: 1 | -1) => {
    const vp = viewportRef.current;
    if (vp) vp.scrollBy({ left: dir * vp.clientWidth, behavior: 'smooth' });
  };

  const changeImage = (direction: number) => {
    const next = (currentIndex + direction + items.length) % items.length;
    select(items[next]);
  };

  return (
    <div>
      <div className={styles.main}
        onTouchStart={(event) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
        onTouchCancel={() => { touchStart.current = null; }}
        onTouchEnd={(event) => {
          if (!touchStart.current) return;
          const dx = event.changedTouches[0].clientX - touchStart.current.x;
          const dy = event.changedTouches[0].clientY - touchStart.current.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) changeImage(dx < 0 ? 1 : -1);
          touchStart.current = null;
        }}
      >
        <Image
          key={current.src}
          src={current.src}
          alt={`${name}, ${current.label}`}
          width={1600}
          height={2000}
          priority
          sizes="(max-width: 900px) 100vw, 50vw"
          className={styles.mainImg}
        />
        {items.length > 1 && <div className={styles.imageControls}>
          <button type="button" aria-label="Photo précédente" onClick={() => changeImage(-1)}>‹</button>
          <span role="status" aria-label={`Photo ${currentIndex + 1} sur ${items.length}`}>{currentIndex + 1} / {items.length}</span>
          <button type="button" aria-label="Photo suivante" onClick={() => changeImage(1)}>›</button>
        </div>}
      </div>

      {items.length > 1 && (
        <>
          {variants.length > 0 && (
            <p className={styles.label}>
              Coloris : <strong>{color}</strong>
            </p>
          )}
          <div className={styles.carousel}>
            <button
              type="button"
              aria-label="Images précédentes"
              className={styles.nav}
              onClick={() => slide(-1)}
            >
              ‹
            </button>
            <div className={styles.viewport} ref={viewportRef}>
              {items.map((it) => (
                <button
                  key={it.img.src}
                  type="button"
                  title={it.img.label}
                  aria-pressed={current.src === it.img.src}
                  className={styles.card}
                  onClick={() => select(it)}
                >
                  <span
                    className={`${styles.cardImgWrap} ${
                      current.src === it.img.src ? styles.cardActive : ''
                    }`}
                  >
                    <Image
                      src={it.img.src}
                      alt={`${name} — ${it.img.label}`}
                      width={320}
                      height={400}
                      sizes="160px"
                      className={styles.cardImg}
                    />
                  </span>
                  <span className={styles.cardLabel}>{it.img.label}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="Images suivantes"
              className={styles.nav}
              onClick={() => slide(1)}
            >
              ›
            </button>
          </div>
        </>
      )}
    </div>
  );
}
