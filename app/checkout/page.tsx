/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'

interface Order {
  id: number
  user_id: number
  shop_id: number
  shipping_provider_id: number
  address_id: number
  order_date: string
  total_price: number
  note: string | null
  payment_method: 'Cash' | 'CreditCard'
  delivery_status: 'Pending' | 'Success' | 'Fail'
  phone: string // Thêm thuộc tính phone
  createdAt: string
  updatedAt: string
}

interface OrderDetail {
  id: number
  product: Product
  quantity: number
}

interface Product {
  name: string
  unit_price: number
}

interface Address {
  province: string
  district: string
  ward: string
  detail: string
}

export default function Checkout() {
  const [orderDetails, setOrderDetails] = useState<any>()
  const [order, setOrder] = useState<Order | null>(null)
  const [address, setAddress] = useState<Address>({
    province: '',
    district: '',
    ward: '',
    detail: '',
  })
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'CreditCard'>('CreditCard')
  const [phone, setPhone] = useState<string>('')

  useEffect(() => {
    const fetchOrderData = async () => {
      const sessionData = localStorage.getItem('session-storage')
      if (!sessionData) return
      const data = JSON.parse(sessionData)
      const userId = data?.state?.user?.id

      if (!userId) return
      const currentCart = localStorage.getItem(`cart_${userId}`)
      if (!currentCart) return
      const newCart = JSON.parse(currentCart)
      setOrderDetails(newCart)
    }

    fetchOrderData()
  }, [])

  const handlePlaceOrder = () => {
    if (order) {
      const updatedOrder = {
        ...order,
        payment_method: paymentMethod,
        phone,
      }
      const updatedAddress = { ...address }

      console.log('Order Data:', updatedOrder)
      console.log('Address Data:', updatedAddress)

      // Gửi dữ liệu tới backend (nếu cần)
      // fetch('/api/save-order', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ order: updatedOrder, address: updatedAddress }),
      // });
    }
  }

  if (!order || orderDetails.length === 0) {
    return <div>Loading...</div> 
  }

  return (
    <div className="bg-white p-5 font-sans text-gray-800">
      <main className="mb-20 mt-10 flex justify-between space-x-10">
        <section className="w-1/2">
          <h2 className="mb-5 text-2xl font-semibold">Chi tiết hoá đơn</h2>
          <form className="flex w-[570px] flex-wrap gap-5">
            <div className="w-full">
              <label className="mb-2 block text-sm text-gray-600" htmlFor="address">
                Địa chỉ cụ thể *
              </label>
              <input
                className="w-full border-b border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="address"
                value={address.detail}
                onChange={(e) => setAddress({ ...address, detail: e.target.value })}
              />
            </div>
            <div className="w-full">
              <label className="mb-2 block text-sm text-gray-600" htmlFor="city">
                Tỉnh/Thành phố *
              </label>
              <input
                className="w-full border-b border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="province"
                value={address.province}
                onChange={(e) => setAddress({ ...address, province: e.target.value })}
              />
            </div>
            <div className="w-full">
              <label className="mb-2 block text-sm text-gray-600" htmlFor="district">
                Quận/Huyện *
              </label>
              <input
                className="w-full border-b border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="district"
                value={address.district}
                onChange={(e) => setAddress({ ...address, district: e.target.value })}
              />
            </div>
            <div className="w-full">
              <label className="mb-2 block text-sm text-gray-600" htmlFor="ward">
                Phường/Xã *
              </label>
              <input
                className="w-full border-b border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="ward"
                value={address.ward}
                onChange={(e) => setAddress({ ...address, ward: e.target.value })}
              />
            </div>
            <div className="w-full">
              <label className="mb-2 block text-sm text-gray-600" htmlFor="phone">
                Số điện thoại *
              </label>
              <input
                className="w-full border-b border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <h3 className="mt-5 text-xl font-semibold">Phương thức thanh toán</h3>
            <div className="mt-5 space-y-3">
              <label className="block text-sm">
                <input
                  className="mr-2"
                  type="radio"
                  name="payment"
                  id="CreditCard"
                  value="CreditCard"
                  checked={paymentMethod === 'CreditCard'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'CreditCard')}
                />
                Chuyển khoản trực tiếp
              </label>
              <label className="block text-sm">
                <input
                  className="mr-2"
                  type="radio"
                  name="payment"
                  id="Cash"
                  value="Cash"
                  checked={paymentMethod === 'Cash'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'Cash')}
                />
                Thanh toán khi nhận hàng
              </label>
              <p className="mb-3 text-sm text-gray-600">
                Vui lòng thanh toán trực tiếp vào tài khoản ngân hàng của chúng tôi. Hãy sử dụng Mã Đơn Hàng của bạn làm
                tham chiếu thanh toán. Đơn hàng của bạn sẽ không được giao cho đến khi chúng tôi nhận được tiền trong
                tài khoản.
              </p>
            </div>

            <button
              type="button"
              className="mt-8 w-[514px] transform rounded-md bg-black py-3 text-center text-white transition-transform hover:scale-105 hover:bg-gray-800 active:scale-95 active:bg-gray-700"
              onClick={handlePlaceOrder}
            >
              Đặt hàng
            </button>
          </form>
        </section>

        <section className="w-[470px]">
          <h2 className="mb-5 text-2xl font-semibold">Đơn hàng của bạn</h2>
          <ul>
            {orderDetails.map((orderDetail: any) => (
              <li key={orderDetail.id} className="flex justify-between border-b border-gray-200 py-3 text-sm">
                {orderDetail.product.name} × {orderDetail.quantity}{' '}
                <span className="font-semibold">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(orderDetail.product.unit_price)}
                </span>
              </li>
            ))}
            <li className="mt-3 flex justify-between py-3 text-sm">
              <span className="font-semibold">Thành tiền</span>{' '}
              <span className="font-semibold">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(order.total_price)}
              </span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  )
}
