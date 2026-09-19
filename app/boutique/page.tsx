import type { Metadata } from 'next';
import { Suspense } from 'react';
import CatalogClient from './CatalogClient';

export const metadata: Metadata = {
  title: 'Boutique',
  description:
    'Toute la collection Les Ptits Bens : bébé, enfant, junior et accessoires. Mode enfant élégante et durable, de 0 à 14 ans.',
};

export default function BoutiquePage() {
  return (
    <Suspense>
      <CatalogClient />
    </Suspense>
  );
}
