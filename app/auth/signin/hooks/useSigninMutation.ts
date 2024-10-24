import api from '@/api/api'
import { useMutation } from '@tanstack/react-query'
import useSessionStore from '@/stores/useSessionStore'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

type FormData = {
  email: string
  password: string
}

const useSigninMutation = () =>
  useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post('/auth/signin', data)

      return response.data
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 422 || error.response?.status === 401) {
        toast.error('Email hoặc mật khẩu không chính xác')
      }
    },
    onSuccess: (data) => {
      useSessionStore.getState().signIn(
        {
          id: data.user.id,
          fullName: data.user.fullName,
          email: data.user.email,
          role: data.user.role,
        },
        data.accessToken,
      )
      toast.success('Đăng nhập thành công')
    },
  })

export default useSigninMutation
