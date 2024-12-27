/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import type { Session } from '@/types'
import { useRouter } from 'next/navigation'

type FormData = {
  order_date: string
  total_price: number
  payment_method: string
  phone: string
}

const useOrderMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: any) => {
      const paymentMethod = data.payment_method
      const response = await api.post('/orders', data)
      return {
        ...response.data,
        payment_method: paymentMethod,
      } as Session
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 422 || error.response?.status === 401) {
        toast.error('Tạo đơn hàng thất bại')
      }
    },
    onSuccess: async (data: any) => {
      toast.success('Tạo đơn hàng thành công')
      console.log(data.order.total_price)
      if (data.order.payment_method === 'CreditCard') {
        const response: any = await api.post('/vn_pay/get_payment_url', {
          amount: data.order.total_price,
        })
        console.log('Response from VNPay:', response)
        if (response.data?.url) {
          router.push(response.data.url)
        } else {
          toast.error('Không thể lấy được đường dẫn thanh toán')
        }
      } else {
        router.push('/user/order-history')
      }
    },
  })
}

export default useOrderMutation
