'use client'
import React, { useState } from 'react'
import menuIcon from '@/assets/menu-icon.svg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ROUTES from '@/constants/routes'
import useSessionStore from '@/stores/useSessionStore'
import { useShallow } from 'zustand/shallow'

const NavLinks = () => {
  const [isAuth, user] = useSessionStore(useShallow((state) => [state.isAuth, state.user]))
  const path = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links: { name: string; href: string }[] = [
    { name: 'Trang chủ', href: ROUTES.HOME.BASE },
    { name: 'Sản phẩm', href: ROUTES.PRODUCT.BASE },
    { name: 'Về chúng tôi', href: ROUTES.ABOUT.BASE },
    { name: 'Liên hệ', href: ROUTES.CONTACT.BASE },
  ]

  if (isAuth && user?.role === 'owner') {
    // TODO: Add owner routes
  } else if (isAuth && user?.role === 'admin') {
    links.push({ name: 'Quản trị', href: ROUTES.ADMIN.BASE })
  }

  return (
    <>
      {/* <Mobile> */}
      <button className="xl:hidden" onClick={() => setIsOpen(!isOpen)}>
        <Image width={menuIcon.width} height={menuIcon.height} src={menuIcon.src} alt="menu" />
      </button>

      <div
        className={`${isOpen ? 'absolute' : 'hidden'} top-12 z-10 w-52 border border-dark-orange bg-white p-4 xl:hidden`}
      >
        <ul className="flex flex-col gap-8 text-style-16 xl:hidden">
          {links.map((link) => (
            <li key={link.name} className={path === link.href ? 'text-dark-orange' : ''}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* </Mobile> */}

      {/* <Desktop> */}
      <ul className="hidden gap-8 text-style-16 xl:flex">
        {links.map((link) => (
          <li key={link.name} className={path === link.href ? 'text-dark-orange' : ''}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
      {/* </Desktop> */}
    </>
  )
}

export default NavLinks
