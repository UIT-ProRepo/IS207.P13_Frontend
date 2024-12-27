'use client'
import React, { useEffect } from 'react'
import useGetOrderListByShopIdQuery from './hooks/useGetOrderListByShopIdQuery'
import useOrderManagementStore from './stores/useOrderManagementStore'
import Loading from '@/components/Loading'
import { useShallow } from 'zustand/shallow'

const Table = () => {
  const [currentShopId, setOriginalOrderList, setActiveSlide, shownOrderList] = useOrderManagementStore(
    useShallow((state) => [
      state.currentShopId,
      state.setOriginalOrderList,
      state.setActiveSlide,
      state.shownOrderList,
    ]),
  )
  const { data, isLoading } = useGetOrderListByShopIdQuery(currentShopId)

  useEffect(() => {
    if (data) {
      setOriginalOrderList(data)
      setActiveSlide(0)
    }
  }, [data, setOriginalOrderList, setActiveSlide])

  return (
    <div className="w-full overflow-x-scroll no-scrollbar">
      <table className="table">
        <thead className="bg-dark-orange">
          <tr className="text-left">
            <th>ID đơn hàng</th>
            <th>Tên sản phẩm</th>
            <th>Giá đơn vị</th>
            <th>Số lượng mua</th>
            <th>Ngày đặt hàng</th>
            <th>Trạng thái đơn hàng</th>
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
          ) : shownOrderList.length > 0 ? (
            shownOrderList.map((order) => (
              <tr key={order.id + order.product.id}>
                <td className="font-bold">{order.id}</td>
                <td>{order.product.name}</td>
                <td>{order.product.unit_price.toLocaleString()}đ</td>
                <td>{order.order_detail.quantity}</td>
                <td>{order.order_date}</td>
                <td>
                  {order.delivery_status === 'Pending'
                    ? 'Đang giao hàng'
                    : order.delivery_status === 'Success'
                      ? 'Giao hàng thành công'
                      : order.delivery_status === 'Fail'
                        ? 'Giao hàng thất bại'
                        : ''}
                </td>
                <td>
                  <button className="button-border">Sửa</button>
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
