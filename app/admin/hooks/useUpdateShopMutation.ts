import { api } from '@/api'
import { queryClient } from '@/providers/QueryProvider'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import type { Shop } from '@/types'

type FormData = Partial<Shop>

const useUpdateShopMutation = () =>
  useMutation({
    mutationFn: async ({ shopId, data }: { shopId: number; data: FormData }) => {
      const response = await api.patch(`/shop/${shopId}`, data)

      return response.data as Shop
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 422) {
        toast.error('Dữ liệu không hợp lệ')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['shop-list'],
      })
      toast.success('Cập nhật thông tin cửa hàng thành công')
    },
  })

export default useUpdateShopMutation
