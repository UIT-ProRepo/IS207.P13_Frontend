import { api } from '@/api'
import { useMutation } from '@tanstack/react-query'
import useSessionStore from '@/stores/useSessionStore'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import type { Session } from '@/types'

type FormData = {
  full_name: string
  email: string
  phone: string
  date_of_birth: string
  gender: string
  password: string
  password_confirmation: string
}

const useSignupMutation = () =>
  useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post('/auth/signup', data)

      return response.data as Session
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 422) {
        toast.error('Email đã tồn tại')
      }
    },
    onSuccess: (data) => {
      useSessionStore.getState().signIn(data.user, data.access_token)
      toast.success('Đăng ký thành công')
    },
  })

export default useSignupMutation
