'use client'
import React from 'react'
import Image from 'next/image'
import { useCart } from './hooks/useCart'
import productPlaceholder from '@/assets/product-placeholder.png'

const OrderItems = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart()

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center gap-4 border-b pb-4">
          <Image
            src={item.image_url || productPlaceholder.src}
            width={80}
            height={80}
            alt={item.name}
            className="rounded-md"
          />
          <div className="flex flex-1 justify-between">
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600">{item.unit_price.toLocaleString()}đ</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded border">
                <button className="px-3 py-1" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button className="px-3 py-1" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                Xóa
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderItems
