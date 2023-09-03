import './globals.css'
import { Jost } from 'next/font/google'
import NavBar from '@/components/common/NavBar'
import { Analytics } from '@vercel/analytics/react';
import { get } from '@vercel/edge-config';

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
  const notificationButtonFlag = await get('notificationButton')
  const notificationButton = notificationButtonFlag === 'true' ? true : false
  return (
    <html lang="en" >
      <body className={jost.className}>
        <NavBar
          title="Audio del día"
          notificationButton={notificationButton}
          dark={false}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}