import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'
import type { Address, Shop } from '@/types'
import { toast } from 'react-toastify'

const useGetShopListQuery = () =>
  useQuery({
    queryKey: ['shop-list'],
    queryFn: async () => {
      try {
        const response = await api.get('/shop')

        return response.data as (Shop & { address: Address })[]
      } catch (error) {
        console.error(error)
        toast.error('Lỗi khi lấy danh sách cửa hàng')
      }
    },
  })

export default useGetShopListQuery
