/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect } from 'react'
import useGetOrderListByUserIdQuery from './hooks/useGetOrderListByUserIdQuery'
import useOrderHistoryStore from './stores/useOrderHistoryStore'
import Loading from '@/components/Loading'
import { useShallow } from 'zustand/shallow'
import useSessionStore from '@/stores/useSessionStore'
import productPlaceholder from '@/assets/product-placeholder.png'
import { useRouter } from 'next/navigation'

const List = () => {
  const user = useSessionStore((state) => state.user)
  const [setOriginalOrderList, setActiveSlide, shownOrderList] = useOrderHistoryStore(
    useShallow((state) => [state.setOriginalOrderList, state.setActiveSlide, state.shownOrderList]),
  )

  const { data, isLoading } = useGetOrderListByUserIdQuery(user?.id || 0)
  const router = useRouter()

  useEffect(() => {
    if (data) {
      setOriginalOrderList(data)
      setActiveSlide(0)
    }
  }, [data, setOriginalOrderList, setActiveSlide])

  return (
    <div className="flex flex-col gap-12">
      {isLoading ? (
        <div className="col-span-full flex w-full justify-center">
          <Loading />
        </div>
      ) : shownOrderList.length > 0 ? (
        shownOrderList.map((order) => (
          <div key={order.id} className="flex flex-col border-2 border-dark-orange">
            <div className="h-52 overflow-y-scroll no-scrollbar">
              <table className="table h-full">
                <thead className="h-12 bg-dark-orange">
                  <tr className="text-left">
                    <th></th>
                    <th>ID</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá đơn vị</th>
                    <th>Số lượng đặt</th>
                  </tr>
                </thead>
                <tbody className="h-fit bg-white [&>tr]:border [&>tr]:border-dark-orange">
                  {(order as any).order_details.map((item: any) => (
                    <tr key={item.product.id} className="min-h-12">
                      <td>
                        <img
                          className="h-12 w-12"
                          src={item.product.image_url || productPlaceholder.src}
                          alt={item.product.name}
                        />
                      </td>
                      <td>{item.product.id}</td>
                      <td>{item.product.name}</td>
                      <td>{item.product.unit_price.toLocaleString()}đ</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <hr className="border-dark-orange" />
            <div className="flex h-52 justify-between p-6">
              <div className="flex flex-col">
                <p className="text-style-16">
                  <b>Mã đơn hàng: </b>
                  {order.id}
                </p>
                <p className="text-style-16">
                  <b>Ngày đặt hàng: </b>
                  {order.order_date}
                </p>
              </div>

              <div className="flex flex-col items-end justify-between">
                <p className="!font-normal uppercase text-style-18">
                  {order.delivery_status === 'Pending'
                    ? 'Chờ giao hàng'
                    : order.delivery_status === 'Success'
                      ? 'Giao hàng thành công'
                      : order.delivery_status === 'Fail'
                        ? 'Giao hàng thất bại'
                        : ''}
                </p>
                <p className="!font-normal text-style-18">Thành tiền: {order.total_price.toLocaleString()}đ</p>

                {order.delivery_status === 'Pending' ? (
                  <button className="button-dark text-style-16">Đã nhận được hàng</button>
                ) : order.delivery_status === 'Success' ? (
                  <button className="button-dark text-style-16">Đánh giá</button>
                ) : order.delivery_status === 'Fail' ? (
                  <button
                    onClick={() => {
                      router.push('/user/cart')
                    }}
                    className="button-dark text-style-16"
                  >
                    Mua lại
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full flex w-full justify-center">
          <p>Không có đơn hàng nào</p>
        </div>
      )}
    </div>
  )
}

export default List
