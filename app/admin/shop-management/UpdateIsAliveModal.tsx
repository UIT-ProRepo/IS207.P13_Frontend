'use client'
import React from 'react'
import useUpdateIsAliveMutation from '../hooks/useUpdateIsAliveMutation'
import useShopStore from '../stores/useShopStore'
import { useShallow } from 'zustand/shallow'

const UpdateIsAliveModal = () => {
  const [isUpdatingIsAlive, updatingShop, setIsUpdatingIsAlive, setUpdatingShop] = useShopStore(
    useShallow((state) => [
      state.isUpdatingIsAlive,
      state.updatingShop,
      state.setIsUpdatingIsAlive,
      state.setUpdatingShop,
    ]),
  )

  const updateIsAliveMutation = useUpdateIsAliveMutation()

  const handleToggle = () => {
    updateIsAliveMutation.mutate({
      shopId: updatingShop ? updatingShop.id : -1,
      data: { is_alive: !updatingShop?.is_alive },
    })
  }

  const handleClose = () => {
    setIsUpdatingIsAlive(false)
    setUpdatingShop(null)
  }

  return (
    <>
      <div className="screen-cover-dark-opacity-80" hidden={!isUpdatingIsAlive}></div>

      <div className="modal-white fixed-center" hidden={!isUpdatingIsAlive}>
        <div className="mb-6">
          <p className="!font-bold text-style-20">
            {updatingShop?.is_alive ? 'Ngừng hoạt động' : 'Kích hoạt'} cửa hàng?
          </p>
          <p className="text-dark-orange">ID: {updatingShop?.id}</p>
          <p className="text-dark-orange">ID chủ cửa hàng: {updatingShop?.owner_id}</p>
        </div>

        <div className="flex justify-between">
          <button className="button-border" onClick={handleClose}>
            Đóng
          </button>
          <button onClick={handleToggle} className="button-dark">
            Xác nhận
          </button>
        </div>
      </div>
    </>
  )
}

export default UpdateIsAliveModal
