import { api } from '@/api'
import { queryClient } from '@/providers/QueryProvider'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import type { User } from '@/types'
import useSessionStore from '@/stores/useSessionStore'

type FormData = Partial<User> & {
  password?: string
}

const useUpdateUserInfoMutation = () =>
  useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.patch('/me', data)

      return response.data as User
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 422) {
        toast.error('Dữ liệu không hợp lệ')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-list'],
      })

      useSessionStore.getState().verifySession()

      toast.success('Cập nhật thông tin người dùng thành công')
    },
  })

export default useUpdateUserInfoMutation
