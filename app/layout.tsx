import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

const figtree = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify clone',
  description:
    'Discover endless music possibilities with Spotify Clone! Stream your favorite songs, playlists, and podcasts on-demand. Explore new genres, create personalized playlists, and enjoy a world of audio content.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={figtree.className}>{children}</body>
    </html>
  )
}
