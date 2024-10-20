import Asterisk from '@/components/Asterisk'
import Modal from '@/components/Modal'
import React from 'react'

const SignupModal = () => {
  return (
    <Modal>
      <p className="mb-6 !font-bold text-style-20">Đăng ký</p>

      <form action="" className="flex flex-col gap-4">
        <label>
          <p className="mb-4 font-medium">
            <Asterisk /> Họ và tên
          </p>
          <input name="" className="input-border-white-full" type="text" />
        </label>

        <label>
          <p className="mb-4 font-medium">
            <Asterisk /> Email
          </p>
          <input name="" className="input-border-white-full" type="email" />
        </label>

        <label>
          <p className="mb-4 font-medium">
            <Asterisk /> Số điện thoại
          </p>
          <input name="" className="input-border-white-full" type="text" />
        </label>

        <label>
          <p className="mb-4 font-medium">
            <Asterisk /> Ngày sinh
          </p>
          <input name="" className="input-border-white-full" type="date" />
        </label>

        <label>
          <p className="mb-4 font-medium">
            <Asterisk /> Giới tính
          </p>
          <select name="" className="input-border-white-full">
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </label>

        <label>
          <p className="mb-4 font-medium">
            <Asterisk /> Mật khẩu
          </p>
          <input name="" className="input-border-white-full" type="password" />
        </label>

        <label>
          <p className="mb-4 font-medium">
            <Asterisk /> Nhập lại mật khẩu
          </p>
          <input name="" className="input-border-white-full" type="password" />
        </label>

        <button className="button-dark mx-auto xl:mr-0">Đăng ký</button>
      </form>
    </Modal>
  )
}

export default SignupModal
