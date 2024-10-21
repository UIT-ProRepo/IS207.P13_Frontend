import React, { ReactNode } from 'react'
import QueryProvider from './QueryProvider'
import SessionProvider from './SessionProvider'

const Providers = ({ children }: { children?: ReactNode }) => {
  return (
    <QueryProvider>
      <SessionProvider>{children}</SessionProvider>
    </QueryProvider>
  )
}

export default Providers
