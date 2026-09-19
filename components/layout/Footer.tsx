import Link from 'next/link';
import styles from './Footer.module.css';

const SHOP = [
  { href: '/boutique?cat=bebe', label: 'Bébé 0–2 ans' },
  { href: '/boutique?cat=enfant', label: 'Enfant 3–7 ans' },
  { href: '/boutique?cat=junior', label: 'Junior 8–14 ans' },
  { href: '/boutique?cat=accessoires', label: 'Accessoires' },
];

const HELP = [
  { href: '/legal/livraison', label: 'Livraison' },
  { href: '/legal/retours', label: 'Retours & échanges' },
  { href: '/legal/retractation', label: 'Droit de rétractation' },
  { href: '/legal/mediation', label: 'Médiation consommateur' },
];

const LEGAL = [
  { href: '/legal/mentions-legales', label: 'Mentions légales' },
  { href: '/legal/cgv', label: 'CGV' },
  { href: '/legal/confidentialite', label: 'Confidentialité' },
  { href: '/legal/cookies', label: 'Cookies' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <p className={styles.brand}>
              Les <em>Ptits</em> Bens
            </p>
            <p className={styles.tagline}>
              L&apos;Élégance à la Française pour les 0–14 ans. Des vêtements
              pensés pour durer, dessinés pour être aimés.
            </p>
          </div>

          <nav aria-label="Boutique">
            <h2 className={styles.colTitle}>Boutique</h2>
            <ul className={styles.links}>
              {SHOP.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Aide">
            <h2 className={styles.colTitle}>Aide</h2>
            <ul className={styles.links}>
              {HELP.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.colTitle}>Newsletter</h2>
            <p className={styles.newsText}>
              Nouveautés, ventes privées et petites histoires — une fois par
              mois, jamais plus.
            </p>
            <form
              className={styles.newsForm}
              action="#"
              aria-label="Inscription à la newsletter"
            >
              <input
                type="email"
                required
                placeholder="votre@email.fr"
                aria-label="Adresse e-mail"
                className="input"
              />
              <button type="submit" className="btn btn--primary">
                OK
              </button>
            </form>
            <p className={styles.consent}>
              En vous inscrivant, vous acceptez notre{' '}
              <Link href="/legal/confidentialite">
                politique de confidentialité
              </Link>
              . Désinscription en un clic.
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            © {new Date().getFullYear()} Les Ptits Bens — Tous droits réservés
          </span>
          <nav aria-label="Liens légaux">
            {LEGAL.map((l, i) => (
              <span key={l.href}>
                {i > 0 && ' · '}
                <Link href={l.href} style={{ color: 'inherit' }}>
                  {l.label}
                </Link>
              </span>
            ))}
          </nav>
          <span>CB · Visa · Mastercard · PayPal</span>
        </div>
      </div>
    </footer>
  );
}
