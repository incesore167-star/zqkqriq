import styles from './page.module.css';

const palette = [
  { name: 'Marine', token: '--marine', hex: '#2E3B4E' },
  { name: 'Pivoine', token: '--pivoine', hex: '#C4827B' },
  { name: 'Sauge', token: '--sauge', hex: '#94A68C' },
  { name: 'Sable', token: '--sable', hex: '#F2F0EC' },
  { name: 'Ardoise', token: '--ardoise', hex: '#54504C' },
  { name: 'Doré', token: '--dore', hex: '#B8976A' },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <p className={styles.eyebrow}>Les Ptits Bens</p>
      <h1 className={styles.title}>Fondations en place</h1>
      <p className={styles.subtitle}>
        Session 1 — design tokens, typographie et thème sombre sont branchés.
        Cette page de démonstration sera remplacée par la vraie page
        d&apos;accueil en Session 4.
      </p>

      <h2 className={styles.sectionTitle}>Palette</h2>
      <div className={styles.swatches}>
        {palette.map((c) => (
          <div key={c.name} className={styles.swatch}>
            <div
              className={styles.swatchColor}
              style={{ background: `var(${c.token})` }}
            />
            <div className={styles.swatchInfo}>
              <div className={styles.swatchName}>{c.name}</div>
              <div className={styles.swatchHex}>{c.hex}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className={styles.sectionTitle}>Typographie</h2>
      <div className={styles.typeSample}>
        <p className={styles.display}>L&apos;Élégance à la Française</p>
        <p className={styles.body}>
          Cormorant Garamond pour les titres, Outfit pour le corps de texte.
          Des vêtements pensés pour les 0–14 ans : douceur des matières,
          justesse des coupes, couleurs qui traversent les saisons.
        </p>
      </div>
    </main>
  );
}
