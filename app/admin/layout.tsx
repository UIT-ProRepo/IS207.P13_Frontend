import type { Metadata } from 'next'
import AdminGuard from './AdminGuard'

const metadata: Metadata = {
  title: 'Admin | HomeHaven',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      {/* <AdminGuard> */}
      {children}
      {/* </AdminGuard> */}
    </>
  )
}

export default RootLayout
export { metadata }
