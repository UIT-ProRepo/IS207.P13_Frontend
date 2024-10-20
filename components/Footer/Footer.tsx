import React from 'react'
import Logo from '../Logo'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="xl: flex flex-col items-center justify-between gap-[75px] xl:flex-row xl:items-start xl:gap-0">
      <Logo />

      <div className="gap flex w-full flex-wrap justify-between gap-[40px] xl:max-w-[70vw]">
        <div className="flex w-fit max-w-[250px] flex-col gap-[24px]">
          <p className="!font-medium text-style-20">Liên kết</p>
          <ul className="flex flex-col gap-[16px] text-style-16">
            <li>
              <Link href="/">
                <p>Trang chủ</p>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <p>Về chúng tôi</p>
              </Link>
            </li>
            <li>
              <Link href="/product">
                <p>Sản phẩm</p>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <p>Blog</p>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <p>Liên hệ</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex w-fit max-w-[250px] flex-col gap-[24px]">
          <p className="!font-medium text-style-20">Thông tin liên hệ</p>
          <ul className="flex flex-col gap-[16px] text-style-16">
            <li>
              <p>720A Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, Hồ Chí Minh</p>
            </li>
            <li>
              <p>info@homehaven.com</p>
            </li>
            <li>
              <p>800-123-45-678</p>
            </li>
          </ul>
        </div>
        <div className="flex w-fit max-w-[250px] flex-col gap-[24px]">
          <p className="!font-medium text-style-20">Theo dõi chúng tôi</p>
          <ul className="flex flex-col gap-[16px] text-style-16">
            <li>
              <button className="button--bottom">Facebook</button>
            </li>
            <li>
              <button className="button--bottom">Instagram</button>
            </li>
            <li>
              <button className="button--bottom">Linkedin</button>
            </li>
            <li>
              <button className="button--bottom">Twitter</button>
            </li>
          </ul>
        </div>
        <div className="flex w-fit max-w-[250px] flex-col gap-[24px]">
          <p className="!font-medium text-style-20">Pháp lý</p>
          <ul className="flex flex-col gap-[16px] text-style-16">
            <li>Website by nhóm 3</li>
            <li>&copy; 2024. All Rights Reserved</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
