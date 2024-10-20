import Asterisk from '@/components/Asterisk'
import Modal from '@/components/Modal'
import Link from 'next/link'
import React from 'react'

const SigninModal = () => {
  return (
    <Modal>
      <p className="!font-bold text-style-20">Đăng nhập</p>
      <p className="mb-6 text-dark-orange">Nhập email và mật khẩu để đăng nhập vào hệ thống</p>

      <form action="" className="mb-6 flex flex-col gap-4">
        <label>
          <p className="mb-4 font-medium">
            <Asterisk /> Email
          </p>
          <input className="input-border-white-full" type="email" />
        </label>

        <label>
          <p className="mb-4 font-medium">
            <Asterisk /> Mật khẩu
          </p>
          <input className="input-border-white-full" type="password" />
        </label>

        <button className="button-dark mx-auto xl:mr-0">Đăng nhập</button>
      </form>

      <p className="text-dark-orange">
        Chưa có tài khoản?{' '}
        <Link href="/auth/signup">
          <span className="underline">Đăng ký</span>
        </Link>
      </p>
    </Modal>
  )
}

export default SigninModal
