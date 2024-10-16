import type { Metadata } from 'next'
import { Libre_Bodoni, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from '@/providers'
import NavBar from '@/components/NavBar'

const libreBondoni = Libre_Bodoni({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  weight: ['700', '500'],
  variable: '--font-libre-bodoni',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  weight: ['600', '400'],
  variable: '--font-plus-jakarta-sans',
})

export const metadata: Metadata = {
  title: 'HomeHaven',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${libreBondoni.variable} ${plusJakartaSans.variable}`}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
