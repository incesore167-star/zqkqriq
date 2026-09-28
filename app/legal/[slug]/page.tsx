import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

/* Templates à faire relire par un juriste avant publication. */

interface LegalPage {
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}

const PAGES: Record<string, LegalPage> = {
  'mentions-legales': {
    title: 'Mentions légales',
    updated: '2026-09-28',
    sections: [
      {
        heading: 'Éditeur du site',
        body: [
          "Le site lesptitsbens.fr est édité par Nova Seraj LLC, société à responsabilité limitée de droit américain (Limited Liability Company), immatriculée auprès du Secrétaire d'État du Wyoming (États-Unis) le 8 janvier 2026 sous le numéro 2026-001861945, dont le siège social est situé 5830 E 2nd St, Ste 7000 #31994, Casper, WY 82609, États-Unis.",
          'Contact : contact@novaseraj.shop',
        ],
      },
      {
        heading: 'Hébergement',
        body: [
          'Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com.',
        ],
      },
      {
        heading: 'Propriété intellectuelle',
        body: [
          "L'ensemble des éléments du site (textes, visuels, logo, charte graphique) est la propriété exclusive de Nova Seraj LLC ou fait l'objet d'une autorisation d'utilisation. Toute reproduction sans accord écrit préalable est interdite.",
        ],
      },
    ],
  },
  cgv: {
    title: 'Conditions Générales de Vente',
    updated: '2026-09-28',
    sections: [
      {
        heading: 'Article 1 — Objet et champ d’application',
        body: [
          'Les présentes CGV régissent les ventes conclues entre Nova Seraj LLC (ci-après « Les Ptits Bens »), 5830 E 2nd St, Ste 7000 #31994, Casper, WY 82609, États-Unis, et tout consommateur passant commande sur lesptitsbens.fr. Toute commande implique l’acceptation préalable et sans réserve des présentes CGV, matérialisée par une case à cocher avant paiement.',
        ],
      },
      {
        heading: 'Article 2 — Prix',
        body: [
          'Les prix sont indiqués en euros, toutes taxes comprises (TVA française de 20 % incluse), hors frais de livraison. Les frais de livraison sont indiqués avant validation de la commande. Nova Seraj LLC se réserve le droit de modifier ses prix à tout moment ; les produits sont facturés au tarif en vigueur au moment de la validation de la commande.',
        ],
      },
      {
        heading: 'Article 3 — Commande et paiement',
        body: [
          'Le processus de commande comporte un récapitulatif permettant de vérifier le détail de la commande avant confirmation. Le bouton de validation porte la mention « Commander avec obligation de paiement » conformément à l’article L221-14 du Code de la consommation.',
          'Le paiement s’effectue par carte bancaire (CB, Visa, Mastercard) ou PayPal via une plateforme sécurisée. Le transfert de propriété n’intervient qu’au paiement complet du prix.',
        ],
      },
      {
        heading: 'Article 4 — Livraison',
        body: [
          'Livraison en France métropolitaine sous 2 à 4 jours ouvrés après expédition. Livraison offerte dès 60 € d’achat, sinon 4,90 €. En cas de retard de plus de 7 jours, le client peut annuler sa commande et être remboursé.',
        ],
      },
      {
        heading: 'Article 5 — Rétractation, retours et garanties',
        body: [
          'Le client dispose d’un délai de rétractation de 14 jours francs à compter de la réception (voir la page Droit de rétractation). Les produits bénéficient des garanties légales de conformité (art. L217-3 s. du Code de la consommation) et des vices cachés (art. 1641 s. du Code civil).',
        ],
      },
      {
        heading: 'Article 6 — Médiation et litiges',
        body: [
          'Conformément aux articles L611-1 s. du Code de la consommation, le client peut recourir gratuitement à un médiateur de la consommation, dans les conditions présentées sur la page Médiation consommateur. À défaut de résolution amiable, les tribunaux français sont compétents.',
        ],
      },
    ],
  },
  confidentialite: {
    title: 'Politique de confidentialité',
    updated: '2026-09-28',
    sections: [
      {
        heading: 'Responsable de traitement',
        body: [
          'Nova Seraj LLC, 5830 E 2nd St, Ste 7000 #31994, Casper, WY 82609, États-Unis, est responsable du traitement des données collectées sur ce site. Contact : contact@novaseraj.shop.',
        ],
      },
      {
        heading: 'Données collectées et finalités',
        body: [
          'Commandes (identité, adresses, historique d’achat) — base légale : exécution du contrat. Conservation : 5 ans après la dernière commande, données de facturation 10 ans (obligation comptable).',
          'Newsletter (e-mail) — base légale : consentement. Conservation : jusqu’à désinscription. Désinscription en un clic dans chaque e-mail.',
          'Mesure d’audience et cookies marketing — base légale : consentement via le bandeau cookies. Statistiques strictement nécessaires : intérêt légitime.',
        ],
      },
      {
        heading: 'Destinataires et sous-traitants',
        body: [
          'Les données sont transmises uniquement aux prestataires nécessaires : Shopify (gestion boutique et paiement), Vercel (hébergement), un prestataire d’envoi d’e-mails, transporteurs (livraison). Aucun transfert n’est réalisé à des fins commerciales tierces.',
        ],
      },
      {
        heading: 'Vos droits',
        body: [
          'Vous disposez des droits d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité (art. 15 à 22 RGPD). Exercez-les à contact@novaseraj.shop. Vous pouvez introduire une réclamation auprès de la CNIL (cnil.fr).',
        ],
      },
    ],
  },
  cookies: {
    title: 'Politique de cookies',
    updated: '2026-09-28',
    sections: [
      {
        heading: 'Qu’est-ce qu’un cookie ?',
        body: [
          'Un cookie est un petit fichier déposé sur votre appareil lors de la consultation du site. Certains sont indispensables au fonctionnement (panier, session), d’autres nécessitent votre consentement.',
        ],
      },
      {
        heading: 'Cookies utilisés',
        body: [
          'Fonctionnels (exemptés de consentement) : panier, favoris, préférence de thème. Durée : 6 mois maximum.',
          'Mesure d’audience : outils de statistiques de fréquentation — déposés uniquement après consentement.',
          'Marketing : cookies publicitaires et de réseaux sociaux — déposés uniquement après consentement.',
        ],
      },
      {
        heading: 'Gestion du consentement',
        body: [
          'Conformément aux lignes directrices de la CNIL : le refus est aussi simple que l’acceptation, aucun cookie soumis à consentement n’est déposé avant votre choix, et votre choix est conservé 6 mois. Vous pouvez le modifier à tout moment via le lien « Cookies » en pied de page.',
        ],
      },
    ],
  },
  retractation: {
    title: 'Droit de rétractation',
    updated: '2026-09-28',
    sections: [
      {
        heading: 'Délai de 14 jours',
        body: [
          'Conformément aux articles L221-18 et suivants du Code de la consommation, vous disposez de 14 jours francs à compter de la réception de votre commande pour exercer votre droit de rétractation, sans motif ni pénalité.',
        ],
      },
      {
        heading: 'Remboursement',
        body: [
          'Nous vous remboursons la totalité des sommes versées, frais de livraison standard inclus, au plus tard 14 jours après récupération des articles ou preuve d’expédition du retour, via le même moyen de paiement.',
        ],
      },
      {
        heading: 'Exceptions',
        body: [
          'Le droit de rétractation ne s’applique pas aux articles personnalisés ni aux articles descellés ne pouvant être renvoyés pour des raisons d’hygiène.',
        ],
      },
    ],
  },
  livraison: {
    title: 'Politique de livraison',
    updated: '2026-09-28',
    sections: [
      {
        heading: 'Zones et délais',
        body: [
          'France métropolitaine : livraison en 2 à 4 jours ouvrés après expédition (expédition sous 48 h ouvrées). Union européenne : 5 à 8 jours ouvrés.',
        ],
      },
      {
        heading: 'Frais',
        body: [
          'France métropolitaine : 4,90 € — offerte dès 60 € d’achat. Point relais : 3,50 €. UE : 8,90 €.',
        ],
      },
      {
        heading: 'Suivi',
        body: [
          'Un e-mail de confirmation d’expédition avec numéro de suivi vous est envoyé dès la prise en charge par le transporteur.',
        ],
      },
    ],
  },
  retours: {
    title: 'Retours & échanges',
    updated: '2026-09-28',
    sections: [
      {
        heading: '30 jours pour changer d’avis',
        body: [
          'Au-delà du délai légal de rétractation de 14 jours, Les Ptits Bens vous offre contractuellement 30 jours à compter de la réception pour retourner tout article non porté, non lavé, avec ses étiquettes.',
        ],
      },
      {
        heading: 'Procédure',
        body: [
          'Demandez votre étiquette de retour prépayée à contact@novaseraj.shop en indiquant votre numéro de commande. Le retour est gratuit en France métropolitaine.',
          'Remboursement ou échange sous 14 jours après réception de votre colis dans nos ateliers.',
        ],
      },
    ],
  },
  mediation: {
    title: 'Médiation consommateur',
    updated: '2026-09-28',
    sections: [
      {
        heading: 'Recours gratuit à un médiateur',
        body: [
          'Conformément aux articles L611-1 et suivants du Code de la consommation, tout consommateur a le droit de recourir gratuitement à un médiateur de la consommation en cas de litige non résolu par notre service client.',
        ],
      },
    ],
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) return {};
  return { title: page.title, robots: { index: false } };
}

export default async function LegalPageRoute({ params }: Props) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) notFound();

  return (
    <div
      className="container"
      style={{ paddingTop: 'var(--space-12)', maxWidth: 760 }}
    >
      <p className="section-eyebrow">Informations légales</p>
      <h1 className="section-title">{page.title}</h1>
      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)' }}>
        Dernière mise à jour :{' '}
        {new Date(page.updated).toLocaleDateString('fr-FR', {
          dateStyle: 'long',
        })}
      </p>
      {page.sections.map((s) => (
        <section key={s.heading}>
          <h2 style={{ fontSize: 'var(--text-xl)', marginTop: 'var(--space-8)' }}>
            {s.heading}
          </h2>
          {s.body.map((p, i) => (
            <p
              key={i}
              style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}
            >
              {p}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}