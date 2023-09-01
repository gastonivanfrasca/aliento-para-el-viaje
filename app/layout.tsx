import './globals.css'
import { Jost } from 'next/font/google'
import NavBar from '@/components/common/NavBar'
import { Analytics } from '@vercel/analytics/react';

const jost = Jost({ subsets: ['latin'] })

export const metadata = {
  manifest: "/manifest.json",
  themeColor: "#ffffff",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className={jost.className}>
        <NavBar
          title="Audio del día"
          notificationButton
          dark={false}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}