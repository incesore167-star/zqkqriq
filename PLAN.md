# Les Ptits Bens — Plan de Construction par Vibe Coding

> Guide session par session pour construire la boutique e-commerce avec l'assistance IA — du premier token CSS au lancement.

**12 sessions · ~3–4 semaines · Septembre 2026**

---

## Qu'est-ce que le Vibe Coding ?

Le vibe coding, c'est construire un site en guidant une IA de développement (Claude, Cursor, Windsurf…) par des instructions précises plutôt qu'en écrivant chaque ligne de code à la main. Vous décrivez ce que vous voulez — structure, design, comportement — et l'IA génère le code. Votre rôle : diriger, valider, itérer.

> **Principe clé :** Chaque session ci-dessous est conçue comme une conversation autonome avec votre IA. Les prompts-exemples vous montrent exactement quoi demander. Vous n'avez pas besoin de savoir coder — mais vous devez savoir ce que vous voulez.

### Les règles d'or

Toujours fournir le contexte existant (fichiers, design tokens, spécifications) en début de session. Demander un seul livrable par échange — ne jamais demander « fais-moi tout le site ». Tester sur mobile avant de valider. Copier chaque fichier généré dans votre repo Git et commiter avant de passer à la suite.

---

## Vos actifs existants

Tout ce qui a déjà été produit et que vous fournirez comme contexte à l'IA dans chaque session :

| Actif | Nom | Description |
|-------|-----|-------------|
| **Identité** | Palette & Charte Visuelle | 6 couleurs principales, variantes, combinaisons validées, règles d'utilisation. Artefact publié. |
| **Composants** | Design System Front-End | 12 sections : boutons, formulaires, cartes produit, navigation, footer, hero banner… avec tokens CSS complets et thème sombre. |
| **Spécification** | Cahier des Charges PDF | 22 pages : animations, mobile-first, specs par page, 8 pages légales France, SEO & performances. |
| **Architecture** | Plan Technique Revu | Next.js App Router, TypeScript, React Server Components, Shopify Storefront API. Corrections légales appliquées. |

---

## Vue d'ensemble

| Phase | Sessions | Jours | Contenu |
|-------|----------|-------|---------|
| **Phase 1 — Fondations** | 1–3 | 1–5 | Projet Next.js, design tokens, composants de base, layout responsive |
| **Phase 2 — Pages principales** | 4–7 | 6–14 | Accueil, catalogue, fiche produit, panier — avec données Shopify |
| **Phase 3 — Commerce & légal** | 8–10 | 15–21 | Checkout, authentification, pages légales France, RGPD, cookies CNIL |
| **Phase 4 — Lancement** | 11–12 | 22–28 | SEO, performance, tests cross-browser, déploiement Vercel, go-live |

---

## Phase 1 — Fondations

### Session 1 · Initialisation du projet & Design Tokens

⏱ ~2h · 🛠 Claude / Cursor · 🔗 Aucune dépendance

On pose les rails. Le projet Next.js est créé, la typographie est branchée, et chaque couleur de la charte existe comme variable CSS utilisable partout.

- [ ] Créer le projet Next.js 14+ avec App Router et TypeScript
- [ ] Installer les dépendances : tailwind (optionnel), next-intl, next-seo
- [ ] Créer `globals.css` avec tous les design tokens (couleurs, espacements, ombres, rayons, transitions) extraits du Design System
- [ ] Configurer Google Fonts : Cormorant Garamond + Outfit via `next/font`
- [ ] Mettre en place le thème sombre avec `prefers-color-scheme` + `data-theme`
- [ ] Structurer les dossiers : `/app`, `/components`, `/lib`, `/styles`, `/public`
- [ ] Premier commit Git

**Exemple de prompt :**

```
Crée un projet Next.js 14 avec App Router et TypeScript. Configure ces design tokens
comme custom properties CSS :

Couleurs : Marine #2E3B4E, Pivoine #C4827B, Sauge #94A68C, Sable #F2F0EC,
Ardoise #54504C, Doré #B8976A — plus les variantes 100-900 de chacune.

Typographie : Cormorant Garamond (display, serif) et Outfit (body, sans-serif)
via next/font/google.

Espacement : base 4px (--space-1 à --space-16).
Ombres : 3 niveaux (sm, md, lg).
Transitions : ease cubic-bezier(0.16, 1, 0.3, 1), durées 150/250/400ms.

Ajoute le support thème sombre complet. Structure les dossiers proprement.
```

---

### Session 2 · Composants UI de base

⏱ ~3h · 🛠 Claude / Cursor · 🔗 Session 1

Construire la bibliothèque de composants réutilisables. Chaque composant respecte le Design System existant — vous le fournissez comme contexte.

- [ ] `Button` — 5 variantes (primary, secondary, outline, ghost, accent) × 3 tailles
- [ ] `Badge` et `Tag` — nouveau, promo, -20%, bio, livraison gratuite
- [ ] `Input`, `Select`, `Checkbox`, `TextArea` — avec états focus, erreur, disabled
- [ ] `ProductCard` — 3 variantes (standard, horizontal, compact) avec image, prix, badge, bouton rapide
- [ ] `CategoryCard` — image de fond, titre, compteur, overlay hover
- [ ] `TrustSignal` — icône + texte, 4 items (livraison, retour, paiement, SAV)

**Exemple de prompt :**

```
Voici mon Design System complet [coller le HTML du design system].

Crée les composants React/TypeScript suivants en respectant exactement les tokens CSS,
les espacements, les rayons et les ombres définis dans ce système :

1. Button — variantes : primary (fond Marine), secondary (fond Pivoine), outline, ghost,
   accent (fond Doré). Tailles : sm (36px), md (44px), lg (52px).
   États : hover, focus-visible, disabled, loading.

2. ProductCard — 3 variantes. Image carrée 1:1, badges positionnés en haut à gauche,
   prix barré + prix actuel, bouton d'ajout rapide.
   Animation hover : translateY(-4px) avec ombre élevée.

Tous les composants doivent être accessibles (aria-labels, focus visible, contraste AA).
```

---

### Session 3 · Layout global : Header, Footer, Navigation mobile

⏱ ~2h · 🛠 Claude / Cursor · 🔗 Session 2

Le squelette du site : la barre de navigation (desktop + hamburger mobile), le footer complet, et le layout racine qui enveloppe toutes les pages.

- [ ] `Navbar` — logo, catégories en dropdown, barre de recherche, icônes panier/compte/wishlist, bandeau promotionnel
- [ ] Navigation mobile — menu hamburger, tiroir latéral avec catégories en accordéon, sous-menus
- [ ] `Footer` — 4 colonnes (boutique, aide, légal, newsletter), réseaux sociaux, mentions légales, badges paiement
- [ ] Layout racine `app/layout.tsx` — header collant, contenu principal, footer, skip-to-content
- [ ] Responsive : tester breakpoints 0/768/1024/1440px

**Exemple de prompt :**

```
Crée le composant Navbar pour une boutique enfants française haut de gamme
"Les Ptits Bens".

Desktop : logo à gauche, liens catégories au centre (Bébé 0-2, Enfant 3-7,
Junior 8-14, Accessoires, Nouveautés), barre de recherche, icônes
wishlist/compte/panier avec compteur.

Mobile : hamburger, tiroir latéral qui couvre 85% de la largeur, catégories
en accordéon.

Bandeau supérieur : "Livraison offerte dès 60€ · Retour gratuit 30 jours"

Utilise mes design tokens. Le header reste collé au scroll avec un fond qui
se solidifie (backdrop-filter).
```

---

## Phase 2 — Pages principales

### Session 4 · Page d'Accueil

⏱ ~3h · 🛠 Claude / Cursor · 🔗 Session 3

La vitrine. Le hero, les catégories, les nouveautés, les best-sellers, la section « pourquoi nous choisir ». Tout en données statiques d'abord — la connexion Shopify viendra à la session 6.

- [ ] Hero banner — image pleine largeur, titre animé, CTA « Découvrir la Collection », overlay gradient
- [ ] Grille catégories — 5 cartes avec images (Bébé, Enfant, Junior, Accessoires, Outlet)
- [ ] Carousel « Nouveautés » — scroll horizontal, 8 ProductCards
- [ ] Section « Best-sellers » — grille 4 colonnes desktop, 2 colonnes mobile
- [ ] Bandeau de confiance — 4 TrustSignals en ligne
- [ ] Section « Notre histoire » — texte + image, ton chaleureux
- [ ] Bloc newsletter — email input + bouton, consentement RGPD

**Astuce vibe coding :**

```
À ce stade, utilisez des données mockées (faux produits, images placeholder
via picsum.photos ou images locales). L'important est que la structure et le
design soient parfaits. On branchera les vraies données Shopify à la session 6.

Pour les images, préparez un dossier /public/images/ avec vos visuels produit
ou utilisez des placeholders de bonne qualité.
```

---

### Session 5 · Catalogue & Fiche produit

⏱ ~3h · 🛠 Claude / Cursor · 🔗 Session 4

Les deux pages les plus critiques pour la conversion. La page catalogue avec filtres, et la fiche produit complète.

- [ ] Page catalogue — grille responsive, sidebar filtres (taille, âge, couleur, prix, marque), tri (prix, popularité, nouveauté), pagination
- [ ] Filtres mobile — panneau coulissant depuis le bas, bouton « X résultats » collé en bas
- [ ] Fil d'Ariane — Accueil › Catégorie › Sous-catégorie
- [ ] Fiche produit — galerie images (zoom, carousel), sélecteur taille/couleur, guide des tailles, prix, ajout panier animé, description, composition, entretien
- [ ] Section « Vous aimerez aussi » — carousel de produits similaires
- [ ] Avis clients — notes étoiles, commentaires, photos utilisateurs

**Exemple de prompt :**

```
Crée une page produit e-commerce pour vêtements enfants avec :

- Galerie : image principale + 4 thumbnails, zoom au survol, swipe mobile
- Sélecteur taille : boutons (3M, 6M, 12M, 18M, 2A, 3A...) avec indication
  "en stock" / "rupture"
- Guide des tailles : modale avec tableau (âge, taille cm, poids kg)
- Prix : barré si promo, badge "-30%", prix par unité si lot
- Bouton "Ajouter au panier" : animation micro-interaction (check + bounce)
- Onglets : Description, Composition & Entretien, Avis (12)
- Section "Complétez le look" : 3 produits associés

Mobile-first. Design tokens Les Ptits Bens. Accessible AA.
```

---

### Session 6 · Intégration Shopify Storefront API

⏱ ~3h · 🛠 Claude / Cursor · 🔗 Sessions 4–5

On remplace les données mockées par les vrais produits Shopify. GraphQL, gestion du panier côté client, et cache des requêtes.

- [ ] Configurer le client Shopify Storefront API (GraphQL) dans `/lib/shopify.ts`
- [ ] Requêtes : `getProducts`, `getProductByHandle`, `getCollections`, `getCollectionProducts`
- [ ] Implémenter le contexte panier avec `cartCreate`, `cartLinesAdd`, `cartLinesUpdate`, `cartLinesRemove`
- [ ] Cache avec Next.js : `revalidate` pour les pages catalogue, données fraîches pour le panier
- [ ] Gestion des variantes produit (taille + couleur → variant ID)
- [ ] Gestion des prix : formatage EUR, prix barré si `compareAtPrice`
- [ ] Images optimisées via `next/image` avec les URLs Shopify CDN

**Exemple de prompt :**

```
Crée un module /lib/shopify.ts qui :

1. Initialise un client GraphQL vers Shopify Storefront API (variables d'env
   SHOPIFY_STOREFRONT_ACCESS_TOKEN et SHOPIFY_STORE_DOMAIN)

2. Exporte ces fonctions async :
   - getProducts(first: 20, sortKey, filters) → produits avec variantes, images, prix
   - getProductByHandle(handle) → produit complet
   - getCollections() → liste des collections
   - createCart() / addToCart() / updateCart() / removeFromCart()

3. Types TypeScript stricts pour Product, Variant, Cart, CartLine

4. Gestion d'erreurs propre avec retry sur 429

Utilise la dernière version de l'API Storefront (2024-10 ou plus récente).
```

---

### Session 7 · Panier & Wishlist

⏱ ~2h · 🛠 Claude / Cursor · 🔗 Session 6

Le tiroir panier, la page panier complète, et la liste de souhaits persistante.

- [ ] Tiroir panier (slide-over) — items avec image miniature, quantité +/−, suppression, sous-total
- [ ] Page panier complète — tableau des produits, code promo, estimation livraison, total TTC, CTA checkout
- [ ] Wishlist — cœur toggle sur chaque ProductCard, page wishlist dédiée, persistance localStorage
- [ ] Micro-interactions : ajout au panier (badge rebondit), suppression (swipe sur mobile)
- [ ] Livraison gratuite : barre de progression « Plus que X€ pour la livraison offerte ! »

---

## Phase 3 — Commerce & Légal

### Session 8 · Checkout & Paiement

⏱ ~3h · 🛠 Claude / Cursor · 🔗 Session 7

Le tunnel d'achat. Formulaire d'adresse, choix de livraison, paiement, confirmation. Le checkout Shopify gère le paiement — vous redirigez vers leur page sécurisée.

- [ ] Page récapitulatif pré-checkout — dernière chance de modifier le panier
- [ ] Redirection vers Shopify Checkout (via `checkoutUrl` du cart)
- [ ] Page de confirmation retour — merci + récapitulatif commande + numéro de suivi
- [ ] Création de compte optionnelle post-achat — « Créez un compte pour suivre votre commande »
- [ ] Indication du droit de rétractation 14 jours (Ordonnance n° 2026-2, Décret n° 2026-3)
- [ ] Case à cocher CGV obligatoire avant validation

> **Note légale :** Pour le marché français, la case CGV doit être cochée activement par le client — pas de pré-cochage. Le bouton de commande doit afficher « Commander avec obligation de paiement » ou « Paiement » (Code de la consommation, art. L221-14).

---

### Session 9 · Pages légales France

⏱ ~2h · 🛠 Claude · 🔗 Aucune

Les 8 pages obligatoires ou fortement recommandées pour un site e-commerce français. L'IA peut générer les templates — mais faites relire par un juriste avant publication.

**Pages requises :**

- [ ] Mentions légales (LCEN)
- [ ] CGV (Conditions Générales de Vente)
- [ ] Politique de confidentialité (RGPD)
- [ ] Politique de cookies (CNIL)
- [ ] Droit de rétractation
- [ ] Politique de livraison
- [ ] Politique de retours
- [ ] Médiation consommateur

**Détails d'implémentation :**

- [ ] Bandeau cookies CNIL — consentement granulaire (analytics, marketing, fonctionnel), durée 6 mois, refus aussi simple qu'acceptation
- [ ] Mentions légales — raison sociale, SIRET/SIREN, RCS, adresse, hébergeur (Vercel), directeur de publication
- [ ] CGV — prix TTC, TVA 20%, délais de livraison, modalités de paiement, transfert de propriété
- [ ] RGPD — base légale des traitements, DPO (si applicable), droits (accès, rectification, effacement, portabilité), sous-traitants
- [ ] Rétractation — formulaire-type téléchargeable, délai 14 jours francs, remboursement sous 14 jours après retour
- [ ] Médiation — coordonnées du médiateur référencé (la plateforme ODR européenne a fermé en juillet 2025 — ne plus y renvoyer)

**Exemple de prompt :**

```
Génère les pages légales pour un site e-commerce français de vêtements enfants
"Les Ptits Bens" :

1. Mentions légales LCEN — avec champs à compléter [RAISON SOCIALE], [SIRET],
   [ADRESSE], [RCS]. Hébergeur : Vercel Inc.

2. Politique de confidentialité RGPD — conforme au RGPD et à la loi Informatique
   et Libertés. Base légale : exécution du contrat (commandes), consentement
   (newsletter, cookies marketing), intérêt légitime (analytics).
   Sous-traitants : Shopify, Vercel, [prestataire email].

3. Bandeau cookies CNIL — consentement granulaire. Pas de cookie wall.
   Refus aussi facile qu'acceptation. Conservation du choix : 6 mois.

NE PAS mentionner la plateforme ODR (fermée juillet 2025).
Rétractation selon Ordonnance n° 2026-2 et Décret n° 2026-3.
```

---

### Session 10 · Compte client & Espace personnel

⏱ ~2h · 🛠 Claude / Cursor · 🔗 Session 8

L'espace « Mon Compte » pour gérer ses commandes, adresses et préférences.

- [ ] Inscription / Connexion — email + mot de passe, connexion sociale optionnelle
- [ ] Tableau de bord — commandes récentes, statut, suivi
- [ ] Carnet d'adresses — ajout/modification/suppression, adresse par défaut
- [ ] Historique des commandes — détail, re-commander, télécharger facture
- [ ] Préférences — newsletter, notifications, suppression de compte (RGPD)
- [ ] Authentification via Shopify Customer API ou NextAuth.js

---

## Phase 4 — Lancement

### Session 11 · SEO, Performance & Accessibilité

⏱ ~2h · 🛠 Claude + Lighthouse · 🔗 Sessions 1–10

Optimisation technique pour le référencement et la performance. Objectif : score Lighthouse ≥ 90 sur les 4 axes.

- [ ] Métadonnées — title, description, og:image pour chaque page, données structurées Schema.org (Product, BreadcrumbList, Organization)
- [ ] `sitemap.xml` dynamique — toutes les pages produit, catégories, légales
- [ ] `robots.txt` — autoriser Googlebot, bloquer les pages admin/checkout
- [ ] Core Web Vitals — LCP < 2.5s, INP < 200ms (remplace FID), CLS < 0.1
- [ ] Images — format WebP/AVIF, srcset responsive, lazy loading, priorité LCP pour le hero
- [ ] Bundle — analyse avec `@next/bundle-analyzer`, code splitting, tree shaking
- [ ] Accessibilité — audit axe-core, contraste AA (utiliser pivoine-800 `#83504b` sur sable, sauge-800 `#526449`, doré-800 `#765a37`), navigation clavier complète

> **Rappel :** INP (Interaction to Next Paint) a remplacé FID comme Core Web Vital. Mesurez les interactions réelles, pas seulement le premier input. Ciblez INP < 200ms.

---

### Session 12 · Tests, Déploiement & Go-Live

⏱ ~3h · 🛠 Claude + Vercel · 🔗 Session 11

Dernière ligne droite. Tests cross-browser, déploiement sur Vercel, configuration DNS, et lancement.

- [ ] Tests manuels — parcours d'achat complet (recherche → produit → panier → checkout → confirmation) sur Chrome, Safari, Firefox, mobile iOS et Android
- [ ] Tests fonctionnels — formulaires, filtres, panier, wishlist, recherche, navigation
- [ ] Déploiement Vercel — variables d'environnement, domaine personnalisé, SSL
- [ ] Configuration DNS — A record ou CNAME vers Vercel, propagation
- [ ] Configuration email transactionnel — confirmation de commande, inscription newsletter (Brevo, Mailjet ou Resend)
- [ ] Analytics — Google Analytics 4 avec consentement CNIL, Search Console
- [ ] Monitoring — Sentry ou équivalent pour les erreurs JS
- [ ] Sauvegarde — vérifier les exports Shopify automatiques

**Checklist go-live :**

```
□ HTTPS actif sur tout le site
□ Favicon et og:image en place
□ Mentions légales accessibles depuis le footer
□ Bandeau cookies fonctionnel (test en navigation privée)
□ Formulaire de rétractation téléchargeable
□ Bouton "Commander avec obligation de paiement"
□ CGV cochables avant paiement (pas pré-cochées)
□ Page 404 personnalisée
□ Redirections des anciennes URLs si migration
□ Compte Google Search Console vérifié
□ Tests de charge basiques (10+ utilisateurs simultanés)
```

---

## Conseils pour le Vibe Coding

### Structurer chaque conversation IA

Commencez toujours par fournir le contexte : les design tokens, le fichier en cours, la spec de la page. Plus le contexte est précis, plus le code généré sera utilisable sans retouche. Un bon prompt vaut une heure de débogage.

### Travailler par couches

D'abord la structure HTML/JSX sémantique, puis le style avec vos tokens, puis le comportement (state, interactions), puis les données réelles. Ne demandez jamais tout d'un coup — chaque couche est une conversation séparée.

### Versionner constamment

Un commit par session minimum, un commit par composant idéalement. Si l'IA génère du code qui casse quelque chose, le `git diff` vous montre exactement quoi. Sans Git, le vibe coding devient du chaos coding.

### Tester sur votre téléphone

60% du trafic e-commerce français est mobile. Après chaque session, ouvrez `localhost` sur votre téléphone (même réseau Wi-Fi) et naviguez. Les problèmes de touch target, de scroll, de taille de texte se voient uniquement en main.

### Ne pas se battre avec l'IA

Si après 3 itérations un composant ne correspond toujours pas à ce que vous voulez, changez d'approche : montrez une capture d'écran de ce que vous attendez, décrivez le problème exact (« le padding droite est 16px au lieu de 24px »), ou demandez à l'IA de corriger un fichier existant plutôt que de tout régénérer.

---

*Les Ptits Bens — L'Élégance à la Française pour les 0–14 ans*
*Plan de construction · Vibe Coding · Septembre 2026*
