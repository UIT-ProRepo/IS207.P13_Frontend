import { api } from '@/api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import type { Session } from '@/types'

type FormData = {
  order_date: string
  total_price: number
  payment_method: string
  phone: string
}

const useOrderMutation = () =>
  useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post('/order', data)

      return response.data as Session
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 422 || error.response?.status === 401) {
        toast.error('Tạo đơn hàng thất bại')
      }
    },
    onSuccess: () => {
      toast.success('Tạo đơn hàng thành công')
    },
  })

export default useOrderMutation
