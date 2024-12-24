import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'
import type { Address, Shop } from '@/types'
import { toast } from 'react-toastify'

const useGetShopListByOwnerIdQuery = (ownerId: number) =>
  useQuery({
    queryKey: ['shop-list'],
    queryFn: async () => {
      try {
        const response = await api.get('/shop')

        const shopList = response.data as (Shop & { address: Address })[]

        return shopList.filter((shop) => shop.owner_id === ownerId && shop.is_alive)
      } catch (error) {
        console.error(error)
        toast.error('Lỗi khi lấy danh sách cửa hàng')
      }
    },
  })

export default useGetShopListByOwnerIdQuery
