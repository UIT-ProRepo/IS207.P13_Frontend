'use client'
import React from 'react'
import useSessionStore from '@/stores/useSessionStore'
import { useRouter } from 'next/navigation'
import ROUTES from '@/constants/routes'
import { toast } from 'react-toastify'

const SignoutButton = () => {
  const router = useRouter()
  const signOut = useSessionStore((state) => state.signOut)

  const handleSignOut = () => {
    signOut()
    router.replace(ROUTES.HOME.BASE)
    toast.success('Đăng xuất thàng công')
  }

  return (
    <button onClick={handleSignOut} className="button-border min-w-fit">
      Đăng xuất
    </button>
  )
}

export default SignoutButton
