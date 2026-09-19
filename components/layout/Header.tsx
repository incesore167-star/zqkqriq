'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CATEGORIES } from '@/lib/catalog';
import { useStore } from '@/lib/store';
import styles from './Header.module.css';

const NAV = [
  ...CATEGORIES.map((c) => ({
    href: `/boutique?cat=${c.slug}`,
    label: c.name,
    age: c.ageRange,
  })),
  { href: '/boutique?tri=nouveaute', label: 'Nouveautés', age: '' },
];

function Icon({ name }: { name: 'heart' | 'bag' | 'menu' | 'close' | 'theme' }) {
  const paths = {
    heart:
      'M12 21c-4.8-3.6-9-7-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4-4.2 7.4-9 11Z',
    bag: 'M6 8h12l1 12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1L6 8Zm3 0V6a3 3 0 0 1 6 0v2',
    menu: 'M4 7h16M4 12h16M4 17h16',
    close: 'M6 6l12 12M18 6L6 18',
    theme: 'M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9Z',
  };
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={paths[name]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const { cartCount, setDrawerOpen } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    const root = document.documentElement;
    const dark =
      root.dataset.theme === 'dark' ||
      (!root.dataset.theme &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    const next = dark ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('lpb-theme', next);
    } catch {
      /* stockage indisponible */
    }
  };

  return (
    <>
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      <p className={styles.announce}>
        Livraison offerte dès 60 € · Retour gratuit 30 jours
      </p>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.burger}`}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" />
          </button>

          <Link href="/" className={styles.logo}>
            Les <em>Ptits</em> Bens
          </Link>

          <nav className={styles.nav} aria-label="Catégories">
            {NAV.map((item) => (
              <Link key={item.label} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="Changer de thème"
              onClick={toggleTheme}
            >
              <Icon name="theme" />
            </button>
            <Link
              href="/favoris"
              className={styles.iconBtn}
              aria-label="Mes favoris"
            >
              <Icon name="heart" />
            </Link>
            <button
              type="button"
              className={styles.iconBtn}
              aria-label={`Panier, ${cartCount} article${cartCount > 1 ? 's' : ''}`}
              onClick={() => setDrawerOpen(true)}
            >
              <Icon name="bag" />
              {cartCount > 0 && (
                <span className={styles.count} key={cartCount}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Tiroir mobile */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        <div className={styles.drawerHead}>
          <span className={styles.logo}>
            Les <em>Ptits</em> Bens
          </span>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
          >
            <Icon name="close" />
          </button>
        </div>
        {NAV.map((item) => (
          <Link key={item.label} href={item.href} className={styles.drawerLink}>
            {item.label}
            {item.age && <span className={styles.drawerAge}>{item.age}</span>}
          </Link>
        ))}
      </div>
    </>
  );
}
