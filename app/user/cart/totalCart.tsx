'use client'
import React from 'react'
import { useCart } from './hooks/useCart'

const TotalCart = () => {
  const { getTotal } = useCart()

  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <h2 className="mb-4 text-lg font-medium">Tổng giỏ hàng</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Tổng phụ:</span>
          <span>{getTotal().toLocaleString()}đ</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển:</span>
          <span>0đ</span>
        </div>
        {/* <Select
          className="w-full"
          placeholder="Chọn tỉnh/thành"
          options={[
            { value: 'hanoi', label: 'Hà Nội' },
            { value: 'hcm', label: 'TP.HCM' },
          ]}
        />
        <Select className="w-full" placeholder="Chọn quận/huyện" /> */}
        <button className="w-full rounded bg-black py-2 text-white">Đặt hàng</button>
      </div>
    </div>
  )
}

export default TotalCart
