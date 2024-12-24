import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'
import type { Product } from '@/types'
import { toast } from 'react-toastify'

const useGetProductListByShopIdQuery = (shopId: number) =>
  useQuery({
    queryKey: ['product-list', shopId],
    queryFn: async () => {
      try {
        const response = await api.get('/products')

        const productList = response.data as Product[]

        return productList.filter((product) => product.shop_id === shopId && !product.is_deleted)
      } catch (error) {
        console.error(error)
        toast.error('Lỗi khi lấy danh sách cửa hàng')
      }
    },
  })

export default useGetProductListByShopIdQuery
