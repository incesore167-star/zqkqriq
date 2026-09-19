'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  discountPercent,
  formatPrice,
  productImage,
  type Product,
} from '@/lib/catalog';
import { useStore } from '@/lib/store';
import styles from './ProductCard.module.css';

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21c-4.8-3.6-9-7-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4-4.2 7.4-9 11Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useStore();
  const wished = wishlist.includes(product.slug);
  const promo = discountPercent(product);

  return (
    <article className={styles.card}>
      <div className={styles.badges}>
        {product.badge === 'nouveau' && (
          <span className="badge badge--nouveau">Nouveau</span>
        )}
        {product.badge === 'bio' && <span className="badge badge--bio">Bio</span>}
        {promo > 0 && <span className="badge badge--promo">−{promo}%</span>}
      </div>

      <button
        type="button"
        className={styles.wishlistBtn}
        aria-pressed={wished}
        aria-label={
          wished
            ? `Retirer ${product.name} des favoris`
            : `Ajouter ${product.name} aux favoris`
        }
        onClick={() => toggleWishlist(product.slug)}
      >
        <HeartIcon filled={wished} />
      </button>

      <Link
        href={`/produit/${product.slug}`}
        className={styles.imageLink}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={productImage(product.slug)}
          alt=""
          fill
          sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 280px"
          className={styles.image}
        />
      </Link>

      <div className={styles.info}>
        <h3 className={styles.name}>
          <Link href={`/produit/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className={styles.color}>{product.colorName}</p>
        <div className={styles.prices}>
          <span
            className={`${styles.price} ${promo > 0 ? styles.promoPrice : ''}`}
          >
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <s className={styles.compareAt}>
              {formatPrice(product.compareAtPrice)}
            </s>
          )}
        </div>
      </div>
    </article>
  );
}
