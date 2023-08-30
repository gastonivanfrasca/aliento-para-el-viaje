import './globals.css'
import { Jost } from 'next/font/google'
import NavBar from '@/components/common/NavBar'
import { ShadButtonTypes } from '@/types/button'
import { Analytics } from '@vercel/analytics/react';

const jost = Jost({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
