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
        <button className="button-border-bottom">{user?.full_name}</button>
      </Link>
    )
  }

  return (
    <Link href={ROUTES.AUTH.SIGNIN}>
      <button className="button-border-bottom">Đăng nhập</button>
    </Link>
  )
}

export default SigninButton
