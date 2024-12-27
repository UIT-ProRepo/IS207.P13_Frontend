type Order = {
  id: number
  user_id: number
  shipping_provider_id: number
  address_id: number
  order_date: string
  total_price: number
  note: string | null
  payment_method: 'Cash' | 'CreditCard'
  delivery_status: 'Pending' | 'Success' | 'Fail'
  createdAt: string
  updatedAt: string
}

export type { Order }
