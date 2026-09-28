import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/product/ProductCard';
import { CATEGORIES, PRODUCTS } from '@/lib/catalog';
import styles from './page.module.css';

const TINTS = [
  'var(--accent-soft)',
  'var(--success-soft)',
  'var(--gold-soft)',
  'var(--accent-soft)',
];

function TrustIcon({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TRUST = [
  {
    title: 'Livraison offerte',
    text: 'dès 60 € en France métropolitaine',
    d: 'M3 7h11v8H3zM14 10h4l3 3v2h-7zM7 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  },
  {
    title: 'Retour gratuit',
    text: '30 jours pour changer d’avis',
    d: 'M4 9l4-4M4 9l4 4M4 9h11a5 5 0 0 1 0 10h-3',
  },
  {
    title: 'Service client',
    text: 'Disponible 24h/24, 7j/7',
    d: 'M4 13a8 8 0 0 1 16 0M3 15a2 2 0 0 1 2-2h1v5H5a2 2 0 0 1-2-2v-1Zm18 0a2 2 0 0 0-2-2h-1v5h1a2 2 0 0 0 2-2v-1Z',
  },
  {
    title: 'Service client ',
    text: 'Disponible 24h/24, 7j/7',
    d: 'M4 13a8 8 0 0 1 16 0M3 15a2 2 0 0 1 2-2h1v5H5a2 2 0 0 1-2-2v-1Zm18 0a2 2 0 0 0-2-2h-1v5h1a2 2 0 0 0 2-2v-1Z',
  },
];

export default function Home() {
  // Les produits photographiés d'abord — pas de mélange photo / placeholder
  const withPhoto = PRODUCTS.filter((p) => p.photo);
  const nouveautes = withPhoto
    .filter((p) => p.isNew)
    .concat(withPhoto.filter((p) => !p.isNew))
    .slice(0, 8);
  const bestSellers = withPhoto
    .filter((p) => p.featured)
    .concat(withPhoto.filter((p) => !p.featured))
    .slice(0, 4);

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroLayout}`}>
          <div className={styles.heroInner}>
            <p className={styles.heroKicker}>Maison française · 0–14 ans</p>
            <h1 className={styles.heroTitle}>
              Petits moments.<br />
              <em>Grande allure.</em>
            </h1>
            <p className={styles.heroText}>
              Des pièces douces et pleines de caractère,
              pour les accompagner de leurs premiers pas à leurs grandes aventures.
            </p>
            <div className={styles.heroActions}>
              <Link href="/boutique" className="btn btn--primary btn--lg">
                Explorer la collection <span aria-hidden="true">↗</span>
              </Link>
              <Link
                href="/boutique?tri=nouveaute"
                className="btn btn--outline btn--lg"
              >
                Nouveautés
              </Link>
            </div>
          </div>
          <Link href="/produit/doudoune-color-block-ours" className={styles.heroVisual} aria-label="Découvrir la doudoune Color Block Ours">
            <Image src="/images/products/doudoune-color-block-ours.webp" alt="Doudoune à capuche ours, dans des tons kaki, caramel et écru" fill sizes="(max-width: 640px) 100vw, 45vw" preload className={styles.heroImage} />
            <span className={styles.heroTag}>Le goût des belles choses</span>
            <span className={styles.heroCaption}><span>La douceur a du caractère.<small>Découvrir la doudoune Ours</small></span><span aria-hidden="true">↗</span></span>
          </Link>
        </div>
      </section>

      <div className={styles.quickTrust}>
        <span>0–14 ans, à leurs côtés</span><span>Retours gratuits · 30 jours</span>
      </div>

      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHead}>
          <div>
            <p className="section-eyebrow">Par âge</p>
            <h2 className="section-title">Nos univers</h2>
          </div>
        </div>
        <div className={styles.catGrid}>
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.slug}
              href={`/boutique?cat=${c.slug}`}
              className={styles.catCard}
              style={{ ['--tint' as string]: TINTS[i] }}
            >
              <p className={styles.catAge}>{c.ageRange}</p>
              <p className={styles.catName}>{c.name}</p>
              <p className={styles.catDesc}>{c.description}</p>
              <span className={styles.catArrow} aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHead}>
          <div>
            <p className="section-eyebrow">Fraîchement arrivé</p>
            <h2 className="section-title">Nouveautés</h2>
          </div>
          <Link href="/boutique?tri=nouveaute" className={styles.seeAll}>
            Tout voir →
          </Link>
        </div>
        <div className={styles.carousel}>
          {nouveautes.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHead}>
          <div>
            <p className="section-eyebrow">Les plus aimés</p>
            <h2 className="section-title">Best-sellers</h2>
          </div>
          <Link href="/boutique" className={styles.seeAll}>
            Tout voir →
          </Link>
        </div>
        <div className={styles.grid}>
          {bestSellers.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className={styles.trust}>
        <div className={`container ${styles.trustGrid}`}>
          {TRUST.map((t) => (
            <div key={t.title} className={styles.trustItem}>
              <span className={styles.trustIcon}>
                <TrustIcon d={t.d} />
              </span>
              <div>
                <p className={styles.trustTitle}>{t.title}</p>
                <p className={styles.trustText}>{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.story}>
          <div className={styles.storyVisual}>
            <p className={styles.storyQuote}>
              Des vêtements qu&apos;on se passe de grand frère en petite sœur
            </p>
          </div>
          <div className={styles.storyText}>
            <p className="section-eyebrow">Notre histoire</p>
            <h2 className="section-title">
              Faits pour durer, dessinés pour être <em>aimés</em>
            </h2>
            <p>
              Les Ptits Bens est née d&apos;une conviction simple : les
              vêtements d&apos;enfants doivent survivre aux enfants. Genoux
              renforcés, coutures doublées, boutons cousus main — et des
              matières choisies pour leur douceur autant que leur tenue.
            </p>
            <p>
              Chaque collection est dessinée en France, en petites séries, dans
              des couleurs qui ne se démodent pas. Parce que le plus beau
              compliment qu&apos;on puisse recevoir, c&apos;est un vêtement
              transmis au petit frère.
            </p>
            <p className={styles.storySignature}>— La maison Les Ptits Bens</p>
          </div>
        </div>
      </section>
    </>
  );
}
