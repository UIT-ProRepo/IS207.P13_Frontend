import api from '@/api/api'
import { useMutation } from '@tanstack/react-query'
import useSessionStore from '@/stores/useSessionStore'
import { AxiosError } from 'axios'

type FormData = {
  email: string
  password: string
}

const useSignupMutation = () =>
  useMutation({
    mutationFn: async (data: FormData) => {
      console.log('data', data)
      const response = await api.post('/auth/signup', data)

      return response.data
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 422) {
        error.message = 'Người dùng đã tồn tại'
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
    },
  })

export default useSignupMutation
