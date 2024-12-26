'use client'
import React from 'react'
import useOrderHistoryStore from './stores/useOrderHistoryStore'
import { useShallow } from 'zustand/shallow'

const Filter = () => {
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useOrderHistoryStore(
    useShallow((state) => [state.deliveryStatusFilter, state.setDeliveryStatusFilter]),
  )

  const handleDeliveryStatusFilterChange = (status: '*' | 'Pending' | 'Success' | 'Fail') => {
    setDeliveryStatusFilter(status)
  }

  return (
    <div className="flex justify-between border border-dark-orange px-4 py-2">
      <button
        disabled={deliveryStatusFilter === '*'}
        onClick={() => handleDeliveryStatusFilterChange('*')}
        className={`!font-plus-jakarta-sans !font-normal text-style-24 ${deliveryStatusFilter === '*' ? '!text-dark-orange' : ''}`}
      >
        Tất cả
      </button>
      <button
        disabled={deliveryStatusFilter === 'Pending'}
        onClick={() => handleDeliveryStatusFilterChange('Pending')}
        className={`!font-plus-jakarta-sans !font-normal text-style-24 ${deliveryStatusFilter === 'Pending' ? '!text-dark-orange' : ''}`}
      >
        Chờ giao hàng
      </button>
      <button
        disabled={deliveryStatusFilter === 'Success'}
        onClick={() => handleDeliveryStatusFilterChange('Success')}
        className={`!font-plus-jakarta-sans !font-normal text-style-24 ${deliveryStatusFilter === 'Success' ? '!text-dark-orange' : ''}`}
      >
        Hoàn thành
      </button>
      <button
        disabled={deliveryStatusFilter === 'Fail'}
        onClick={() => handleDeliveryStatusFilterChange('Fail')}
        className={`!font-plus-jakarta-sans !font-normal text-style-24 ${deliveryStatusFilter === 'Fail' ? '!text-dark-orange' : ''}`}
      >
        Thất bại
      </button>
    </div>
  )
}

export default Filter
