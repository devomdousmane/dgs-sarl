import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Nos Projets — Réalisations BTP · Immobilier · Automobile',
  description:
    "Découvrez les réalisations de DGS SARL à Conakry et en Guinée : projets BTP, constructions immobilières et livraisons automobile. La preuve de notre expertise.",
  keywords: [
    'projets DGS SARL',
    'réalisations BTP Guinée',
    'chantiers Conakry',
    'projets immobiliers Guinée',
    'portfolio construction Conakry',
  ],
  openGraph: {
    title: 'Projets DGS SARL — Nos Réalisations | Conakry, Guinée',
    description:
      "Portfolio de réalisations DGS SARL : BTP, immobilier et automobile à Conakry, Guinée.",
    url: 'https://www.dgs-global.com/projets',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Réalisations DGS SARL' }],
  },
  alternates: { canonical: 'https://www.dgs-global.com/projets' },
}

export default function ProjetsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
