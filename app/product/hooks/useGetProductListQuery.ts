import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'
import type { Product } from '@/types'
import { toast } from 'react-toastify'

const useGetProductListQuery = () =>
  useQuery({
    queryKey: ['product-list'],
    queryFn: async () => {
      try {
        const response = await api.get('/products')

        const productList = response.data as Product[]

        return productList.filter((product) => product.is_deleted === false)
      } catch (error) {
        console.error(error)
        toast.error('Lỗi khi lấy danh sách sản phẩm')
      }
    },
  })

export default useGetProductListQuery
