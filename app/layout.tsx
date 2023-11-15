import './globals.css'
import { Jost } from 'next/font/google'
import NavBar from '@/components/common/NavBar'
import { Analytics } from '@vercel/analytics/react';

const jost = Jost({ subsets: ['latin'] })

export const metadata = {
  manifest: "/manifest.json",
  favicon: "/favicon.ico",
  title: "Aliento para el viaje",
  description: "Aliento para el viaje es un podcast que busca inspirar a los oyentes a través de la Palabra de Dios.",
  keywords: "podcast, cristiano, devocional, inspiración, aliento, viaje, diario, biblia, palabra, dios, jesús, espíritu, santo, evangelio, iglesia, cristianismo, religión, oración, fe, esperanza, amor, paz, gozo, salvación, gracia, misericordia, perdón, arrepentimiento, reconciliación, justicia, verdad, vida, eterna, cielo, infierno, muerte, cruz, sangre, cristo, reino, cielo, infierno, diablo, demonio, ángel, ángeles, creación, pecado, hombre, mujer, matrimonio, familia, hijos, padres, abuelos, nietos, hermanos, hermanas, amigos, amigas, enemigos, enemigas, mundo, universo, tiempo, espacio, eternidad, pasado, presente, futuro, ayer, hoy, mañana, hoy, ahora, siempre",

  // Open Graph
  og: {
    type: "website",
    locale: "es_ES",
    url: "https://alientoparaelviaje.com",
    title: "Aliento para el viaje",
    description: "Aliento para el viaje es un podcast que busca inspirar a los oyentes a través de la Palabra de Dios.",
    image: "/public/maskable_icon.png",
    site_name: "Aliento para el viaje",
    imageWidth: 512,
    imageHeight: 512,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className='h-full'>
      <body className={`${jost.className} flex flex-col h-full`}>
        <NavBar
          notificationButton={true}
          dark={false}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}