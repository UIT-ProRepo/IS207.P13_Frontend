/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import { Product } from '@/types'

export interface CartItem extends Product {
  quantity: number
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [quantity, setQuantity] = useState(1)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const sessionData = localStorage.getItem('session-storage')
    if (sessionData) {
      const { user } = JSON.parse(sessionData)
      const userId = user?.id
      if (userId) {
        const savedCart = localStorage.getItem(`cart_${userId}`)
        if (savedCart) {
          setCartItems(JSON.parse(savedCart))
        }
      }
    }
  }, [])

  const addToCart = (product: Product, quantity: number) => {
    const sessionData = localStorage.getItem('session-storage')
    if (!sessionData) return
    const data = JSON.parse(sessionData)
    const userId = data?.state?.user?.id

    if (!userId) return
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      const currentCart = localStorage.getItem(`cart_${userId}`)
        const existingCart = currentCart ? JSON.parse(currentCart) : []
      let newCart

      if (existingItem) {
        console.log(1)
        newCart = existingCart.map((item: CartItem) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      } else {
        console.log('before', existingCart)
        newCart = [...existingCart, { ...product, quantity }]
        console.log('after', newCart)
      }

      localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart))
      return newCart
    })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const sessionData = localStorage.getItem('session-storage')
    if (!sessionData) return
    const { user } = JSON.parse(sessionData)
    const userId = user?.id
    if (!userId) return

    setCartItems((prev) => {
      const newCart = prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
      localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart))
      return newCart
    })
  }

  const removeFromCart = (productId: number) => {
    const sessionData = localStorage.getItem('session-storage')
    if (!sessionData) return
    const { user } = JSON.parse(sessionData)
    const userId = user?.id
    if (!userId) return

    setCartItems((prev) => {
      const newCart = prev.filter((item) => item.id !== productId)
      localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart))
      return newCart
    })
  }

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.unit_price * item.quantity, 0)
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotal,
    quantity,
    increaseQuantity,
    decreaseQuantity,
  }
}
