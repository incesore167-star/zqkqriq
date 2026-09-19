'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  FREE_SHIPPING_THRESHOLD,
  formatPrice,
  getProduct,
  productImage,
} from '@/lib/catalog';
import { useStore } from '@/lib/store';
import styles from './panier.module.css';

const SHIPPING = 4.9;

export default function PanierPage() {
  const { cart, updateQty, removeLine, cartTotal } = useStore();
  const [cgvAccepted, setCgvAccepted] = useState(false);
  const [cgvError, setCgvError] = useState(false);

  const freeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = freeShipping ? 0 : SHIPPING;
  const total = cartTotal + (cart.length > 0 ? shipping : 0);

  return (
    <div className={`container ${styles.page}`}>
      <h1 className="section-title">Votre panier</h1>

      {cart.length === 0 ? (
        <div className={styles.empty}>
          <p>Votre panier est vide pour le moment.</p>
          <Link href="/boutique" className="btn btn--primary btn--lg">
            Découvrir la Collection
          </Link>
        </div>
      ) : (
        <div className={styles.layout}>
          <div className={styles.lines}>
            {cart.map((line) => {
              const p = getProduct(line.slug);
              if (!p) return null;
              return (
                <div key={`${line.slug}-${line.size}`} className={styles.line}>
                  <Image
                    src={productImage(p.slug)}
                    alt=""
                    width={96}
                    height={96}
                    className={styles.thumb}
                  />
                  <div>
                    <p className={styles.lineName}>
                      <Link href={`/produit/${p.slug}`}>{p.name}</Link>
                    </p>
                    <p className={styles.lineMeta}>
                      Taille {line.size} · {p.colorName} ·{' '}
                      {formatPrice(p.price)} l&apos;unité
                    </p>
                    <span className={styles.qty}>
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        aria-label="Diminuer la quantité"
                        onClick={() =>
                          updateQty(line.slug, line.size, line.qty - 1)
                        }
                      >
                        −
                      </button>
                      {line.qty}
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        aria-label="Augmenter la quantité"
                        onClick={() =>
                          updateQty(line.slug, line.size, line.qty + 1)
                        }
                      >
                        +
                      </button>
                    </span>
                  </div>
                  <div className={styles.lineRight}>
                    <span className={styles.linePrice}>
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

          <aside className={styles.summary} aria-label="Récapitulatif">
            <h2 className={styles.summaryTitle}>Récapitulatif</h2>
            <div className={styles.row}>
              <span>Sous-total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className={styles.row}>
              <span>Livraison</span>
              {freeShipping ? (
                <span className={styles.free}>Offerte</span>
              ) : (
                <span>{formatPrice(shipping)}</span>
              )}
            </div>
            {!freeShipping && (
              <div className={styles.row}>
                <span style={{ fontSize: 'var(--text-xs)' }}>
                  Plus que {formatPrice(FREE_SHIPPING_THRESHOLD - cartTotal)}{' '}
                  pour la livraison offerte
                </span>
              </div>
            )}
            <div className={styles.totalRow}>
              <span>Total TTC</span>
              <span>{formatPrice(total)}</span>
            </div>

            <label className={styles.cgv}>
              <input
                type="checkbox"
                checked={cgvAccepted}
                onChange={(e) => {
                  setCgvAccepted(e.target.checked);
                  if (e.target.checked) setCgvError(false);
                }}
              />
              <span>
                J&apos;ai lu et j&apos;accepte les{' '}
                <Link href="/legal/cgv">conditions générales de vente</Link> et
                je reconnais mon{' '}
                <Link href="/legal/retractation">droit de rétractation</Link>{' '}
                de 14 jours.
              </span>
            </label>
            {cgvError && (
              <p
                role="alert"
                style={{
                  color: 'var(--accent-strong)',
                  fontSize: 'var(--text-xs)',
                  marginTop: 0,
                }}
              >
                Merci d&apos;accepter les CGV pour continuer.
              </p>
            )}

            <button
              type="button"
              className="btn btn--primary btn--lg"
              onClick={() => {
                if (!cgvAccepted) {
                  setCgvError(true);
                  return;
                }
                // Session 6 : redirection vers le checkout Shopify (checkoutUrl)
                alert(
                  'Démo — le paiement sera assuré par le checkout sécurisé Shopify une fois la boutique connectée (Session 6 du plan).',
                );
              }}
            >
              Commander avec obligation de paiement
            </button>
            <p className={styles.legalNote}>
              Paiement sécurisé. Prix TTC, TVA 20 % incluse.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
