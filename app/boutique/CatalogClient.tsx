'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import ProductCard from '@/components/product/ProductCard';
import {
  CATEGORIES,
  PRODUCTS,
  getCategory,
  type CategorySlug,
} from '@/lib/catalog';
import styles from './boutique.module.css';

const PRICE_RANGES = [
  { id: '0-25', label: 'Moins de 25 €', min: 0, max: 25 },
  { id: '25-45', label: '25 € à 45 €', min: 25, max: 45 },
  { id: '45+', label: 'Plus de 45 €', min: 45, max: Infinity },
];

const SORTS = [
  { id: 'pertinence', label: 'Pertinence' },
  { id: 'nouveaute', label: 'Nouveautés' },
  { id: 'prix-asc', label: 'Prix croissant' },
  { id: 'prix-desc', label: 'Prix décroissant' },
];

export default function CatalogClient() {
  const router = useRouter();
  const params = useSearchParams();
  const cat = params.get('cat') as CategorySlug | null;
  const tri = params.get('tri') ?? 'pertinence';
  const [prices, setPrices] = useState<string[]>([]);
  const [promoOnly, setPromoOnly] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`/boutique?${next.toString()}`, { scroll: false });
  };

  const products = useMemo(() => {
    let list = PRODUCTS.filter((p) => !cat || p.category === cat);
    if (prices.length > 0) {
      list = list.filter((p) =>
        prices.some((id) => {
          const r = PRICE_RANGES.find((x) => x.id === id)!;
          return p.price >= r.min && p.price < r.max;
        }),
      );
    }
    if (promoOnly) list = list.filter((p) => p.compareAtPrice);
    switch (tri) {
      case 'prix-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'prix-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'nouveaute':
        list = [...list].sort(
          (a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false),
        );
        break;
    }
    return list;
  }, [cat, prices, promoOnly, tri]);

  const category = cat ? getCategory(cat) : null;
  const title = category ? category.name : 'Toute la collection';

  const filtersBody = (
    <>
      <fieldset className={styles.filterGroup}>
        <legend>Univers</legend>
        <label className={styles.filterOption}>
          <input
            type="radio"
            name="cat"
            checked={!cat}
            onChange={() => setParam('cat', null)}
          />
          Tout
        </label>
        {CATEGORIES.map((c) => (
          <label key={c.slug} className={styles.filterOption}>
            <input
              type="radio"
              name="cat"
              checked={cat === c.slug}
              onChange={() => setParam('cat', c.slug)}
            />
            {c.name} <span style={{ opacity: 0.6 }}>({c.ageRange})</span>
          </label>
        ))}
      </fieldset>

      <fieldset className={styles.filterGroup}>
        <legend>Prix</legend>
        {PRICE_RANGES.map((r) => (
          <label key={r.id} className={styles.filterOption}>
            <input
              type="checkbox"
              checked={prices.includes(r.id)}
              onChange={() =>
                setPrices((prev) =>
                  prev.includes(r.id)
                    ? prev.filter((x) => x !== r.id)
                    : [...prev, r.id],
                )
              }
            />
            {r.label}
          </label>
        ))}
      </fieldset>

      <fieldset className={styles.filterGroup}>
        <legend>Offres</legend>
        <label className={styles.filterOption}>
          <input
            type="checkbox"
            checked={promoOnly}
            onChange={() => setPromoOnly((v) => !v)}
          />
          En promotion
        </label>
      </fieldset>

      {(cat || prices.length > 0 || promoOnly) && (
        <button
          type="button"
          className={styles.clear}
          onClick={() => {
            setPrices([]);
            setPromoOnly(false);
            router.replace('/boutique', { scroll: false });
          }}
        >
          Réinitialiser les filtres
        </button>
      )}
    </>
  );

  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link> › <Link href="/boutique">Boutique</Link>
        {category && <> › {category.name}</>}
      </nav>

      <div className={styles.head}>
        <div>
          <h1 className="section-title">{title}</h1>
          <p className={styles.count}>
            {products.length} article{products.length > 1 ? 's' : ''}
            {category && ` · ${category.ageRange}`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button
            type="button"
            className={`btn btn--outline btn--sm ${styles.filterToggle}`}
            onClick={() => setMobileOpen(true)}
          >
            Filtres
          </button>
          <label>
            <span className="visually-hidden">Trier par</span>
            <select
              className={styles.sort}
              value={tri}
              onChange={(e) => setParam('tri', e.target.value)}
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className={styles.layout}>
        {mobileOpen && (
          <div
            className={styles.filtersOverlay}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
        <aside
          className={`${styles.filters} ${mobileOpen ? styles.filtersOpen : ''}`}
          aria-label="Filtres"
        >
          {filtersBody}
          <button
            type="button"
            className={`btn btn--primary ${styles.applyBtn} ${styles.filterToggle}`}
            onClick={() => setMobileOpen(false)}
          >
            Voir {products.length} résultat{products.length > 1 ? 's' : ''}
          </button>
        </aside>

        <div className={styles.grid}>
          {products.length === 0 && (
            <p className={styles.empty}>
              Aucun article ne correspond à ces filtres.
            </p>
          )}
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
