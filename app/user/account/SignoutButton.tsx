'use client'
import React from 'react'
import useSessionStore from '@/stores/useSessionStore'

const SignoutButton = () => {
  const signOut = useSessionStore((state) => state.signOut)

  const handleSignOut = () => {
    signOut()
  }

  return (
    <button onClick={handleSignOut} className="button-border min-w-fit">
      Đăng xuất
    </button>
  )
}

export default SignoutButton
