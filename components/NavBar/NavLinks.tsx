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

  const links: { name: string; href: string; active: boolean }[] = [
    { name: 'Trang chủ', href: ROUTES.HOME.BASE, active: path === ROUTES.HOME.BASE },
    { name: 'Sản phẩm', href: ROUTES.PRODUCT.BASE, active: path.startsWith(ROUTES.PRODUCT.BASE) },
    { name: 'Về chúng tôi', href: ROUTES.ABOUT.BASE, active: path === ROUTES.ABOUT.BASE },
    { name: 'Liên hệ', href: ROUTES.CONTACT.BASE, active: path === ROUTES.CONTACT.BASE },
  ]

  if (isAuth && user?.role === 'owner') {
    links.push(
      {
        name: 'Tồn kho',
        href: ROUTES.OWNER.INVENTORY_MANAGEMENT,
        active: path === ROUTES.OWNER.INVENTORY_MANAGEMENT,
      },
      {
        name: 'Đơn hàng',
        href: ROUTES.OWNER.ORDER_MANAGEMENT,
        active: path === ROUTES.OWNER.ORDER_MANAGEMENT,
      },
    )

  } else if (isAuth && user?.role === 'admin') {
    links.push({ name: 'Bảng điều khiển', href: ROUTES.ADMIN.BASE, active: path.startsWith(ROUTES.ADMIN.BASE) })
    links.push({
      name: 'Phân tích truy cập đa chiều',
      href: ROUTES.ADMIN.DASHBOARD,
      active: path.startsWith(ROUTES.ADMIN.DASHBOARD),
    })
  }

  return (
    <>
      {/* <Mobile> */}
      <button className="2xl:hidden" onClick={() => setIsOpen(!isOpen)}>
        <Image width={menuIcon.width} height={menuIcon.height} src={menuIcon.src} alt="menu" />
      </button>

      <div
        className={`${isOpen ? 'absolute' : 'hidden'} top-12 z-10 w-52 border border-dark-orange bg-white p-4 2xl:hidden`}
      >
        <ul className="flex flex-col gap-8 text-style-16 2xl:hidden">
          {links.map((link) => (
            <li key={link.name} className={link.active ? 'text-dark-orange' : ''}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* </Mobile> */}

      {/* <Desktop> */}
      <ul className="hidden gap-8 text-style-16 2xl:flex">
        {links.map((link) => (
          <li key={link.name} className={link.active ? 'text-dark-orange' : ''}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
      {/* </Desktop> */}
    </>
  )
}

export default NavLinks
