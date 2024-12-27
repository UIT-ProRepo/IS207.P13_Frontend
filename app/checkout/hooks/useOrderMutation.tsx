import { api } from '@/api'
import { useMutation } from '@tanstack/react-query'
import useSessionStore from '@/stores/useSessionStore'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import type { Session } from '@/types'

type FormData = {
  email: string
  password: string
}

const useSigninMutation = () =>
  useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post('/auth/signin', data)

      return response.data as Session
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 422 || error.response?.status === 401) {
        toast.error('Email hoặc mật khẩu không chính xác')
      }
    },
    onSuccess: (data) => {
      useSessionStore.getState().signIn(data.user, data.access_token)
      toast.success('Đăng nhập thành công')
    },
  })

export default useSigninMutation