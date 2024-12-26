'use client'
import React, { useEffect, useState } from 'react'
import OrderItems from './orderItems'
import TotalCart from './totalCart'
// import { useCart } from './hooks/useCart'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([])

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
  }, [])

  if (cartItems.length === 0) {
    return <div className="mb-8 py-8 text-center text-2xl font-bold">Giỏ hàng trống</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Giỏ hàng</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OrderItems />
        </div>
        <div>
          <TotalCart />
        </div>
      </div>
    </div>
  )
}

export default CartPage
