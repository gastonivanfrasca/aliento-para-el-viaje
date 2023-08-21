"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import AudioPlayer from "@/components/AudioPlayer"

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer>
          <AudioPlayer url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" customStyles={{ width: '300px' }} />
        </footer>
      </body>
    </html>
  )
}
