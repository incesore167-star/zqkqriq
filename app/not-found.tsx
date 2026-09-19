import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="container"
      style={{ textAlign: 'center', padding: 'var(--space-16) var(--space-6)' }}
    >
      <p className="section-eyebrow">Erreur 404</p>
      <h1 className="section-title">Oups, cette page a filé…</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '45ch', margin: '0 auto var(--space-8)' }}>
        Comme une chaussette après la lessive, la page que vous cherchez a
        mystérieusement disparu.
      </p>
      <Link href="/" className="btn btn--primary btn--lg">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
