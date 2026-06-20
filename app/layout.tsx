import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const BASE_URL = 'https://www.dgs-global.com'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#CC1418',
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'DGS SARL — D Global Services | BTP · Immobilier · Automobile',
    template: '%s | DGS SARL',
  },
  description:
    "DGS SARL, votre partenaire de confiance à Conakry, Guinée. Expertise en BTP et génie civil, promotion immobilière et vente de véhicules Toyota. Construire aujourd'hui, investir durablement.",
  keywords: [
    'DGS SARL',
    'D Global Services',
    'BTP Guinée',
    'construction Conakry',
    'immobilier Guinée',
    'génie civil Conakry',
    'automobile Guinée',
    'Toyota Conakry',
    'Land Cruiser Guinée',
    'Hilux Guinée',
    'promotion immobilière Conakry',
    'flotte entreprise Guinée',
  ],
  authors: [{ name: 'DGS SARL', url: BASE_URL }],
  creator: 'DGS SARL',
  publisher: 'DGS SARL',
  category: 'business',
  openGraph: {
    type: 'website',
    locale: 'fr_GN',
    url: BASE_URL,
    siteName: 'DGS SARL',
    title: 'DGS SARL — D Global Services | BTP · Immobilier · Automobile',
    description:
      "Votre partenaire de confiance à Conakry, Guinée. BTP, génie civil, immobilier et automobile. Construire aujourd'hui, investir durablement.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DGS SARL — D Global Services, Conakry, Guinée',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DGS SARL — BTP · Immobilier · Automobile | Conakry, Guinée',
    description:
      "Votre partenaire de confiance à Conakry. BTP, génie civil, immobilier et automobile.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/icons/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/icons/favicon-32.png',
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'fr-GN': BASE_URL,
      'fr':    BASE_URL,
    },
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'DGS SARL',
              alternateName: 'D Global Services',
              url: BASE_URL,
              logo: `${BASE_URL}/logo/logo-dark.png`,
              description:
                "Entreprise guinéenne spécialisée en BTP, génie civil, promotion immobilière et vente automobile à Conakry, Guinée.",
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Conakry',
                addressCountry: 'GN',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: ['French'],
              },
              sameAs: [],
              areaServed: {
                '@type': 'Country',
                name: 'Guinée',
              },
            }),
          }}
        />
      </head>
      <body className="transition-colors duration-500">
        {children}
      </body>
    </html>
  )
}
