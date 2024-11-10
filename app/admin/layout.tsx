import type { Metadata } from 'next'
import AdminGuard from './AdminGuard'
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
      {/* <AdminGuard> */}
      <div className="page-content flex flex-col gap-8 xl:flex-row">
        <SideBar />
        <div className="grow">{children}</div>
      </div>
      {/* </AdminGuard> */}
    </>
  )
}

export default RootLayout
export { metadata }
