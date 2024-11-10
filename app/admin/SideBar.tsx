'use client'
import ROUTES from '@/constants/routes'
import useSessionStore from '@/stores/useSessionStore'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import avatarPlaceholder from '@/assets/avatar-placeholder.svg'

const SideBar = () => {
  const user = useSessionStore((state) => state.user)
  const path = usePathname()

  const links: { name: string; href: string }[] = [
    { name: 'Bảng điều khiển', href: ROUTES.ADMIN.BASE },
    { name: 'Quản lý người dùng', href: ROUTES.ADMIN.USER_MANAGEMENT },
    { name: 'Kiểm duyệt đánh giá', href: ROUTES.ADMIN.REVIEW_MANAGEMENT },
  ]

  return (
    <div className="flex h-fit items-start gap-6 xl:w-56 xl:max-w-56 xl:flex-col xl:gap-16">
      <div className="hidden items-center xl:flex xl:gap-7">
        <div className="aspect-square rounded-full">
          <Image className="h-full w-full" width={100} height={100} src={avatarPlaceholder.src} alt="avatar" />
        </div>
        <div className="flex flex-col">
          <p className="!font-semibold text-style-20">{user?.full_name.split(' ').pop()}</p>
          <p>ADMIN</p>
        </div>
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
