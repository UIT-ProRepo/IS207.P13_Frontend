import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'
import type { Order } from '@/types'
import { toast } from 'react-toastify'

const useGetOrderListByUserIdQuery = (userId: number) =>
  useQuery({
    queryKey: ['order-list'],
    queryFn: async () => {
      try {
        const response = await api.get('/orders')

        const orderList = response.data as Order[]

        return orderList.filter((order) => order.user_id === userId).sort((a, b) => b.id - a.id)
      } catch (error) {
        console.error(error)
        toast.error('Lỗi khi lấy danh sách đơn hàng')
      }
    },
  })

export default useGetOrderListByUserIdQuery
