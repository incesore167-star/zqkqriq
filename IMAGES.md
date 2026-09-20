# Les Ptits Bens — Spécification des visuels

Guide de production des images pour le site. Les dimensions ci-dessous ne sont
pas théoriques : elles ont été **mesurées dans le navigateur** sur la maquette
en fonctionnement (viewport 1440 px, conteneur plafonné à 1280 px).

> **La règle d'or :** vous n'exportez **qu'un seul fichier par photo**, à la
> taille maximale indiquée. Next.js génère automatiquement toutes les
> déclinaisons (mobile, tablette, retina) et sert le format moderne au
> navigateur. Exporter 5 tailles à la main serait du travail perdu.

---

## 1. L'essentiel en un tableau

| Visuel | Ratio | **À exporter** | Poids max | Où |
|---|---|---|---|---|
| **Photo produit** | 4:5 | **1600 × 2000 px** | 250 Ko | Cartes + fiche produit |
| **Bannière d'accueil** | 16:9 | **2400 × 1350 px** | 350 Ko | Hero (si photo ajoutée) |
| **Carte univers** | 4:5 | **1000 × 1250 px** | 180 Ko | « Nos univers » (si photo) |
| **Notre histoire** | 4:5 | **1200 × 1500 px** | 200 Ko | Section éditoriale |
| **Open Graph** | 1.91:1 | **1200 × 630 px** | 150 Ko | Partage réseaux sociaux |

**Format : WebP, qualité 80.** Un JPEG qualité 85 est accepté en repli.

---

## 2. Pourquoi ces chiffres — le calcul

Le conteneur du site est plafonné à **1280 px** (moins 64 px de marges =
**1216 px de contenu utile**). Au-delà de 1440 px d'écran, les images ne
grandissent plus. Les tailles ci-dessous sont donc les maximums réels.

### Photo produit

| Emplacement | Taille affichée | × 2 (retina) |
|---|---|---|
| Fiche produit (galerie) | 612 × 612 px | **1224 px** |
| Catalogue (grille 3 col.) | 308 × 385 px | 616 px |
| Accueil best-sellers (4 col.) | 286 × 358 px | 572 px |
| Carousel nouveautés | 280 × 350 px | 560 px |
| Page panier (vignette) | 96 × 96 px | 192 px |
| Tiroir panier (vignette) | 72 × 72 px | 144 px |

Le besoin le plus exigeant est la galerie sur **mobile** : elle occupe 100 %
de la largeur, soit ~430 px sur un grand téléphone, × 3 pour les écrans 3x =
**~1290 px**.

**D'où le 1600 px de large** : couvre tous les cas avec une marge confortable,
sans alourdir inutilement le fichier.

> ⚠️ Exporter plus grand (3000 px et plus) pour le web **ne rend pas l'image
> plus belle** — l'écran ne peut pas afficher ces pixels. Cela ne fait que
> ralentir le premier chargement et consommer le quota du serveur d'images.
> Conservez vos fichiers haute définition dans votre archive, pas dans le site.

---

## 3. Cadrage — le point le plus important

### ⚠️ Attention : deux recadrages différents cohabitent

Aujourd'hui la même photo est affichée en **4:5 dans les cartes** mais en
**1:1 (carré) dans la fiche produit**. Le navigateur recadre au centre, donc
**le haut et le bas de la photo sont coupés sur la fiche produit**.

Deux options :

**Option A — recommandée :** unifier la fiche produit en 4:5 pour que le
cadrage soit identique partout (une ligne de CSS à changer,
`app/produit/[slug]/produit.module.css`). Le vêtement, souvent vertical, y
gagne aussi en présence.

**Option B :** garder le carré, et alors **respecter impérativement la zone de
sécurité** ci-dessous.

### Zone de sécurité (si l'on garde le 1:1)

Sur une photo 4:5, le carré central conserve **les 80 % du milieu en hauteur**.
Les 10 % du haut et les 10 % du bas sont perdus sur la fiche produit.

```
┌─────────────────┐  ← 10 % : recadré sur la fiche produit
│░░░░░░░░░░░░░░░░░│     (ne rien y placer d'essentiel)
├─────────────────┤
│                 │
│   ZONE SÛRE     │  ← le vêtement tient ici, entièrement
│   le vêtement   │     visible dans TOUS les emplacements
│   en entier     │
│                 │
├─────────────────┤
│░░░░░░░░░░░░░░░░░│  ← 10 % : recadré sur la fiche produit
└─────────────────┘
```

### Règles de composition

- **Vêtement centré**, avec **8 à 10 % de marge** sur les côtés — il ne doit
  jamais toucher les bords.
- **Échelle constante** : un body et une robe doivent occuper à peu près la
  même proportion du cadre. Dans une grille de 4 produits côte à côte, une
  échelle qui saute d'une photo à l'autre ruine instantanément l'effet haut
  de gamme.
- **Même point de vue** pour toute une catégorie (tout à plat, ou tout porté —
  pas un mélange dans la même grille).

---

## 4. Lumière et fond

Le site a un **fond blanc pur** (`#FFFFFF`) avec des touches d'ivoire. Les
photos doivent s'y poser sans rupture.

| Critère | Consigne |
|---|---|
| **Fond** | Blanc `#FFFFFF` ou ivoire chaud `#F8F5EF` — **le même pour toute la boutique** |
| **Lumière** | Diffuse, naturelle. Pas de flash direct, pas d'ombre portée dure |
| **Balance des blancs** | Identique sur toute la session photo — un blanc qui vire au bleu à côté d'un blanc qui vire au jaune se voit immédiatement dans la grille |
| **Ombre** | Très légère et douce sous le vêtement, ou aucune. Jamais d'ombre noire marquée |
| **Retouche** | Nettoyer les fils et poussières. Ne pas surexposer au point de faire disparaître la texture du tissu — c'est elle qui vend le vêtement |

> 💡 **Le test décisif :** ouvrez 4 photos côte à côte à la taille réelle des
> cartes (~290 px). Si l'une ressort plus froide, plus sombre ou plus grande
> que les autres, reprenez-la. C'est cette régularité qui fait le luxe —
> bien plus que la qualité individuelle de chaque photo.

---

## 5. Poids et performance

Le plan vise un **LCP inférieur à 2,5 s**. Sur la fiche produit, l'image de la
galerie **est** l'élément LCP : c'est la plus grosse image visible d'emblée.

| Image | Budget | Note |
|---|---|---|
| Galerie fiche produit | **≤ 200 Ko** | Chargée en `priority` — la plus critique |
| Bannière hero | ≤ 350 Ko | Visible immédiatement |
| Carte produit | ≤ 250 Ko | Chargée en différé (lazy) |
| Vignettes panier | — | Générées automatiquement, rien à faire |

**Outils de compression :** [Squoosh](https://squoosh.app) (gratuit, dans le
navigateur, contrôle visuel du avant/après) ou `cwebp -q 80 photo.jpg -o
photo.webp` en ligne de commande.

> Si une photo dépasse son budget en WebP q80, c'est presque toujours qu'elle
> contient du bruit numérique (photo prise en basse lumière). Descendre la
> qualité à 70 n'est pas la solution : reprendre la photo en lumière correcte
> l'est.

---

## 6. Nommage et emplacement

Les fichiers vont dans `public/images/` et **le nom doit correspondre
exactement au `slug` du produit** défini dans [lib/catalog.ts](lib/catalog.ts).

```
public/images/
├── products/
│   ├── robe-leonie.webp          ← slug: 'robe-leonie'
│   ├── body-coton-bio.webp
│   └── pyjama-etoile.webp
├── categories/
│   ├── bebe.webp
│   └── enfant.webp
├── hero.webp
└── og-image.jpg                  ← Open Graph : JPEG, meilleure compatibilité
```

Pour une galerie à plusieurs vues (prévue dans le plan) :
`robe-leonie-1.webp`, `robe-leonie-2.webp`…

### 🔧 Une ligne de code à changer

Les visuels actuels sont des **SVG provisoires**. En passant aux vraies
photos, modifiez l'extension dans [lib/catalog.ts](lib/catalog.ts) :

```ts
// Avant (placeholders)
export const productImage = (slug: string) => `/images/products/${slug}.svg`;

// Après (vraies photos)
export const productImage = (slug: string) => `/images/products/${slug}.webp`;
```

Sans ce changement, les photos ne s'afficheront pas.

---

## 7. Textes alternatifs (`alt`)

Obligatoires pour l'accessibilité et utiles au référencement. Le modèle est
déjà en place sur la fiche produit :

> `Robe Léonie, coloris Pivoine`

| ✅ Bon | ❌ À éviter |
|---|---|
| `Salopette Marcel en double gaze, coloris Sauge` | `IMG_4821.jpg` |
| `Body Léon en coton bio, coloris Pivoine` | `photo produit` |
| `Robe Léonie portée par un enfant de 4 ans` | `robe robe enfant robe pas cher` (bourrage) |

Les images purement décoratives (fonds, ornements) prennent un `alt=""` vide —
c'est déjà le cas dans les cartes produit, où le nom du produit est déjà lu
juste en dessous.

---

## 8. Checklist avant mise en ligne

- [ ] Ratio **4:5** exact (1600 × 2000 px) pour les produits
- [ ] Format **WebP**, qualité 80
- [ ] Poids **sous le budget** du tableau §5
- [ ] Fond et balance des blancs **identiques** sur toute la série
- [ ] Vêtement **centré**, marge de 8–10 %, rien d'essentiel dans les 10 % haut/bas
- [ ] Nom de fichier = **slug exact** du produit
- [ ] Extension mise à jour dans `lib/catalog.ts` (§6)
- [ ] Texte `alt` rédigé pour chaque photo
- [ ] **Test grille** : 4 photos côte à côte, aucune ne détonne
- [ ] **Test mobile** : ouvrir le site sur un vrai téléphone, vérifier la netteté
- [ ] Lighthouse : LCP < 2,5 s sur la fiche produit

---

## 9. Si les photos viennent de Shopify

Lorsque la boutique Shopify sera connectée (Session 6 du plan), les images
seront servies par le CDN Shopify. Il faudra alors autoriser ce domaine dans
`next.config.ts` :

```ts
images: {
  remotePatterns: [{ protocol: 'https', hostname: 'cdn.shopify.com' }],
},
```

Téléversez dans Shopify des fichiers aux mêmes dimensions (1600 × 2000) : son
CDN se charge du redimensionnement, mais il ne peut pas inventer des pixels
absents d'un fichier trop petit.

---

*Les Ptits Bens — L'Élégance à la Française pour les 0–14 ans*
