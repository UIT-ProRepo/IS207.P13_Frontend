import { api } from '@/api'
import { queryClient } from '@/providers/QueryProvider'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import type { Review } from '@/types'

type FormData = {
  approval_status: 'pending' | 'approved' | 'rejected'
}

const useUpdateApprovalStatusMutation = () =>
  useMutation({
    mutationFn: async ({ reviewId, data }: { reviewId: number; data: FormData }) => {
      const response = await api.patch(`/review/${reviewId}`, data)

      return response.data as Review
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 422) {
        toast.error('Dữ liệu không hợp lệ')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['review-list'],
      })

      toast.success('Cập nhật trạng thái duyệt thành công')
    },
  })

export default useUpdateApprovalStatusMutation
