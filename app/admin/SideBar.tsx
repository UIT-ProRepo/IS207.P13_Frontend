'use client'
import ROUTES from '@/constants/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideBar = () => {
  const path = usePathname()

  const links: { name: string; href: string }[] = [
    { name: 'Bảng điều khiển', href: ROUTES.ADMIN.BASE },
    { name: 'Quản lý người dùng', href: ROUTES.ADMIN.USER_MANAGEMENT },
    { name: 'Quản lý cửa hàng', href: ROUTES.ADMIN.SHOP_MANAGEMENT },
    { name: 'Kiểm duyệt đánh giá', href: ROUTES.ADMIN.REVIEW_MANAGEMENT },
  ]

  return (
    <div className="flex h-fit items-start gap-6 xl:min-w-[13rem] xl:flex-col xl:gap-16">
      <div className="hidden xl:block">
        <p className="text-style-24">HomeHaven</p>
        <p className="text-dark-orange">Admin</p>
      </div>

      <ul className="flex grow gap-6 overflow-x-scroll border-b border-t border-dark-orange py-3 !font-normal text-style-18 no-scrollbar xl:flex-col xl:border-none">
        {links.map((link) => (
          <li key={link.name} className={`min-w-max ${path === link.href ? 'text-dark-orange' : ''}`}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideBar
