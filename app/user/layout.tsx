import type { Metadata } from 'next'
import AuthGuard from './AuthGuard'
import SideBar from './SideBar'

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
      <AuthGuard>
        <div className="page-content flex flex-col gap-10 xl:flex-row">
          <SideBar />

          {children}
        </div>
      </AuthGuard>
    </>
  )
}

export default RootLayout
export { metadata }
