'use client'
import React from 'react'
import useOrderManagementStore from './stores/useOrderManagementStore'
import { useShallow } from 'zustand/shallow'

const Filter = () => {
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useOrderManagementStore(
    useShallow((state) => [state.deliveryStatusFilter, state.setDeliveryStatusFilter]),
  )

  const handleDeliveryStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeliveryStatusFilter(e.target.value as '*' | 'Pending' | 'Success' | 'Fail')
  }

  return (
    <div className="flex items-center gap-4">
      <select className="input-normal" value={deliveryStatusFilter} onChange={handleDeliveryStatusFilterChange}>
        <option value="*">Tất cả trạng thái giao hàng</option>
        <option value="Pending">Đang giao hàng</option>
        <option value="Success">Giao hàng thành công</option>
        <option value="Fail">Giao hàng thất bại</option>
      </select>
    </div>
  )
}

export default Filter
