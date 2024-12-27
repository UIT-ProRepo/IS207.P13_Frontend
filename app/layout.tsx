import type { Metadata } from 'next'
import favicon from '@/assets/favicon.png'
import { Libre_Bodoni, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import 'react-toastify/dist/ReactToastify.min.css'
import { Providers } from '@/providers'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { ToastContainer, Bounce } from 'react-toastify'
import SessionVerificationGuard from './SessionVerificationGuard'
import ChatBotAI from '@/components/ChatBotAI'

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

const metadata: Metadata = {
  title: 'HomeHaven',
  icons: favicon.src,
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="d123d9f3-2fe2-427b-9397-0486f9f8fcc2"
        ></script>
      </head>
      <body className={`${libreBondoni.variable} ${plusJakartaSans.variable}`}>
        <Providers>
          <SessionVerificationGuard>
            <NavBar />

            {children}
            <ChatBotAI />
            <Footer />

            <ToastContainer
              position="bottom-right"
              limit={3}
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss={false}
              draggable={false}
              pauseOnHover={false}
              theme="colored"
              transition={Bounce}
            />
          </SessionVerificationGuard>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
export { metadata }
