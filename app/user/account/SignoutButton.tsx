'use client'
import React from 'react'
import useSessionStore from '@/stores/useSessionStore'

const SignoutButton = () => {
  const signOut = useSessionStore((state) => state.signOut)

  const handleSignOut = () => {
    signOut()
  }

  return (
    <button onClick={handleSignOut} className="button-dark">
      Đăng xuất
    </button>
  )
}

export default SignoutButton
