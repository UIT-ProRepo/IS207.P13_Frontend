'use client'
import React, { ReactNode, useEffect } from 'react'
import useSessionStore from '@/stores/useSessionStore'
import { useShallow } from 'zustand/shallow'

const SessionVerificationGuard = ({ children }: { children?: ReactNode }) => {
  const [verifySession] = useSessionStore(useShallow((state) => [state.verifySession]))

  useEffect(() => {
    verifySession()
  }, [verifySession])

  return <>{children}</>
}

export default SessionVerificationGuard
