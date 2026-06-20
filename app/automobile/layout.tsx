import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Automobile — Vente Toyota · Import · Flotte Entreprise',
  description:
    "DGS SARL, distributeur automobile à Conakry. Vente de véhicules Toyota neufs : Hilux, Land Cruiser 76, Land Cruiser 300. Import direct, flotte entreprise et véhicules premium en Guinée.",
  keywords: [
    'automobile Guinée',
    'Toyota Conakry',
    'Hilux Guinée',
    'Land Cruiser Conakry',
    'importation véhicule Guinée',
    'flotte entreprise Conakry',
    'vente voiture Guinée',
    'DGS automobile',
  ],
  openGraph: {
    title: 'Automobile DGS SARL — Toyota · Import · Flotte | Conakry',
    description:
      "Gamme Toyota disponible à Conakry : Hilux, Land Cruiser 76, Land Cruiser 300. Import direct, flotte entreprise, livraison Guinée.",
    url: 'https://www.dgs-global.com/automobile',
    images: [{ url: '/images/auto/hilux-blanc-avant.jpg', width: 1200, height: 630, alt: 'Toyota Hilux — DGS SARL Conakry' }],
  },
  alternates: { canonical: 'https://www.dgs-global.com/automobile' },
}

export default function AutomobileLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
