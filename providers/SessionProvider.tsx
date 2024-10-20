'use client'
import React, { ReactNode, useEffect } from 'react'
import useSessionStore from '@/stores/useSessionStore'
import { useShallow } from 'zustand/shallow'

const SessionProvider = ({ children }: { children?: ReactNode }) => {
  const [fetchUser] = useSessionStore(useShallow((state) => [state.fetchUser]))

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return <>{children}</>
}

export default SessionProvider
