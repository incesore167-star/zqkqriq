// Visuels produit SVG — édition luxe : arche architecturale, tons profonds,
// filet or champagne. Placeholders à remplacer par de vraies photos.
import { mkdirSync, writeFileSync } from 'node:fs';

const SHAPES = {
  // silhouettes, boîte 200x200, posées dans l'arche
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

const GOLD = '#B8976A';

const PALETTES = {
  pivoine: { bg: '#F5EBE6', arch: '#E7CFC9', shape: '#9E5F58' },
  sauge: { bg: '#EFF2EA', arch: '#D8E0CE', shape: '#66775E' },
  dore: { bg: '#F6EFE1', arch: '#E9DBC0', shape: '#96733F' },
  marine: { bg: '#EBEDEC', arch: '#CBD1D8', shape: '#26334A' },
  ardoise: { bg: '#EFEDE8', arch: '#D9D4CA', shape: '#48443D' },
  sable: { bg: '#F6F1E7', arch: '#E5DCC8', shape: '#A6987B' },
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

// arche : pied à y=430, sommet arrondi
const svg = (shape, pal) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">
  <rect width="400" height="500" fill="${pal.bg}"/>
  <path d="M80 430 L80 220 A120 120 0 0 1 320 220 L320 430 Z" fill="${pal.arch}"/>
  <path d="M92 430 L92 222 A108 108 0 0 1 308 222 L308 430 Z" fill="none" stroke="${GOLD}" stroke-width="1.5" opacity="0.75"/>
  <g transform="translate(100,190)">
    <path d="${SHAPES[shape]}" fill="${pal.shape}" fill-rule="evenodd"/>
  </g>
  <line x1="140" y1="458" x2="260" y2="458" stroke="${GOLD}" stroke-width="1" opacity="0.6"/>
</svg>
`;

mkdirSync('public/images/products', { recursive: true });
for (const [slug, shape, palette] of PRODUCTS) {
  writeFileSync(`public/images/products/${slug}.svg`, svg(shape, PALETTES[palette]));
}
console.log(`${PRODUCTS.length} visuels luxe générés`);
