import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';
import ProductGallery from '@/components/product/ProductGallery';
import ProductStory, { type StoryItem } from '@/components/product/ProductStory';
import {
  PRODUCTS,
  discountPercent,
  formatPrice,
  getCategory,
  getProduct,
  productImage,
  productVariantImages,
  productViews,
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
    (p) => p.photo && p.category === product.category && p.slug !== product.slug,
  ).slice(0, 4);
  const views = productViews(product);
  const variantImages = productVariantImages(product);

  const story: StoryItem[] = product.photo
    ? [
        {
          suffix: 'trois-quarts',
          eyebrow: 'La coupe',
          title: 'Des proportions justes',
          text: 'Volume maîtrisé, épaules nettes, longueur étudiée : une silhouette qui reste élégante même emmitouflée en plein hiver.',
        },
        {
          suffix: 'detail-capuche',
          eyebrow: 'La capuche',
          title: 'Le détail qui fait tout',
          text: 'Bien dessinée, bien doublée : elle tient en place sans serrer, protège du vent et donne à la pièce tout son caractère.',
        },
        {
          suffix: 'detail-matiere',
          eyebrow: 'La matière',
          title: 'On la reconnaît au toucher',
          text: `${product.composition} ${product.care}`,
        },
        {
          suffix: 'dos',
          eyebrow: 'Vue de dos',
          title: 'Soignée sous tous les angles',
          text: 'Matelassage régulier, coutures alignées, finitions nettes — même là où on ne regarde pas.',
        },
        {
          suffix: 'mouvement',
          eyebrow: 'En mouvement',
          title: 'Conçue pour courir',
          text: 'Assez légère pour être oubliée, assez chaude pour rester dehors des heures : elle suit chaque saut et chaque course.',
        },
      ].map(({ suffix, ...rest }) => ({
        src: `/images/products/${product.slug}-${suffix}.webp`,
        ...rest,
      }))
    : [];

  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link> ›{' '}
        <Link href={`/boutique?cat=${category.slug}`}>{category.name}</Link> ›{' '}
        {product.name}
      </nav>

      <div className={styles.layout}>
        <ProductGallery
          name={product.name}
          colorName={product.colorName}
          mainSrc={productImage(product.slug)}
          views={views}
          variants={variantImages}
        />

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
            {variantImages.length === 0 && `Coloris ${product.colorName} · `}
            {category.name} {category.ageRange}
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

      <ProductStory name={product.name} items={story} />

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
