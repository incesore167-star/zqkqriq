'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import {
  FREE_SHIPPING_THRESHOLD,
  formatPrice,
  getProduct,
  productImage,
} from '@/lib/catalog';
import { useStore } from '@/lib/store';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { cart, drawerOpen, setDrawerOpen, updateQty, removeLine, cartTotal } =
    useStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setDrawerOpen]);

  const remaining = FREE_SHIPPING_THRESHOLD - cartTotal;
  const progress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      <div
        className={`${styles.overlay} ${drawerOpen ? styles.overlayOpen : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`${styles.panel} ${drawerOpen ? styles.panelOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
      >
        <div className={styles.head}>
          <h2 className={styles.title}>Votre panier</h2>
          <button
            type="button"
            className={styles.close}
            aria-label="Fermer le panier"
            onClick={() => setDrawerOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {cart.length > 0 && (
          <div className={styles.progress}>
            {remaining > 0 ? (
              <>
                Plus que <strong>{formatPrice(remaining)}</strong> pour la
                livraison offerte !
              </>
            ) : (
              <>🎉 Livraison offerte !</>
            )}
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className={styles.items}>
          {cart.length === 0 && (
            <p className={styles.empty}>
              Votre panier est vide.
              <br />
              <Link href="/boutique">Découvrir la collection</Link>
            </p>
          )}
          {cart.map((line) => {
            const p = getProduct(line.slug);
            if (!p) return null;
            return (
              <div key={`${line.slug}-${line.size}`} className={styles.item}>
                <Image
                  src={productImage(p.slug)}
                  alt=""
                  width={72}
                  height={72}
                  className={styles.thumb}
                />
                <div>
                  <p className={styles.itemName}>{p.name}</p>
                  <p className={styles.itemMeta}>
                    Taille {line.size} · {p.colorName}
                  </p>
                  <span className={styles.qty}>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      aria-label="Diminuer la quantité"
                      onClick={() => updateQty(line.slug, line.size, line.qty - 1)}
                    >
                      −
                    </button>
                    {line.qty}
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      aria-label="Augmenter la quantité"
                      onClick={() => updateQty(line.slug, line.size, line.qty + 1)}
                    >
                      +
                    </button>
                  </span>
                </div>
                <div className={styles.itemRight}>
                  <span className={styles.itemPrice}>
                    {formatPrice(p.price * line.qty)}
                  </span>
                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() => removeLine(line.slug, line.size)}
                  >
                    Retirer
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {cart.length > 0 && (
          <div className={styles.foot}>
            <div className={styles.total}>
              <span>Sous-total TTC</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <Link
              href="/panier"
              className="btn btn--primary btn--lg"
              onClick={() => setDrawerOpen(false)}
            >
              Voir le panier &amp; commander
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
