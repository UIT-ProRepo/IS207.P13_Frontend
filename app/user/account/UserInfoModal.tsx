'use client'
import useSessionStore from '@/stores/useSessionStore'
import { User } from '@/types'
import React from 'react'
import { useForm } from 'react-hook-form'
import useUpdateUserInfoMutation from './hooks/useUpdateUserInfoMutation'

type FormData = Partial<User>

const UserInfoModal = () => {
  const user = useSessionStore((state) => state.user)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: user
      ? {
          full_name: user.full_name,
          date_of_birth: user.date_of_birth,
          phone: user.phone,
          gender: user.gender,
        }
      : {},
  })

  const updateUserInfoMutation = useUpdateUserInfoMutation()

  const onSubmit = (data: FormData) => {
    updateUserInfoMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-11 xl:border xl:border-dark-orange xl:p-9">
      <label>
        <p className="mb-1 !font-normal text-style-18">Mã khách hàng</p>
        <input className="input-normal-full" type="text" disabled value={user?.id} />
      </label>

      <label>
        <p className="mb-1 !font-normal text-style-18">Email</p>
        <input className="input-normal-full" type="text" disabled value={user?.email} />
      </label>

      <label>
        <p className="mb-1 !font-normal text-style-18">Họ và tên</p>
        <input
          className="input-normal-full"
          type="text"
          {...register('full_name', {
            required: 'Vui lòng nhập họ và tên',
          })}
        />
        {errors.full_name && <p className="text-style-error">{errors.full_name.message}</p>}
      </label>

      <label>
        <p className="mb-1 !font-normal text-style-18">Số điện thoại</p>
        <input
          className="input-normal-full"
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
        <p className="mb-1 !font-normal text-style-18">Ngày sinh</p>
        <input
          className="input-normal-full"
          type="date"
          {...register('date_of_birth', {
            required: 'Vui lòng nhập ngày sinh',
            validate: (value) => new Date(value!) < new Date() || 'Ngày sinh không hợp lệ',
          })}
        />
        {errors.date_of_birth && <p className="text-style-error">{errors.date_of_birth.message}</p>}
      </label>

      <label>
        <p className="mb-1 !font-normal text-style-18">Giới tính</p>
        <select
          className="input-normal-full"
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

      <button type="submit" className="button-dark mx-auto">
        Cập nhật
      </button>
    </form>
  )
}

export default UserInfoModal
