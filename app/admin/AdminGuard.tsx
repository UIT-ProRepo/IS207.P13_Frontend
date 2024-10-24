'use client'
import React from 'react'
import useSessionStore from '@/stores/useSessionStore'
import { notFound } from 'next/navigation'
import { useShallow } from 'zustand/shallow'

const AdminGuard = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [isAuth, user] = useSessionStore(useShallow((state) => [state.isAuth, state.user]))

  if (!isAuth || user?.role !== 'admin') return notFound()

  return <>{children}</>
}

export default AdminGuard
