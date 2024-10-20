import type { Metadata } from 'next'
import favicon from '@/assets/favicon.png'
import { Libre_Bodoni, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from '@/providers'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const libreBondoni = Libre_Bodoni({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  weight: ['700', '500'],
  variable: '--font-libre-bodoni',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  weight: ['700', '600', '500', '400'],
  variable: '--font-plus-jakarta-sans',
})

export const metadata: Metadata = {
  title: 'HomeHaven',
  icons: favicon.src,
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
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
