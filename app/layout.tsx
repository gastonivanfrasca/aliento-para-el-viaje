import './globals.css'
import { Jost } from 'next/font/google'
import NavBar from '@/components/common/NavBar'
import { Analytics } from '@vercel/analytics/react';
import { get } from '@vercel/edge-config';
import { onDevEnv } from '@/lib/utils';

const jost = Jost({ subsets: ['latin'] })

export const metadata = {
  manifest: "/manifest.json",
  themeColor: "#ffffff",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const notificationButton = true
  return (
    <html lang="es" >
      <body className={jost.className}>
        <NavBar
          notificationButton={notificationButton}
          dark={false}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}