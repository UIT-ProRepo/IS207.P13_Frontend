'use client'
import type { User } from '@/types'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useUpdateUserMutation from '../hooks/useUpdateUserMutation'
import Asterisk from '@/components/Asterisk'
import useUserStore from '../stores/useUserStore'
import { useShallow } from 'zustand/shallow'

type FormData = Partial<User> & {
  password?: string
}

const UpdateModal = () => {
  const [isUpdatingUser, updatingUser, setIsUpdatingUser, setUpdatingUser] = useUserStore(
    useShallow((state) => [state.isUpdatingUser, state.updatingUser, state.setIsUpdatingUser, state.setUpdatingUser]),
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: updatingUser
      ? {
          full_name: updatingUser.full_name,
          phone: updatingUser.phone,
          gender: updatingUser.gender,
          date_of_birth: updatingUser.date_of_birth,
          role: updatingUser.role,
        }
      : {},
  })

  const updateUserMutation = useUpdateUserMutation()

  const onSubmit = (data: FormData) => {
    updateUserMutation.mutate({ userId: updatingUser ? updatingUser.id : -1, data })
  }

  const handleClose = () => {
    setIsUpdatingUser(false)
    setUpdatingUser(null)
  }

  useEffect(() => {
    if (updatingUser) {
      reset({
        full_name: updatingUser.full_name,
        phone: updatingUser.phone,
        gender: updatingUser.gender,
        date_of_birth: updatingUser.date_of_birth,
        role: updatingUser.role,
      })
    }
  }, [updatingUser, reset])

  return (
    <>
      <div className="screen-cover-dark-opacity-80" hidden={!isUpdatingUser}></div>

      <div className="modal-white fixed-center" hidden={!isUpdatingUser}>
        <div className="mb-6">
          <p className="!font-bold text-style-20">Cập nhật thông tin người dùng</p>
          <p className="text-dark-orange">ID: {updatingUser?.id}</p>
          <p className="text-dark-orange">Email: {updatingUser?.email}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex flex-col gap-4">
          <label>
            <p className="mb-4 font-medium">
              <Asterisk /> Họ và tên
            </p>
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
            <p className="mb-4 font-medium">
              <Asterisk /> Số điện thoại
            </p>
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
            <p className="mb-4 font-medium">
              <Asterisk /> Ngày sinh
            </p>
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
            <p className="mb-4 font-medium">
              <Asterisk /> Giới tính
            </p>
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

          <label>
            <p className="mb-4 font-medium">
              <Asterisk /> Vai trò
            </p>
            <select
              className="input-normal-full"
              {...register('role', {
                required: 'Vui lòng chọn vai trò',
              })}
            >
              <option value="admin">admin</option>
              <option value="owner">owner</option>
              <option value="customer">customer</option>
            </select>
            {errors.gender && <p className="text-style-error">{errors.gender.message}</p>}
          </label>

          <div className="flex justify-between">
            <button type="button" className="button-border" onClick={handleClose}>
              Hủy
            </button>
            <button type="submit" className="button-dark">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default UpdateModal
