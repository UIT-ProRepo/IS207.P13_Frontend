'use client'
import React from 'react'
import { useCart } from './hooks/useCart'

const TotalCart = () => {
  const { getTotal } = useCart()

  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <h2 className="mb-4 text-lg font-medium">Tổng đơn hàng</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Tổng phụ:</span>
          <span>{getTotal().toLocaleString()}đ</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển:</span>
          <span>25.000đ</span>
        </div>
        <button className="w-full rounded bg-black py-2 text-white">Đặt hàng</button>
      </div>
    </div>
  )
}

export default TotalCart
