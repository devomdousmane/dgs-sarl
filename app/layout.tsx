import type { ReactNode } from 'react'
import './globals.css'

export const metadata = {
  title: 'DGS SARL — D Global Services | BTP · Immobilier · Automobile',
  description:
    "Construire aujourd'hui, bâtir durablement demain. DGS SARL, votre partenaire de confiance en BTP, génie civil, immobilier et automobile à Conakry, Guinée.",
  keywords: ['BTP Guinée', 'immobilier Conakry', 'construction Guinée', 'DGS SARL'],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="transition-colors duration-500">
        {children}
      </body>
    </html>
  )
}
