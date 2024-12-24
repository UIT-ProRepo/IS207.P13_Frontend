import { api } from '@/api'
import { queryClient } from '@/providers/QueryProvider'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import type { Product } from '@/types'

type FormData = Partial<Product>

const useUpdateProductMutation = () =>
  useMutation({
    mutationFn: async ({ productId, data }: { productId: number; data: FormData }) => {
      const response = await api.patch(`/products/${productId}`, data)

      return response.data as Product
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 422) {
        toast.error('Dữ liệu không hợp lệ')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['product-list'],
      })
      toast.success('Cập nhật thông tin sản phẩm thành công')
    },
  })

export default useUpdateProductMutation
