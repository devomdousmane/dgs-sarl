import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'BTP & Génie Civil — Construction · Infrastructures · Travaux',
  description:
    "DGS SARL, entreprise de BTP et génie civil à Conakry. Gros œuvre, infrastructures routières, réhabilitation de bâtiments et travaux publics en Guinée. Expertise et fiabilité depuis des années.",
  keywords: [
    'BTP Guinée',
    'génie civil Conakry',
    'construction Guinée',
    'travaux publics Conakry',
    'infrastructure Guinée',
    'bâtiment Conakry',
    'DGS BTP',
    'entrepreneur BTP Guinée',
    'gros œuvre Conakry',
  ],
  openGraph: {
    title: 'BTP & Génie Civil DGS SARL — Construction | Conakry, Guinée',
    description:
      "Entreprise de BTP à Conakry : gros œuvre, infrastructures, réhabilitation. Expertise technique et fiabilité pour tous vos projets de construction en Guinée.",
    url: 'https://www.dgs-global.com/btp',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'BTP DGS SARL Conakry Guinée' }],
  },
  alternates: { canonical: 'https://www.dgs-global.com/btp' },
}

export default function BTPLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
