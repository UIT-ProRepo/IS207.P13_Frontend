/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import { Product } from '@/types'

export interface CartItem extends Product {
  quantity: number
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [quantity, setQuantity] = useState(1)
  const [total, setTotal] = useState(0)

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

  const addToCart = (product: Product, quantity1: number) => {
    const sessionData = localStorage.getItem('session-storage')
    if (!sessionData) return
    const data = JSON.parse(sessionData)
    const userId = data?.state?.user?.id

    if (!userId) return
    setCartItems((prev) => {
      const currentCart = localStorage.getItem(`cart_${userId}`)
      const existingCart = currentCart ? JSON.parse(currentCart) : []
      const existingItem = existingCart.find((item: any) => item.id === product.id)
      let newCart

      if (existingItem) {
        newCart = existingCart.map((item: CartItem) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity1 } : item,
        )
        setCartItems(newCart)
      } else {
        console.log(quantity1)
        newCart = [...existingCart, { ...product, quantity: quantity1 }]
        setCartItems(newCart)
      }
      console.log(newCart)
      localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart))
      return newCart
    })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const sessionData = localStorage.getItem('session-storage')
    if (!sessionData) return
    const data = JSON.parse(sessionData)
    const userId = data?.state?.user?.id

    if (!userId) return
    const currentCart = localStorage.getItem(`cart_${userId}`)
    if (!currentCart) return
    const newCart = JSON.parse(currentCart).map((item: any) =>
      item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
    )
    localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart))
    setCartItems(newCart)
    window.dispatchEvent(new Event('storage'))
  }

  const removeFromCart = (productId: number) => {
    const sessionData = localStorage.getItem('session-storage')
    if (!sessionData) return
    const data = JSON.parse(sessionData)
    const userId = data?.state?.user?.id

    const currentCart = localStorage.getItem(`cart_${userId}`)
    if (!currentCart) return
    const newCart = JSON.parse(currentCart).filter((item: any) => item.id !== productId)
    localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart))
    setCartItems(newCart)
    window.dispatchEvent(new Event('storage'))
  }

  const getTotal = () => {
    const sessionData = localStorage.getItem('session-storage')
    if (!sessionData) return 0
    const data = JSON.parse(sessionData)
    const userId = data?.state?.user?.id

    const currentCart = localStorage.getItem(`cart_${userId}`)
    if (!currentCart) return 0
    const cartItems = JSON.parse(currentCart)
    const newTotal = cartItems.reduce((total: number, item: any) => total + item.unit_price_original * item.quantity, 0)
    setTotal(newTotal)
    return newTotal
  }

  useEffect(() => {
    getTotal()
  }, [cartItems])

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
    total,
  }
}
