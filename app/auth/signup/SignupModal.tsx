'use client'
import React, { useEffect } from 'react'
import Asterisk from '@/components/Asterisk'
import Modal from '@/components/Modal'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import useSignupMutation from './hooks/useSignupMutation'
import useSessionStore from '@/stores/useSessionStore'
import ROUTES from '@/constants/routes'

type FormData = {
  full_name: string
  email: string
  phone: string
  date_of_birth: string
  gender: string
  password: string
  password_confirmation: string
}

const SignupModal = () => {
  const isAuth = useSessionStore((state) => state.isAuth)
  const router = useRouter()

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const signupMutation = useSignupMutation()

  const onSubmit = (data: FormData) => {
    signupMutation.mutate(data)
  }

  useEffect(() => {
    if (isAuth) router.push(ROUTES.HOME.BASE)
  }, [isAuth, router])

  return (
    <Modal>
      <p className="mb-6 !font-bold text-style-20">Đăng ký</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label>
          <p className="mb-4 font-medium">
            <Asterisk /> Họ và tên
          </p>
          <input
            className="input-border-white-full"
            type="text"
            {...register('full_name', {
              required: 'Vui lòng nhập họ và tên',
            })}
          />
          {errors.full_name && <p className="text-style-error">{errors.full_name.message}</p>}
        </label>

        <label>
          <p className="mb-4 font-medium">
            <Asterisk /> Email
          </p>
          <input
            className="input-border-white-full"
            type="email"
            {...register('email', {
              required: 'Vui lòng nhập email',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Email không hợp lệ',
              },
            })}
          />
          {errors.email && <p className="text-style-error">{errors.email.message}</p>}
        </label>

        <label>
          <p className="mb-4 font-medium">
            <Asterisk /> Số điện thoại
          </p>
          <input
            className="input-border-white-full"
            type="text"
            {...register('phone', {
              required: 'Vui lòng nhập số điện thoại',
              pattern: {
                value: /^\d{10,11}$/,
                message: 'Số điện thoại không hợp lệ',
              },
            })}
          />
          {errors.phone && <p className="text-style-error">{errors.phone.message}</p>}
        </label>

        <label>
          <p className="mb-4 font-medium">
            <Asterisk /> Ngày sinh
          </p>
          <input
            className="input-border-white-full"
            type="date"
            {...register('date_of_birth', {
              required: 'Vui lòng nhập ngày sinh',
              validate: (value) => new Date(value) < new Date() || 'Ngày sinh không hợp lệ',
            })}
          />
          {errors.date_of_birth && <p className="text-style-error">{errors.date_of_birth.message}</p>}
        </label>

        <label>
          <p className="mb-4 font-medium">
            <Asterisk /> Giới tính
          </p>
          <select
            className="input-border-white-full"
            {...register('gender', {
              required: 'Vui lòng chọn giới tính',
            })}
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
          {errors.gender && <p className="text-style-error">{errors.gender.message}</p>}
        </label>

        <label>
          <p className="mb-4 font-medium">
            <Asterisk /> Mật khẩu
          </p>
          <input
            className="input-border-white-full"
            type="password"
            {...register('password', {
              required: 'Vui lòng nhập mật khẩu',
              minLength: {
                value: 6,
                message: 'Mật khẩu phải có ít nhất 6 ký tự',
              },
            })}
          />
          {errors.password && <p className="text-style-error">{errors.password.message}</p>}
        </label>

        <label>
          <p className="mb-4 font-medium">
            <Asterisk /> Nhập lại mật khẩu
          </p>
          <input
            className="input-border-white-full"
            type="password"
            {...register('password_confirmation', {
              required: 'Vui lòng nhập lại mật khẩu',
              validate: (value) => {
                if (value !== watch('password')) return 'Mật khẩu không khớp'
              },
            })}
          />
          {errors.password_confirmation && <p className="text-style-error">{errors.password_confirmation.message}</p>}
        </label>

        <button type="submit" className="button-dark mx-auto xl:mr-0">
          Đăng ký
        </button>
      </form>
    </Modal>
  )
}

export default SignupModal
