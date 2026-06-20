import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Immobilier — Promotion · Construction · Investissement',
  description:
    "DGS SARL, acteur de la promotion immobilière à Conakry. Conception, construction et commercialisation de logements et bureaux de qualité en Guinée. Investissez dans la pierre avec un partenaire de confiance.",
  keywords: [
    'immobilier Guinée',
    'promotion immobilière Conakry',
    'logements neufs Guinée',
    'investissement immobilier Conakry',
    'appartements Conakry',
    'résidences Guinée',
    'DGS immobilier',
    'construction logements Guinée',
  ],
  openGraph: {
    title: 'Immobilier DGS SARL — Promotion · Investissement | Conakry',
    description:
      "Promotion immobilière à Conakry : logements, bureaux et résidences de qualité. Investissez en Guinée avec DGS SARL.",
    url: 'https://www.dgs-global.com/immobilier',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Immobilier DGS SARL Conakry' }],
  },
  alternates: { canonical: 'https://www.dgs-global.com/immobilier' },
}

export default function ImmobilierLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
