'use client'
import ROUTES from '@/constants/routes'
import useSessionStore from '@/stores/useSessionStore'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useShallow } from 'zustand/shallow'

const SideBar = () => {
  const [isAuth, user] = useSessionStore(useShallow((state) => [state.isAuth, state.user]))
  const path = usePathname()

  const links: { name: string; href: string }[] = [{ name: 'Tài khoản của tôi', href: ROUTES.USER.ACCOUNT }]

  if (isAuth && user?.role === 'customer') {
    links.push(
      { name: 'Giỏ hàng', href: ROUTES.USER.CART },
      { name: 'Đơn mua', href: ROUTES.USER.ORDER_HISTORY },
      { name: 'Địa chỉ', href: ROUTES.USER.ADDRESS },
    )
  }

  return (
    <ul className="no-scrollbar flex gap-6 overflow-x-scroll border-b border-t border-dark-orange py-3 !font-normal text-style-18">
      {links.map((link) => (
        <li key={link.name} className={`min-w-max ${path === link.href ? 'text-dark-orange' : ''}`}>
          <Link href={link.href}>{link.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default SideBar
