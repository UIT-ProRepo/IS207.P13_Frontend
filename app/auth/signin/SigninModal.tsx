'use client'
import React, { useEffect } from 'react'
import Asterisk from '@/components/Asterisk'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import useSigninMutation from './hooks/useSigninMutation'
import useSessionStore from '@/stores/useSessionStore'
import { useRouter } from 'next/navigation'
import ROUTES from '@/constants/routes'

type FormData = {
  email: string
  password: string
}

const SigninModal = () => {
  const isAuth = useSessionStore((state) => state.isAuth)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const signinMutation = useSigninMutation()

  const onSubmit = (data: FormData) => {
    signinMutation.mutate(data)
  }

  useEffect(() => {
    if (isAuth) router.push(ROUTES.HOME.BASE)
  }, [isAuth, router])

  return (
    <div className="modal-EDF2F9">
      <div className="mb-6">
        <p className="!font-bold text-style-20">Đăng nhập</p>
        <p className="text-dark-orange">Nhập email và mật khẩu để đăng nhập vào hệ thống</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex flex-col gap-4">
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

        <button type="submit" className="button-dark mx-auto xl:mr-0">
          Đăng nhập
        </button>
      </form>

      <p className="text-dark-orange">
        Chưa có tài khoản?{' '}
        <Link href="/auth/signup">
          <span className="underline">Đăng ký ngay</span>
        </Link>
      </p>
    </div>
  )
}

export default SigninModal
