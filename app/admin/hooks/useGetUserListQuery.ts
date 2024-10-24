import api from '@/api/api'
import { useQuery } from '@tanstack/react-query'
import type { User } from '@/types'
import { toast } from 'react-toastify'

const useGetUserListQuery = () =>
  useQuery({
    queryKey: ['user-list'],
    queryFn: async () => {
      try {
        const response = await api.get('/user')

        return response.data as User[]
      } catch (error) {
        console.error(error)
        toast.error('Lỗi khi lấy danh sách người dùng')
      }
    },
  })

export default useGetUserListQuery
