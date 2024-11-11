'use client'
import React from 'react'
import useSessionStore from '@/stores/useSessionStore'
import NotFound from '../not-found'

const AuthGuard = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const isAuth = useSessionStore((state) => state.isAuth)

  if (!isAuth) return <NotFound />
  else return <>{children}</>
}

export default AuthGuard
