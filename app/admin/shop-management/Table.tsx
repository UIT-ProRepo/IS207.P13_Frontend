'use client'
import React, { useEffect } from 'react'
import useGetShopListQuery from '../hooks/useGetShopListQuery'
import useShopStore from '../stores/useShopStore'
import Loading from '@/components/Loading'
import formatTimestamp from '@/utils/formatTimestamp'
import { useShallow } from 'zustand/shallow'

const Table = () => {
  const { data, isLoading } = useGetShopListQuery()
  const [setOriginalShopList, setActiveSlide, shownShopList, setIsUpdatingShop, setUpdatingShop, setIsUpdatingIsAlive] =
    useShopStore(
      useShallow((state) => [
        state.setOriginalShopList,
        state.setActiveSlide,
        state.shownShopList,
        state.setIsUpdatingShop,
        state.setUpdatingShop,
        state.setIsUpdatingIsAlive,
      ]),
    )

  useEffect(() => {
    if (data) {
      setOriginalShopList(data)
      setActiveSlide(0)
    }
  }, [data, setOriginalShopList, setActiveSlide])

  return (
    <div className="w-full overflow-x-scroll no-scrollbar">
      <table className="table">
        <thead className="bg-dark-orange">
          <tr className="text-left">
            <th>ID</th>
            <th>Tên cửa hàng</th>
            <th>Số điện thoại</th>
            <th>ID chủ cửa hàng</th>
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
          ) : shownShopList ? (
            shownShopList.map((shop) => (
              <tr key={shop.id}>
                <td className="font-bold">{shop.id}</td>
                <td>{shop.name}</td>
                <td>{shop.phone}</td>
                <td>{shop.owner_id}</td>
                <td>{shop.is_alive ? 'Đang hoạt động' : 'Ngừng hoạt động'}</td>
                <td>{formatTimestamp(shop.created_at)}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsUpdatingShop(true)
                      setUpdatingShop(shop)
                    }}
                    className="button-border"
                  >
                    Sửa
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setIsUpdatingIsAlive(true)
                      setUpdatingShop(shop)
                    }}
                    className="button-border w-full min-w-max"
                  >
                    {shop.is_alive ? 'Ngừng' : 'Kích hoạt'}
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
