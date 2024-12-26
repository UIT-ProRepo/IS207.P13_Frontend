/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'
import { useCart } from './hooks/useCart'
import productPlaceholder from '@/assets/product-placeholder.png'

const OrderItems = () => {
  const { updateQuantity, removeFromCart, getTotal } = useCart()
  const [cartItems, setCartItems] = useState<any>([])
  const [flag, setFlag] = useState(0)

  const updateQuantityCart = (productId: number, quantity: number) => {
    updateQuantity(productId, quantity)
      setFlag(flag + 1)
      getTotal()
  }

  const removeItemFromCart = (productId: number) => {
    removeFromCart(productId)
      setFlag(flag + 1)
      getTotal()
  }

  useEffect(() => {
    const sessionData = localStorage.getItem('session-storage')
    if (sessionData) {
      const data = JSON.parse(sessionData)
      const userId = data?.state?.user?.id
      if (userId) {
        const savedCart = localStorage.getItem(`cart_${userId}`)
        if (savedCart) {
          setCartItems(JSON.parse(savedCart))
        }
      }
    }
  }, [flag])

  return (
    <div className="space-y-4">
      {cartItems.map((item: any) => (
        <div key={item.id} className="flex items-center gap-4 border-b pb-4">
          <img
            src={item.image_url || productPlaceholder.src}
            width={80}
            height={80}
            alt={item.name}
            className="rounded-md"
          />
          <div className="flex flex-1 justify-between">
            <div>
              <h3 className="font-serif text-[28px]">{item.name}</h3>
              <p className="text-gray-600">{item.unit_price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded border border-gray-300">
                <button className="px-3 py-1" onClick={() => updateQuantityCart(item.id, item.quantity - 1)}>
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity || 1}
                  onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
                  className="no-arrows w-12 border-l border-r border-gray-300 text-center outline-none"
                />
                <button className="px-3 py-1" onClick={() => updateQuantityCart(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
              <button onClick={() => removeItemFromCart(item.id)} className="text-red-500">
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
