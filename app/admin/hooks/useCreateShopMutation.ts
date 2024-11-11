import { api } from '@/api'
import { queryClient } from '@/providers/QueryProvider'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import type { Shop } from '@/types'

type FormData = {
  name: string
  phone: string
  owner_id: number
  address: {
    province: string
    district: string
    ward: string
    detail: string
  }
}

const useUpdateShopMutation = () =>
  useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post(`/shop`, data)

      return response.data as Shop
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 422) {
        toast.error('ID chủ cửa hàng không tồn tại')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['shop-list'],
      })
      toast.success('Tạo cửa hàng thành công')
    },
  })

export default useUpdateShopMutation
