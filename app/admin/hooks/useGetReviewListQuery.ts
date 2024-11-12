import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { Product, Review, User } from '@/types'

const useGetReviewListQuery = () =>
  useQuery({
    queryKey: ['review-list'],
    queryFn: async () => {
      try {
        const response = await api.get('/review')

        return response.data as (Review & { product: Product; user: User })[]
      } catch (error) {
        console.error(error)
        toast.error('Lỗi khi lấy danh sách đánh giá')
      }
    },
  })

export default useGetReviewListQuery
