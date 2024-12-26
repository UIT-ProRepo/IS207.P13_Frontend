'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useGetCategoryListQuery from './hooks/useGetCategoryListQuery'
import Asterisk from '@/components/Asterisk'
import useInventoryStore from './stores/useInventoryStore'
import { useShallow } from 'zustand/shallow'
import { Product } from '@/types'
import useUpdateProductMutation from './hooks/useUpdateProductMutation'

type FormData = Partial<Product>

const UpdateModal = () => {
  const [isUpdatingProduct, updatingProduct, setIsUpdatingProduct, setUpdatingProduct] = useInventoryStore(
    useShallow((state) => [
      state.isUpdatingProduct,
      state.updatingProduct,
      state.setIsUpdatingProduct,
      state.setUpdatingProduct,
    ]),
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: updatingProduct
      ? {
          name: updatingProduct.name,
          category_id: updatingProduct.category_id,
          unit_price: updatingProduct.unit_price,
          description: updatingProduct.description,
          image_url: updatingProduct.image_url,
          quantity: updatingProduct.quantity,
        }
      : {},
  })

  const updateProductMutation = useUpdateProductMutation()

  const { data: categoryList } = useGetCategoryListQuery()

  const onSubmit = (data: FormData) => {
    updateProductMutation.mutate({
      productId: updatingProduct ? updatingProduct.id : -1,
      data,
    })
  }

  const handleClose = () => {
    setIsUpdatingProduct(false)
    setUpdatingProduct(null)
  }

  useEffect(() => {
    if (updatingProduct) {
      reset({
        name: updatingProduct.name,
        category_id: updatingProduct.category_id,
        unit_price: updatingProduct.unit_price,
        description: updatingProduct.description,
        image_url: updatingProduct.image_url,
        quantity: updatingProduct.quantity,
      })
    }
  }, [updatingProduct, reset])

  return (
    <>
      <div className="screen-cover-dark-opacity-80" hidden={!isUpdatingProduct}></div>

      <div className="modal-white fixed-center" hidden={!isUpdatingProduct}>
        <div className="mb-6">
          <p className="!font-bold text-style-20">Cập nhật thông tin sản phẩm</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex flex-col gap-4">
          <label>
            <p className="mb-4 font-medium">
              <Asterisk /> Tên sản phẩm
            </p>
            <input
              className="input-normal-full"
              type="text"
              {...register('name', {
                required: 'Vui lòng nhập tên sản phẩm',
              })}
            />
            {errors.name && <p className="text-style-error">{errors.name.message}</p>}
          </label>

          <label>
            <p className="mb-4 font-medium">
              <Asterisk /> Loại sản phẩm
            </p>
            <select
              className="input-normal-full"
              {...register('category_id', {
                required: 'Vui lòng chọn loại sản phẩm',
              })}
            >
              <option value="" disabled>
                Chọn phân loại sản phẩm
              </option>
              {categoryList?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && <p className="text-style-error">{errors.category_id.message}</p>}
          </label>

          <label>
            <p className="mb-4 font-medium">
              <Asterisk /> Giá đơn vị
            </p>
            <input
              className="input-normal-full"
              type="number"
              {...register('unit_price', {
                required: 'Vui lòng nhập giá đơn vị',
              })}
            />
            {errors.unit_price && <p className="text-style-error">{errors.unit_price.message}</p>}
          </label>

          <label>
            <p className="mb-4 font-medium">
              <Asterisk /> Mô tả
            </p>
            <textarea
              className="input-normal-full"
              {...register('description', {
                required: 'Vui lòng nhập mô tả',
              })}
            />
            {errors.description && <p className="text-style-error">{errors.description.message}</p>}
          </label>

          <label>
            <p className="mb-4 font-medium">
              <Asterisk /> Đường dẫn ảnh
            </p>
            <input
              className="input-normal-full"
              type="text"
              {...register('image_url', {
                required: 'Vui lòng nhập đường dẫn ảnh',
              })}
            />
            {errors.image_url && <p className="text-style-error">{errors.image_url.message}</p>}
          </label>

          <label>
            <p className="mb-4 font-medium">
              <Asterisk /> Tồn kho
            </p>
            <input
              className="input-normal-full"
              type="number"
              {...register('quantity', {
                required: 'Vui lòng nhập tồn kho',
              })}
            />
            {errors.quantity && <p className="text-style-error">{errors.quantity.message}</p>}
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
