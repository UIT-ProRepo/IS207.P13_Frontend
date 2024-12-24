'use client'
import React, { useEffect } from 'react'
import useGetShopListByOwnerIdQuery from './hooks/useGetShopListByOwnerIdQuery'
import useSessionStore from '@/stores/useSessionStore'
import { useShallow } from 'zustand/shallow'
import useInventoryStore from './stores/useInventoryStore'

const ShopSelect = () => {
  const user = useSessionStore((state) => state.user)
  const [currentShopId, setCurrentShopId] = useInventoryStore(
    useShallow((state) => [state.currentShopId, state.setCurrentShopId]),
  )
  const { data, isLoading, isSuccess } = useGetShopListByOwnerIdQuery(user?.id ?? 0)

  useEffect(() => {
    if (isSuccess) {
      setCurrentShopId(data![0].id ?? 0)
    }
  }, [isSuccess, data, setCurrentShopId])

  return (
    <div>
      <select
        className="input-border-bottom"
        value={currentShopId}
        onChange={(e) => setCurrentShopId(Number(e.target.value))}
      >
        {isLoading ? (
          <option value={0}>Không có dữ liệu</option>
        ) : (
          data?.map((shop) => (
            <option key={shop.id} value={shop.id}>
              {shop.name} - {shop.address.province}, {shop.address.district}
            </option>
          ))
        )}
      </select>
    </div>
  )
}

export default ShopSelect
