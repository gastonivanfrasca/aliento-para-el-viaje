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


async function shouldShowNotificationButton(): Promise<boolean> {
  if (onDevEnv()) {
    return true;
  } else {
    const notificationButtonFlag = await get('notificationButton');
    return notificationButtonFlag === 'true'
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const notificationButton = await shouldShowNotificationButton()
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