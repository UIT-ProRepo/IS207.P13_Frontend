'use client'
import React from 'react'
import useSessionStore from '@/stores/useSessionStore'
import { useShallow } from 'zustand/shallow'
import NotFound from '../not-found'

const AdminGuard = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [isAuth, user] = useSessionStore(useShallow((state) => [state.isAuth, state.user]))

  if (!isAuth || user?.role !== 'admin') return <NotFound />
  else return <>{children}</>
}

export default AdminGuard
