import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'
import type { Category } from '@/types'
import { toast } from 'react-toastify'

const useGetCategoryListQuery = () =>
  useQuery({
    queryKey: ['category-list'],
    queryFn: async () => {
      try {
        const response = await api.get('/categories')

        return response.data as Category[]
      } catch (error) {
        console.error(error)
        toast.error('Lỗi khi lấy danh sách phân loại sản phẩm')
      }
    },
  })

export default useGetCategoryListQuery
