'use client'
import type { Shop } from '@/types'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useUpdateShopMutation from '../hooks/useUpdateShopMutation'
import Asterisk from '@/components/Asterisk'
import useShopStore from '../stores/useShopStore'
import { useShallow } from 'zustand/shallow'

type FormData = Partial<Shop>

const UpdateModal = () => {
  const [isUpdatingShop, updatingShop, setIsUpdatingShop, setUpdatingShop] = useShopStore(
    useShallow((state) => [state.isUpdatingShop, state.updatingShop, state.setIsUpdatingShop, state.setUpdatingShop]),
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: updatingShop
      ? {
          name: updatingShop.name,
          phone: updatingShop.phone,
          address: {
            province: updatingShop.address.province,
            district: updatingShop.address.district,
            ward: updatingShop.address.ward,
            detail: updatingShop.address.detail,
          },
        }
      : {},
  })

  const updateShopMutation = useUpdateShopMutation()

  const onSubmit = (data: FormData) => {
    updateShopMutation.mutate({ shopId: updatingShop ? updatingShop.id : -1, data })
  }

  const handleClose = () => {
    setIsUpdatingShop(false)
    setUpdatingShop(null)
  }

  useEffect(() => {
    if (updatingShop) {
      reset({
        name: updatingShop.name,
        phone: updatingShop.phone,
        address: {
          province: updatingShop.address.province,
          district: updatingShop.address.district,
          ward: updatingShop.address.ward,
          detail: updatingShop.address.detail,
        },
      })
    }
  }, [updatingShop, reset])

  return (
    <>
      <div className="screen-cover-dark-opacity-80" hidden={!isUpdatingShop}></div>

      <div className="modal-white fixed-center" hidden={!isUpdatingShop}>
        <div className="mb-6">
          <p className="!font-bold text-style-20">Cập nhật thông tin cửa hàng</p>
          <p className="text-dark-orange">ID: {updatingShop?.id}</p>
          <p className="text-dark-orange">ID chủ cửa hàng: {updatingShop?.owner_id}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex flex-col gap-4">
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
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default UpdateModal
