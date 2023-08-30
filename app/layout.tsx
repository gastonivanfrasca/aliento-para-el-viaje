import './globals.css'
import { Jost } from 'next/font/google'
import NavBar from '@/components/common/NavBar'
import { ShadButtonTypes } from '@/types/button'
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

const jost = Jost({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="application-name" content="Aliento para el viaje" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Aliento para el viaje" />
        <meta name="description" content="La vida es un viaje, una travesía del corazón. Tiene momentos maravillosos y tramos inesperados.
Los audios 'Aliento para el viaje' son un recordatorio de que la esperanza de Dios y su amor incomparable nos acompañan en cada tramo del camino." />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#FFFFFF" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />

      </Head>
      <body className={jost.className}>
        <NavBar
          title="Audio del día"
          buttonVariant={ShadButtonTypes.ghost}
          buttonIconSize={18}
          dark={false}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
