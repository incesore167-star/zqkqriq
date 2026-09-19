'use client';

import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import { PRODUCTS } from '@/lib/catalog';
import { useStore } from '@/lib/store';

export default function FavorisPage() {
  const { wishlist } = useStore();
  const products = PRODUCTS.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="container" style={{ paddingTop: 'var(--space-10)', minHeight: '50vh' }}>
      <p className="section-eyebrow">Votre sélection</p>
      <h1 className="section-title">Mes favoris</h1>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-15) 0', color: 'var(--text-secondary)' }}>
          <p>
            Aucun favori pour le moment. Touchez le cœur sur un article pour le
            retrouver ici.
          </p>
          <Link href="/boutique" className="btn btn--primary btn--lg">
            Parcourir la boutique
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 'var(--space-4)',
            marginTop: 'var(--space-8)',
          }}
        >
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
