import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'À Propos — Notre Histoire · Vision · Équipe',
  description:
    "DGS SARL, entreprise guinéenne fondée avec la vision de bâtir l'avenir de la Guinée. Découvrez notre histoire, nos valeurs et notre engagement envers la qualité en BTP, immobilier et automobile à Conakry.",
  keywords: [
    'DGS SARL histoire',
    'D Global Services Guinée',
    'entreprise Conakry',
    'vision DGS',
    'à propos DGS SARL',
  ],
  openGraph: {
    title: 'À Propos de DGS SARL — Notre Histoire & Vision | Guinée',
    description:
      "Découvrez DGS SARL : notre histoire, notre vision et notre engagement à Conakry, Guinée.",
    url: 'https://www.dgs-global.com/about',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'DGS SARL — À Propos' }],
  },
  alternates: { canonical: 'https://www.dgs-global.com/about' },
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
