'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Modal from './Modal';
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

function Icon({ name }: { name: 'heart' | 'bag' | 'menu' | 'close' | 'theme' | 'home' | 'shop' }) {
  const paths = {
    heart:
      'M12 21c-4.8-3.6-9-7-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4-4.2 7.4-9 11Z',
    bag: 'M6 8h12l1 12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1L6 8Zm3 0V6a3 3 0 0 1 6 0v2',
    menu: 'M4 7h16M4 12h16M4 17h16',
    close: 'M6 6l12 12M18 6L6 18',
    theme: 'M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9Z',
    home: 'M3 11l9-8 9 8M5 10v11h5v-7h4v7h5V10',
    shop: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
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
  const { cartCount, wishlist, setDrawerOpen } = useStore();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  const toggleTheme = () => {
    const root = document.documentElement;
    // Blanc par défaut ; l'encre de nuit uniquement sur choix explicite.
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
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
        Livraison offerte dès 60 € <span>· Retours gratuits 30 jours</span>
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
              className={`${styles.iconBtn} ${styles.desktopAction}`}
              aria-label="Changer de thème"
              onClick={toggleTheme}
            >
              <Icon name="theme" />
            </button>
            <Link
              href="/favoris"
              className={`${styles.iconBtn} ${styles.desktopAction}`}
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

      {!pathname.startsWith('/produit/') && (
        <nav className={styles.bottomNav} aria-label="Navigation mobile">
          <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}><Icon name="home" /><span>Accueil</span></Link>
          <Link href="/boutique" aria-current={pathname === '/boutique' ? 'page' : undefined}><Icon name="shop" /><span>Boutique</span></Link>
          <Link href="/favoris" aria-current={pathname === '/favoris' ? 'page' : undefined}><Icon name="heart" /><span>Favoris{wishlist.length > 0 ? ` (${wishlist.length})` : ''}</span></Link>
          <button type="button" onClick={() => setDrawerOpen(true)}><Icon name="bag" /><span>Panier{cartCount > 0 ? ` (${cartCount})` : ''}</span></button>
        </nav>
      )}

      <Modal
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        className={styles.drawer}
        label="Menu de navigation"
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
        <p className={styles.drawerEyebrow}>À chaque âge, son univers</p>
        <Link href="/boutique" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Toute la collection <span aria-hidden="true">↗</span></Link>
        {NAV.map((item) => (
          <Link key={item.label} href={item.href} className={styles.drawerLink} onClick={() => setMenuOpen(false)}>
            {item.label}
            {item.age && <span className={styles.drawerAge}>{item.age}</span>}
          </Link>
        ))}
        <button type="button" className={styles.themeToggle} onClick={toggleTheme}><Icon name="theme" /> Changer de thème</button>
        <p className={styles.drawerNote}>Les petites pièces des grands moments.</p>
      </Modal>
    </>
  );
}
