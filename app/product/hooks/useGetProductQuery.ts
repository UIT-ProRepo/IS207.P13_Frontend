import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'
import type { Product } from '@/types'
import { toast } from 'react-toastify'

const useGetProductQuery = (id: number) =>
  useQuery({
    queryKey: ['product-id', id],
    queryFn: async () => {
      try {
        const response = await api.get(`/products/${id}`)

        const product = response.data as Product

        return product
      } catch (error) {
        console.error(error)
        toast.error('Lỗi khi lấy sản phẩm')
      }
    },
  })

export default useGetProductQuery
