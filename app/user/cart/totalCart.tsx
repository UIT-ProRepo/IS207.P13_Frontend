/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import { useCart } from './hooks/useCart'

const TotalCart = () => {
  const { total, getTotal } = useCart()

  useEffect(() => {
    const handleStorageChange = () => {
      getTotal()
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [getTotal])

  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <h2 className="mb-4 text-lg font-medium">Tổng đơn hàng</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Tổng tiền sản phẩm:</span>
          <span>{total.toLocaleString()}đ</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển:</span>
          <span>25.000đ</span>
        </div>
        <div className="flex justify-between">
          <span>Tổng tiền:</span>
          <span>{(total + 25000).toLocaleString()}đ</span>
        </div>
        <button className="w-full rounded bg-black py-2 text-white">Đặt hàng</button>
      </div>
    </div>
  )
}

export default TotalCart
