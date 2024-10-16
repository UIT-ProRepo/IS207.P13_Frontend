'use client'
import React from 'react'
import useSessionStore from '@/stores/useSessionStore'
import { useShallow } from 'zustand/shallow'
import Link from 'next/link'
import ROUTES from '@/constants/routes'

const SigninButton = () => {
  const [isAuth, user] = useSessionStore(useShallow((state) => [state.isAuth, state.user]))

  if (isAuth) {
    return (
      <Link href={ROUTES.USER.ACCOUNT}>
        <button className="border-0 border-b border-dark text-style-14 xl:text-style-16">{user?.name}</button>
      </Link>
    )
  }

  return (
    <Link href={ROUTES.AUTH.SIGNIN}>
      <button className="border-0 border-b border-dark text-style-14 xl:text-style-16">Đăng nhập</button>
    </Link>
  )
}

export default SigninButton
