'use client'
import React from 'react'
import useUpdateIsDeletedMutation from './hooks/useUpdateIsDeletedMutation'
import useInventoryStore from './stores/useInventoryStore'
import { useShallow } from 'zustand/shallow'

const UpdateIsDeletedModal = () => {
  const [isUpdatingIsDeleted, updatingProduct, setIsUpdatingIsDeleted, setUpdatingProduct] = useInventoryStore(
    useShallow((state) => [
      state.isUpdatingIsDeleted,
      state.updatingProduct,
      state.setIsUpdatingIsDeleted,
      state.setUpdatingProduct,
    ]),
  )

  const updateIsAliveMutation = useUpdateIsDeletedMutation()

  const handleToggle = () => {
    updateIsAliveMutation.mutate({
      productId: updatingProduct ? updatingProduct.id : -1,
      data: { is_deleted: !updatingProduct?.is_deleted },
    })
  }

  const handleClose = () => {
    setIsUpdatingIsDeleted(false)
    setUpdatingProduct(null)
  }

  return (
    <>
      <div className="screen-cover-dark-opacity-80" hidden={!isUpdatingIsDeleted}></div>

      <div className="modal-white fixed-center" hidden={!isUpdatingIsDeleted}>
        <div className="mb-6">
          <p className="!font-bold text-style-20">{updatingProduct?.is_deleted ? 'Hủy xóa' : 'Xóa'} sản phẩm?</p>
          <p className="text-dark-orange">ID: {updatingProduct?.id}</p>
          <p className="text-dark-orange">ID shop: {updatingProduct?.shop_id}</p>
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

export default UpdateIsDeletedModal
