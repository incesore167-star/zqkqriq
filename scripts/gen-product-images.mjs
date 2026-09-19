// Génère des visuels produit SVG minimalistes (placeholders élégants)
// à remplacer par de vraies photos avant le lancement.
import { mkdirSync, writeFileSync } from 'node:fs';

const SHAPES = {
  // silhouettes simples, viewBox 0 0 200 200
  onesie:
    'M62 46 L86 30 Q100 42 114 30 L138 46 L160 80 L138 98 L133 84 L133 128 Q121 150 108 150 L108 138 L92 138 L92 150 Q79 150 67 128 L67 84 L62 98 L40 80 Z',
  tshirt:
    'M60 50 L86 34 Q100 46 114 34 L140 50 L164 84 L140 104 L135 88 L135 164 L65 164 L65 88 L60 104 L36 84 Z',
  dress:
    'M84 34 Q100 46 116 34 L132 56 L121 86 L148 158 Q100 176 52 158 L79 86 L68 56 Z',
  pants:
    'M68 38 L132 38 L142 162 L110 162 L100 92 L90 162 L58 162 Z',
  hat: 'M58 112 Q58 54 100 54 Q142 54 142 112 L142 132 L58 132 Z M100 40 m-12 0 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0',
  scarf:
    'M62 60 Q100 44 138 60 L138 96 Q100 112 62 96 Z M78 100 L78 156 L96 156 L96 104 Z M104 104 L104 168 L122 168 L122 100 Z',
};

const PALETTES = {
  pivoine: { bg: '#F8F0EF', blob: '#EEDCDA', shape: '#C4827B' },
  sauge: { bg: '#F2F4F1', blob: '#E1E6DF', shape: '#94A68C' },
  dore: { bg: '#F6F3ED', blob: '#EBE2D5', shape: '#B8976A' },
  marine: { bg: '#E6E7EA', blob: '#C4C8CD', shape: '#2E3B4E' },
  ardoise: { bg: '#EAEAEA', blob: '#CFCECD', shape: '#54504C' },
  sable: { bg: '#F6F4F1', blob: '#EBE2D5', shape: '#A9A8A5' },
};

const PRODUCTS = [
  ['body-coton-bio', 'onesie', 'pivoine'],
  ['pyjama-etoile', 'onesie', 'dore'],
  ['salopette-marcel', 'pants', 'sauge'],
  ['cardigan-augustine', 'tshirt', 'sable'],
  ['robe-leonie', 'dress', 'pivoine'],
  ['tshirt-marin', 'tshirt', 'marine'],
  ['pantalon-gabriel', 'pants', 'sauge'],
  ['jean-junior-leo', 'pants', 'marine'],
  ['sweat-capuche-jules', 'tshirt', 'ardoise'],
  ['robe-fete-colette', 'dress', 'dore'],
  ['bonnet-pompon', 'hat', 'sauge'],
  ['echarpe-douceur', 'scarf', 'pivoine'],
];

const svg = (shape, pal) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="${pal.bg}"/>
  <circle cx="100" cy="104" r="72" fill="${pal.blob}"/>
  <path d="${SHAPES[shape]}" fill="${pal.shape}" fill-rule="evenodd"/>
</svg>
`;

mkdirSync('public/images/products', { recursive: true });
for (const [slug, shape, palette] of PRODUCTS) {
  writeFileSync(`public/images/products/${slug}.svg`, svg(shape, PALETTES[palette]));
}
console.log(`${PRODUCTS.length} visuels générés dans public/images/products/`);
