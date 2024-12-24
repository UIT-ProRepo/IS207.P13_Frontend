import type { Metadata } from 'next'
import OwnerGuard from './OwnerGuard'

const metadata: Metadata = {
  title: 'Owner | HomeHaven',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <OwnerGuard>
        <div className="page-content">{children}</div>
      </OwnerGuard>
    </>
  )
}

export default RootLayout
export { metadata }
