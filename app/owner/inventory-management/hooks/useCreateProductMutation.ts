import { api } from '@/api'
import { queryClient } from '@/providers/QueryProvider'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import type { Product } from '@/types'
import useInventoryStore from '../stores/useInventoryStore'

type FormData = {
  name: string
  shop_id: number
  category_id: number
  unit_price: number
  description: string
  image_url: string
  quantity: number
  is_deleted: boolean
}

const useCreateProductMutation = () =>
  useMutation({
    mutationFn: async (data: FormData) => {
      console.log('data: ', {
        ...data,
        shop_id: useInventoryStore.getState().currentShopId,
        is_deleted: false,
      })

      const response = await api.post(`/products`, {
        ...data,
        shop_id: useInventoryStore.getState().currentShopId,
        is_deleted: false,
      })

      return response.data as Product
    },
    onError: (error: AxiosError) => {
      toast.error('Tạo sản phẩm thất bại: ' + error?.response?.statusText)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['product-list'],
      })
      toast.success('Tạo sản phẩm thành công')
    },
  })

export default useCreateProductMutation
