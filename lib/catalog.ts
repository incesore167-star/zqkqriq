export type CategorySlug = 'bebe' | 'enfant' | 'junior' | 'accessoires';

export interface Category {
  slug: CategorySlug;
  name: string;
  ageRange: string;
  description: string;
}

export interface Product {
  slug: string;
  name: string;
  price: number; // EUR TTC
  compareAtPrice?: number;
  category: CategorySlug;
  sizes: string[];
  outOfStock?: string[]; // tailles en rupture
  badge?: 'nouveau' | 'promo' | 'bio';
  colorName: string;
  description: string;
  composition: string;
  care: string;
  featured?: boolean;
  isNew?: boolean;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'bebe',
    name: 'Bébé',
    ageRange: '0–2 ans',
    description: 'Douceur absolue pour les premiers mois.',
  },
  {
    slug: 'enfant',
    name: 'Enfant',
    ageRange: '3–7 ans',
    description: 'Des coupes libres pour courir, grimper, rêver.',
  },
  {
    slug: 'junior',
    name: 'Junior',
    ageRange: '8–14 ans',
    description: 'Le style qui grandit avec eux.',
  },
  {
    slug: 'accessoires',
    name: 'Accessoires',
    ageRange: '0–14 ans',
    description: 'Les détails qui font tout.',
  },
];

const BEBE_SIZES = ['3M', '6M', '12M', '18M', '24M'];
const ENFANT_SIZES = ['2A', '3A', '4A', '5A', '6A', '8A'];
const JUNIOR_SIZES = ['8A', '10A', '12A', '14A'];

export const PRODUCTS: Product[] = [
  {
    slug: 'body-coton-bio',
    name: 'Body Léon en coton bio',
    price: 19,
    category: 'bebe',
    sizes: BEBE_SIZES,
    badge: 'bio',
    colorName: 'Pivoine',
    description:
      "Le body de tous les jours, coupé dans un jersey de coton biologique d'une douceur rare. Boutons-pression nickel-free à l'entrejambe, encolure américaine pour un enfilage sans larmes.",
    composition: '100 % coton biologique certifié GOTS, 180 g/m².',
    care: 'Lavage 30°, séchage à plat. Pas de sèche-linge.',
    featured: true,
  },
  {
    slug: 'pyjama-etoile',
    name: 'Pyjama Étoile',
    price: 25,
    category: 'bebe',
    sizes: BEBE_SIZES,
    outOfStock: ['3M'],
    colorName: 'Doré',
    description:
      'Un dors-bien en velours léger, zip double curseur pour les changes de nuit, pieds antidérapants dès le 18M.',
    composition: '75 % coton, 25 % polyester recyclé.',
    care: 'Lavage 30°, sèche-linge doux autorisé.',
    featured: true,
  },
  {
    slug: 'salopette-marcel',
    name: 'Salopette Marcel',
    price: 38,
    category: 'bebe',
    sizes: BEBE_SIZES,
    isNew: true,
    badge: 'nouveau',
    colorName: 'Sauge',
    description:
      'La salopette en gaze de coton double épaisseur, bretelles réglables et poche kangourou. Un classique de la maison.',
    composition: '100 % coton double gaze.',
    care: 'Lavage 30°, repassage doux sur l’envers.',
    featured: true,
  },
  {
    slug: 'cardigan-augustine',
    name: 'Cardigan Augustine',
    price: 39,
    category: 'bebe',
    sizes: BEBE_SIZES,
    colorName: 'Sable',
    description:
      'Maille pointelle tricotée serrée, boutons en coco véritable. Se porte sur tout, du body à la robe de baptême.',
    composition: '60 % coton, 40 % laine mérinos.',
    care: 'Lavage main ou cycle laine 20°. Séchage à plat.',
  },
  {
    slug: 'robe-leonie',
    name: 'Robe Léonie',
    price: 45,
    compareAtPrice: 56,
    category: 'enfant',
    sizes: ENFANT_SIZES,
    badge: 'promo',
    colorName: 'Pivoine',
    description:
      'Col Claudine, smocks à la taille, jupe qui tourne. La robe des dimanches — et de tous les autres jours aussi.',
    composition: '100 % popeline de coton.',
    care: 'Lavage 30°, repassage moyen.',
    featured: true,
  },
  {
    slug: 'tshirt-marin',
    name: 'T-shirt Marin',
    price: 22,
    category: 'enfant',
    sizes: ENFANT_SIZES,
    colorName: 'Marine',
    description:
      'La marinière revisitée : jersey épais, rayures tissées (pas imprimées), épaules boutonnées jusqu’au 4A.',
    composition: '100 % coton peigné, 220 g/m².',
    care: 'Lavage 40°, tout est permis.',
    featured: true,
  },
  {
    slug: 'pantalon-gabriel',
    name: 'Pantalon Gabriel',
    price: 35,
    category: 'enfant',
    sizes: ENFANT_SIZES,
    outOfStock: ['3A', '8A'],
    colorName: 'Sauge',
    description:
      'Taille élastiquée sans bouton, genoux renforcés, coupe carotte. Conçu pour les cours de récré.',
    composition: '98 % coton, 2 % élasthanne.',
    care: 'Lavage 40°, sèche-linge autorisé.',
  },
  {
    slug: 'jean-junior-leo',
    name: 'Jean Léo',
    price: 49,
    category: 'junior',
    sizes: JUNIOR_SIZES,
    colorName: 'Marine',
    description:
      'Denim brut lavé une fois, coupe droite légèrement fuselée, taille ajustable à boutonnière intérieure.',
    composition: '99 % coton, 1 % élasthanne. Denim 12 oz.',
    care: 'Lavage 30° sur l’envers, peu souvent.',
    featured: true,
  },
  {
    slug: 'sweat-capuche-jules',
    name: 'Sweat à capuche Jules',
    price: 42,
    category: 'junior',
    sizes: JUNIOR_SIZES,
    colorName: 'Ardoise',
    description:
      'Molleton gratté 380 g, capuche doublée, poche kangourou. Le sweat qu’ils ne quitteront plus.',
    composition: '80 % coton, 20 % polyester recyclé.',
    care: 'Lavage 30°, séchage sur cintre.',
  },
  {
    slug: 'robe-fete-colette',
    name: 'Robe de fête Colette',
    price: 65,
    category: 'junior',
    sizes: JUNIOR_SIZES,
    isNew: true,
    badge: 'nouveau',
    colorName: 'Doré',
    description:
      'Crêpe fluide, manches ballon, ceinture à nouer. Pour les grandes occasions — mariages, anniversaires, premiers concerts.',
    composition: '100 % viscose ECOVERO.',
    care: 'Lavage main ou pressing.',
    featured: true,
  },
  {
    slug: 'bonnet-pompon',
    name: 'Bonnet Pompon',
    price: 15,
    category: 'accessoires',
    sizes: ['0–2 ans', '3–7 ans', '8–14 ans'],
    colorName: 'Sauge',
    description:
      'Côtes 2x2 bien serrées, doublure polaire sur le bandeau, pompon en fausse fourrure amovible.',
    composition: '50 % laine, 50 % acrylique.',
    care: 'Lavage main, séchage à plat.',
  },
  {
    slug: 'echarpe-douceur',
    name: 'Écharpe Douceur',
    price: 18,
    category: 'accessoires',
    sizes: ['Taille unique'],
    isNew: true,
    colorName: 'Pivoine',
    description:
      'Un tube de maille brossée, sans bouts qui traînent ni nœuds à faire. Se glisse sous le manteau en deux secondes.',
    composition: '70 % coton, 30 % laine.',
    care: 'Lavage main ou cycle laine.',
  },
];

export const getProduct = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const getCategory = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);

export const productImage = (slug: string) => `/images/products/${slug}.svg`;

export const discountPercent = (p: Product) =>
  p.compareAtPrice
    ? Math.round((1 - p.price / p.compareAtPrice) * 100)
    : 0;

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
  }).format(n);

export const FREE_SHIPPING_THRESHOLD = 60;
