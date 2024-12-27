/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect } from 'react'
import useGetProductListByShopIdQuery from './hooks/useGetProductListByShopIdQuery'
import useInventoryStore from './stores/useInventoryStore'
import Loading from '@/components/Loading'
import formatTimestamp from '@/utils/formatTimestamp'
import { useShallow } from 'zustand/shallow'

const Table = () => {
  const [
    currentShopId,
    setOriginalProductList,
    setActiveSlide,
    shownProductList,
    setIsUpdatingProduct,
    setUpdatingProduct,
    setIsUpdatingIsDeleted,
  ] = useInventoryStore(
    useShallow((state) => [
      state.currentShopId,
      state.setOriginalProductList,
      state.setActiveSlide,
      state.shownProductList,
      state.setIsUpdatingProduct,
      state.setUpdatingProduct,
      state.setIsUpdatingIsDeleted,
    ]),
  )
  const { data, isLoading } = useGetProductListByShopIdQuery(currentShopId)

  useEffect(() => {
    if (data) {
      setOriginalProductList(data)
      setActiveSlide(0)
    }
  }, [data, setOriginalProductList, setActiveSlide])

  return (
    <div className="w-full overflow-x-scroll no-scrollbar">
      <table className="table">
        <thead className="bg-dark-orange">
          <tr className="text-left">
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Giá đơn vị</th>
            <th>Tồn kho</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="bg-white [&>tr]:border [&>tr]:border-dark-orange">
          {isLoading ? (
            <tr>
              <td>
                <Loading />
              </td>
            </tr>
          ) : shownProductList.length > 0 ? (
            shownProductList.map((product) => (
              <tr key={product.id}>
                <td className="font-bold">{product.id}</td>
                <td>{product.name}</td>
                <td>{product.unit_price}</td>
                <td>{product.quantity}</td>
                <td>{product.is_deleted ? 'Đã xóa' : 'Đang tồn tại'}</td>
                <td>{formatTimestamp((product as any).created_at)}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsUpdatingProduct(true)
                      setUpdatingProduct(product)
                    }}
                    className="button-border"
                  >
                    Sửa
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setIsUpdatingIsDeleted(true)
                      setUpdatingProduct(product)
                    }}
                    className="button-border w-full min-w-max"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
