'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useCreateShopMutation from '../hooks/useCreateShopMutation'
import useGetUserListQuery from '../hooks/useGetUserListQuery'
import Asterisk from '@/components/Asterisk'
import useShopStore from '../stores/useShopStore'
import { useShallow } from 'zustand/shallow'
import { User } from '@/types'

type FormData = {
  name: string
  phone: string
  owner_id: number
  address: {
    province: string
    district: string
    ward: string
    detail: string
  }
}

const CreateModal = () => {
  const [shownUserList, setShowUserList] = useState<User[]>([])
  const [fullNameIdFilter, setFullNameIdFilter] = useState('')

  const [isCreatingShop, setIsCreatingShop] = useShopStore(
    useShallow((state) => [state.isCreatingShop, state.setIsCreatingShop]),
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const createShopMutation = useCreateShopMutation()

  const { data: userList } = useGetUserListQuery()

  useEffect(() => {
    if (userList) {
      setShowUserList(
        userList
          .filter((user) => user.role === 'owner')
          .filter(
            (user) =>
              user.full_name.toLowerCase().includes(fullNameIdFilter.toLowerCase()) ||
              user.id.toString().includes(fullNameIdFilter),
          ),
      )
    }
  }, [userList, fullNameIdFilter])

  const onSubmit = (data: FormData) => {
    createShopMutation.mutate(data)
  }

  const handleClose = () => {
    setIsCreatingShop(false)
  }

  return (
    <>
      <div className="screen-cover-dark-opacity-80" hidden={!isCreatingShop}></div>

      <div className="modal-white fixed-center" hidden={!isCreatingShop}>
        <div className="mb-6">
          <p className="!font-bold text-style-20">Tạo cửa hàng</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex flex-col gap-4">
          <label>
            <p className="mb-4 font-medium">
              <Asterisk /> Chủ cửa hàng
            </p>
            <input
              className="input-normal"
              type="text"
              placeholder="Tìm họ tên / ID"
              onChange={(e) => setFullNameIdFilter(e.target.value)}
            />
            <select
              className="input-normal-full"
              {...register('owner_id', {
                required: 'Vui lòng chọn chủ cửa hàng',
              })}
              defaultValue={''}
              size={4}
            >
              <option value="" disabled>
                Chọn chủ cửa hàng
              </option>
              {shownUserList?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.id} - {user.full_name}
                </option>
              ))}
            </select>
            {errors.name && <p className="text-style-error">{errors.name.message}</p>}
          </label>

          <label>
            <p className="mb-4 font-medium">
              <Asterisk /> Tên cửa hàng
            </p>
            <input
              className="input-normal-full"
              type="text"
              {...register('name', {
                required: 'Vui lòng nhập tên cửa hàng',
              })}
            />
            {errors.name && <p className="text-style-error">{errors.name.message}</p>}
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
              <Asterisk /> Tỉnh / Thành phố
            </p>
            <input
              className="input-normal-full"
              type="text"
              {...register('address.province', {
                required: 'Vui lòng nhập tỉnh / thành phố',
              })}
            />
            {errors.address?.province && <p className="text-style-error">{errors.address.province.message}</p>}
          </label>

          <label>
            <p className="mb-4 font-medium">
              <Asterisk /> Quận / Huyện
            </p>
            <input
              className="input-normal-full"
              type="text"
              {...register('address.district', {
                required: 'Vui lòng nhập quận / huyện',
              })}
            />
            {errors.address?.district && <p className="text-style-error">{errors.address.district.message}</p>}
          </label>

          <label>
            <p className="mb-4 font-medium">
              <Asterisk /> Xã / Phường
            </p>
            <input
              className="input-normal-full"
              type="text"
              {...register('address.ward', {
                required: 'Vui lòng nhập xã / phường',
              })}
            />
            {errors.address?.ward && <p className="text-style-error">{errors.address.ward.message}</p>}
          </label>

          <label>
            <p className="mb-4 font-medium">
              <Asterisk /> Địa chỉ chi tiết
            </p>
            <input
              className="input-normal-full"
              type="text"
              {...register('address.detail', {
                required: 'Vui lòng nhập địa chỉ chi tiết',
              })}
            />
            {errors.address?.detail && <p className="text-style-error">{errors.address.detail.message}</p>}
          </label>

          <div className="flex justify-between">
            <button type="button" className="button-border" onClick={handleClose}>
              Đóng
            </button>
            <button type="submit" className="button-dark">
              Tạo
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateModal
