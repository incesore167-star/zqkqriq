'use client';

import { useState } from 'react';
import type { Product } from '@/lib/catalog';
import { useStore } from '@/lib/store';
import styles from './produit.module.css';

const SIZE_GUIDE = [
  { size: '3M', age: '3 mois', height: '60 cm', weight: '6 kg' },
  { size: '6M', age: '6 mois', height: '67 cm', weight: '8 kg' },
  { size: '12M', age: '12 mois', height: '74 cm', weight: '10 kg' },
  { size: '18M', age: '18 mois', height: '81 cm', weight: '11 kg' },
  { size: '24M', age: '2 ans', height: '86 cm', weight: '12 kg' },
  { size: '3A', age: '3 ans', height: '94 cm', weight: '14 kg' },
  { size: '4A', age: '4 ans', height: '102 cm', weight: '16 kg' },
  { size: '6A', age: '6 ans', height: '116 cm', weight: '20 kg' },
  { size: '8A', age: '8 ans', height: '128 cm', weight: '25 kg' },
  { size: '10A', age: '10 ans', height: '140 cm', weight: '32 kg' },
  { size: '12A', age: '12 ans', height: '152 cm', weight: '39 kg' },
  { size: '14A', age: '14 ans', height: '162 cm', weight: '47 kg' },
];

export default function ProductActions({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  );
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const wished = wishlist.includes(product.slug);

  const handleAdd = () => {
    if (!size) {
      setError('Choisissez une taille pour continuer.');
      return;
    }
    setError('');
    addToCart(product.slug, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 500);
  };

  return (
    <>
      <div className={styles.sizeHead}>
        <span className={styles.sizeLabel} id="size-label">
          Taille{size ? ` : ${size}` : ''}
        </span>
        <button
          type="button"
          className={styles.sizeGuide}
          onClick={() => setGuideOpen(true)}
        >
          Guide des tailles
        </button>
      </div>
      <div className={styles.sizes} role="group" aria-labelledby="size-label">
        {product.sizes.map((s) => {
          const out = product.outOfStock?.includes(s);
          return (
            <button
              key={s}
              type="button"
              className={`${styles.sizeBtn} ${size === s ? styles.sizeBtnActive : ''}`}
              disabled={out}
              aria-pressed={size === s}
              title={out ? 'Rupture de stock' : undefined}
              onClick={() => {
                setSize(s);
                setError('');
              }}
            >
              {s}
            </button>
          );
        })}
      </div>

      <div className={styles.addRow}>
        <button
          type="button"
          className={`btn btn--primary btn--lg ${added ? styles.added : ''}`}
          onClick={handleAdd}
        >
          {added ? '✓ Ajouté !' : 'Ajouter au panier'}
        </button>
        <button
          type="button"
          className="btn btn--outline btn--lg"
          aria-pressed={wished}
          onClick={() => toggleWishlist(product.slug)}
        >
          {wished ? '♥' : '♡'}
          <span className="visually-hidden">
            {wished ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          </span>
        </button>
      </div>
      <p className={styles.hint} role="alert">
        {error}
      </p>

      {guideOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setGuideOpen(false)}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label="Guide des tailles"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="section-title">Guide des tailles</h2>
            <table className={styles.sizeTable}>
              <thead>
                <tr>
                  <th>Taille</th>
                  <th>Âge</th>
                  <th>Stature</th>
                  <th>Poids</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.filter((r) =>
                  product.sizes.some((s) => s === r.size),
                ).map((r) => (
                  <tr key={r.size}>
                    <td>
                      <strong>{r.size}</strong>
                    </td>
                    <td>{r.age}</td>
                    <td>{r.height}</td>
                    <td>{r.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
              Entre deux tailles ? Prenez la plus grande — nos coupes sont
              ajustées.
            </p>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => setGuideOpen(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState(0);
  const tabs = [
    { label: 'Description', content: product.description },
    {
      label: 'Composition & Entretien',
      content: `${product.composition} ${product.care}`,
    },
    {
      label: 'Livraison',
      content:
        'Expédition sous 48 h ouvrées depuis notre atelier. Livraison offerte dès 60 € en France métropolitaine, retour gratuit sous 30 jours.',
    },
  ];

  return (
    <div>
      <div className={styles.tabs} role="tablist">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            role="tab"
            aria-selected={tab === i}
            className={`${styles.tab} ${tab === i ? styles.tabActive : ''}`}
            onClick={() => setTab(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className={styles.tabPanel} role="tabpanel">
        {tabs[tab].content}
      </p>
    </div>
  );
}
