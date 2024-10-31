'use client'
import React from 'react'
import useSessionStore from '@/stores/useSessionStore'
import { notFound } from 'next/navigation'

const AuthGuard = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const isAuth = useSessionStore((state) => state.isAuth)

  if (!isAuth) return notFound()

  return <>{children}</>
}

export default AuthGuard
