import React, { ReactNode } from 'react'
import QueryProvider from './QueryProvider'

const Providers = ({ children }: { children?: ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>
}

export default Providers
