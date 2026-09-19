import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';
import {
  PRODUCTS,
  discountPercent,
  formatPrice,
  getCategory,
  getProduct,
  productImage,
} from '@/lib/catalog';
import ProductActions, { ProductTabs } from './ProductActions';
import styles from './produit.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description.slice(0, 155),
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category)!;
  const promo = discountPercent(product);
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  ).slice(0, 4);

  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link> ›{' '}
        <Link href={`/boutique?cat=${category.slug}`}>{category.name}</Link> ›{' '}
        {product.name}
      </nav>

      <div className={styles.layout}>
        <div className={styles.gallery}>
          <Image
            src={productImage(product.slug)}
            alt={`${product.name}, coloris ${product.colorName}`}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.galleryImg}
          />
        </div>

        <div>
          <div className={styles.badges}>
            {product.badge === 'nouveau' && (
              <span className="badge badge--nouveau">Nouveau</span>
            )}
            {product.badge === 'bio' && (
              <span className="badge badge--bio">Coton bio</span>
            )}
            {promo > 0 && <span className="badge badge--promo">−{promo}%</span>}
          </div>

          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.color}>
            Coloris {product.colorName} · {category.name} {category.ageRange}
          </p>

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

          <ProductActions product={product} />

          <div className={styles.reassure}>
            <span>🚚 Livraison offerte dès 60 € — expédition sous 48 h</span>
            <span>↩️ Retour gratuit pendant 30 jours</span>
            <span>🇫🇷 Dessiné en France, coupé pour durer</span>
          </div>

          <ProductTabs product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <section className={styles.related}>
          <p className="section-eyebrow">Dans le même univers</p>
          <h2 className="section-title">Vous aimerez aussi</h2>
          <div className={styles.relatedGrid}>
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
